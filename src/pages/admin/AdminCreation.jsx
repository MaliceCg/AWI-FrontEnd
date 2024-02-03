import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImportCsv from '../../components/AccueilAdmin/admin/ImportCsv';
import PosteFestival from '../../components/AccueilAdmin/admin/PosteFestival';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import styles from '../../styles/espaceCreation.module.css';

const EspaceCreation = () => {

  const accessToken = localStorage.getItem('token');
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  
  
  /////////////////////Recupere les postes du festival////////////////////////
  const [postes, setPostes] = useState([]);
  const fetchPostes = async () => {
    try {
      const response = await fetch(`http://localhost:3000/employer-module/festival/${idFestival}`);
      if (response.ok) {
        const datas = await response.json();
        const postePromises = datas.map(async (data) => {
          const reponsePoste = await fetch(`http://localhost:3000/position-module/${data.idPoste}`);
          if (reponsePoste.ok) {
            const posteData = await reponsePoste.json();
            
            // Vérifiez le nom du poste après avoir obtenu les données du poste
            if (posteData.nomPoste === "Animation Jeux") {
              return posteData;
            } else {
     
              const reponseZone = await fetch(`http://localhost:3000/volunteer-area-module/${data.idPoste}`);
              if (reponseZone.ok) {
                const zoneData = await reponseZone.json();
                return {
                  ...posteData,
                  idZoneBenevole: zoneData.idZoneBenevole,
                  nomZoneBenevole: zoneData.nomZoneBenevole,
                };
              } else {
                throw new Error('Erreur lors de la récupération de la zone bénévole');
              }
            }
          } else {
            throw new Error('Erreur lors de la récupération des postes');
          }
        });
  
        const posteData = await Promise.all(postePromises);
        setPostes(posteData);
        return posteData;
      } else {
        throw new Error('Erreur lors de la récupération des données');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchPostes(); // Appel de la fonction fetch lors du premier rendu
  }, [idFestival]);

//////////////////////Gere la pop up d'ajout de poste////////////////////////
  const openAddPostePopup = () => {
    // Réinitialisez l'état pour un nouveau poste
    setNewPoste({
      nomPoste: "",
      description: "",
      capacite: 0,
      nomZoneBenevole:""

    });
    setAddPostePopupOpen(true);
  };

  const closeAddPostePopup = () => {
    setAddPostePopupOpen(false);
  };

  const [isAddPostePopupOpen, setAddPostePopupOpen] = useState(false);

  const [shouldClosePopup, setShouldClosePopup] = useState(false);

  // Référence à la popup pour vérifier si un clic est en dehors d'elle
  const popupRef = useRef(null);
  // Effet pour ajouter l'écouteur d'événements lors de l'ouverture de la popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Clic en dehors de la popup, fermer la popup
        setShouldClosePopup(true);
      }
    };

    if (isAddPostePopupOpen) {
      // Ajouter l'écouteur d'événements lorsque la popup est ouverte
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Retirer l'écouteur d'événements lorsque la popup est fermée
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddPostePopupOpen]);

  // Effet pour fermer la popup lorsque shouldClosePopup est vrai
  useEffect(() => {
    if (shouldClosePopup) {
      closeAddPostePopup();
      setShouldClosePopup(false);
    }
  }, [shouldClosePopup]);

  
  const [newPoste, setNewPoste] = useState({
    nomPoste: "",
    description: "",
    capacite: 0,
    nomZoneBenevole:""
  });

const addPoste = async () => {

    const response = await fetch('http://localhost:3000/position-module', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
              },
      body: JSON.stringify(newPoste),
      });

    if (response.ok) {
      const posteResponseData = await response.json(); // Convertir la réponse en JSON

      const posteId = posteResponseData.idPoste; // Récupérer l'ID du poste créé


      const zoneData = {
        idZoneBenevole : posteId,
        nomZoneBenevole: newPoste.nomZoneBenevole,
        capacite:posteResponseData.capacite,  // Ajoutez la capacité que vous souhaitez
        idFestival: idFestival,  // Associer la zone au festival créé
        idPoste: posteId,  // Associer la zone au poste créé
      };

      const zoneResponse = await fetch('http://localhost:3000/volunteer-area-module', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(zoneData),
      });

      if (zoneResponse.ok) {
      console.log(`La zone pour le poste ${posteResponseData.nomPoste} a été créée avec succès !`);
      } else {
      console.error(`Erreur lors de la création de la zone pour le poste ${posteResponseData.nomPoste}.`);
      }
      // Lier le poste au festival dans la table employer
      const employerData = {
        idFestival: parseInt(idFestival, 10),
        idPoste: posteId,
      };

      const employerResponse = await fetch('http://localhost:3000/employer-module', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(employerData),
                  });
      if (employerResponse.ok) {
        console.log(`Le poste ${newPoste.nomPoste} a été lié au festival avec succès !`);
        const updatedPostes = await fetchPostes();
        setPostes(updatedPostes);
        setAddPostePopupOpen(false);
      }
      else {
        console.error(`Erreur lors de la liaison du poste ${newPoste.nomPoste} au festival.`);
      }
        }
        else {

          console.error(`Erreur lors de la création du poste ${newPoste.nomPoste}.`);
        }
      }
const handleNewPosteInputChange = (e) => {
  const { name, value } = e.target;
  
  // Convertir la valeur en nombre si le champ est "capacite"
  const numericValue = name === "capacite" ? parseInt(value, 10) : value;

  setNewPoste((prevPoste) => ({
    ...prevPoste,
    [name]: numericValue,
  }));
};
/////////fin ajout poste/////////////////////
  
  return (
    <div>
      <Header currentPage="espace-creation" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
        <NavbarAdmin idFestival={selectedFestival}/>
        </div>
        <div className={styles.componentContainer}>
          <ImportCsv idFestival={idFestival} />

          <div className={styles.posteContainer}>
            <h3>Postes existants pour ce Festival : </h3>
            <div>
              {postes.map((poste, index) => (
                 <PosteFestival key={index} poste={poste} fetchPostes={fetchPostes} />
              ))}
            </div>

            <button className={styles.addPoste} onClick={openAddPostePopup}>
              <AddIcon /> Ajouter un poste
            </button>

            {isAddPostePopupOpen && (
              <div className={styles.editPopup}>
              <div ref={popupRef} className={styles.editPopupContent}>
                <h1 className={styles.titre}>Ajouter un poste :</h1>
                <label className={styles.label} >Nom du poste</label>
                <input className={styles.editInput}
                  type="text"
                  name="nomPoste"
                  value={newPoste.nomPoste}
                  onChange={handleNewPosteInputChange}
                />
                <label className={styles.label}>Description</label>
                <textarea className={styles.editInput}
                  name="description"
                  value={newPoste.description}
                  onChange={handleNewPosteInputChange}
                ></textarea>
                <label className={styles.label}>Places disponibles </label>
                <input className={styles.editInput}
                  type="number"
                  name="capacite"
                  value={newPoste.capacite}
                  onChange={handleNewPosteInputChange}
                />
                <label className={styles.label}>Nom de la zone bénévole</label>
                <input className={styles.editInput}
                  type="text"
                  name="nomZoneBenevole"
                  value={newPoste.nomZoneBenevole}
                  onChange={handleNewPosteInputChange}
                />
                <div className={styles.boutonAjout}>
                <button className={styles.btn2} onClick={addPoste}>Ajouter</button>
                <button className={styles.btn2} onClick={closeAddPostePopup}>Annuler</button>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspaceCreation;
