import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const [postes, setPostes] = useState([]);

  const fetchPostes = async () => {
    try {
      const response = await fetch(`http://localhost:3000/employer-module/festival/${idFestival}`);
      if (response.ok) {
        const datas = await response.json();
        console.log("data : ", datas);
        const postePromises = datas.map(async (data) => {
          const reponsePoste = await fetch(`http://localhost:3000/position-module/${data.idPoste}`);
          if (reponsePoste.ok) {
            return reponsePoste.json();
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

  console.log("postes : ", postes);

  const openAddPostePopup = () => {
    // Réinitialisez l'état pour un nouveau poste
    setNewPoste({
      nomPoste: "",
      description: "",
      capacite: 0,
    });
    setAddPostePopupOpen(true);
  };

  const closeAddPostePopup = () => {
    setAddPostePopupOpen(false);
  };

  const [isAddPostePopupOpen, setAddPostePopupOpen] = useState(false);
  const [newPoste, setNewPoste] = useState({
    nomPoste: "",
    description: "",
    capacite: 0,
  });

const addPoste = async () => {
console.log("newPoste : ", newPoste);
console.log(JSON.stringify(newPoste));
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
      console.log(posteResponseData);
      const posteId = posteResponseData.idPoste; // Récupérer l'ID du poste créé
      console.log(posteId);
      console.log(idFestival);
      // Lier le poste au festival dans la table employer
      const employerData = {
        idFestival: parseInt(idFestival, 10),
        idPoste: posteId,
      };
      console.log(employerData);
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
          console.log(response);
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
  
  return (
    <div>
      <Header currentPage="espace-creation" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
        <NavbarAdmin idFestival={selectedFestival}/>
        </div>
        <div className={styles.componentContainer}>
          <button className={styles.importButton}>Importer des jeux (CSV)</button>

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
              <div className={styles.editPopupContent}>
                <h1 className={styles.titre}>Ajouter un poste :</h1>
                <label className={styles.label} >Nom du poste</label>
                <input className={styles.editInput}
                  type="text"
                  name="nomPoste"
                  value={newPoste.nomPoste}
                  onChange={handleNewPosteInputChange}
                />
                <label className={styles.label}>Description</label>
                <textarea
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
                <button className={styles.btn2} onClick={addPoste}>Ajouter</button>
                <button className={styles.btn2} onClick={closeAddPostePopup}>Annuler</button>
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
