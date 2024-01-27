import React, { useEffect, useState } from "react";
import styles from "../../styles/activites.module.css";

const Activite = ({idFestival}) => {
const [activites, setActivites] = useState([]);
const [postes, setPostes] = useState([]);  // Nouvel état pour stocker la liste des postes
const [selectedPoste, setSelectedPoste] = useState(""); // Nouvel état pour stocker le poste sélectionné
const userId = localStorage.getItem("id");


  useEffect(() => {
    // Fonction pour récupérer les inscriptions de l'utilisateur depuis le backend
    const fetchActivites = async () => {
      try {
        // Remplacez "idBenevole" par l'ID réel de l'utilisateur connecté

        // Récupérez les inscriptions de l'utilisateur
        const inscriptionResponse = await fetch(`http://localhost:3000/inscription-module/volunteer/${userId}`);
        const inscriptionData = await inscriptionResponse.json();

        // Utilisez les données des inscriptions pour récupérer les informations des postes
        const activitesPromises = inscriptionData.map(async (inscription) => {
          const postId = inscription.idPoste;

          // Récupérez les données du poste
          const posteResponse = await fetch(`http://localhost:3000/position-module/${postId}`);
          const posteData = await posteResponse.json();
          console.log(posteData);

          // Récupérez les référents du poste
          const referentsResponse = await fetch(`http://localhost:3000/referent-module/position/${postId}`);
          const referentsData = await referentsResponse.json();
          console.log(referentsData);

          // Pour chaque référent, récupérez son prénom à partir de son ID
          const referentsDetails = await Promise.all(referentsData.map(async (referent) => {
            console.log(referent)
            const referentResponse = await fetch(`http://localhost:3000/authentication-module/${referent.idBenevole}`);
            const referentData = await referentResponse.json();
            return {
              idReferent: referent.idBenevole,
              prenomReferent: referentData.Pseudo, // Assurez-vous que votre API renvoie le prénom correctement
            };
          }));

          // Retournez un objet avec les données d'inscription, de poste, et de référents combinées
          return {
            inscription,
            poste: posteData,
            referents: referentsDetails,
          };
        });

        const activitesData = await Promise.all(activitesPromises);
        setActivites(activitesData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPostes = async () => {
        try {
          const PostesResponse = await fetch(`http://localhost:3000/employer-module/festival/${idFestival}`);
          const Postesdata = await PostesResponse.json();
  
          const poste = Postesdata.map(async (poste) => {
            const idPoste = poste.idPoste;
            const nomPoste = await fetch(`http://localhost:3000/position-module/${idPoste}`);
            const nomPosteData = await nomPoste.json();
            return {
              idPoste: idPoste,
              nomPoste: nomPosteData.nomPoste,
            };
          });
          const PostData = await Promise.all(poste);
          setPostes(PostData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchActivites();
      fetchPostes();
  
    }, []);
  
    const handlePosteChange = (event) => {
      setSelectedPoste(event.target.value);
    };
    const dynamicStyle = (nomPoste) => {
        let backgroundColor = '';
        console.log("Nom du poste",nomPoste);
    
        switch (nomPoste.toLowerCase()) {
          case 'accueil':
            backgroundColor = '#3CCBF4';
            break;
          case 'buvette':
            backgroundColor = '#117F45';
            break;
          case 'animation jeux':
            backgroundColor = '#33C481';
            break;
          case 'cuisine':
            backgroundColor = '#105C9F';
            break;
          default:
            backgroundColor = '#F4B740';
            break;
        }
    
        return {
          backgroundColor: backgroundColor,
        };
      };
  
    // Filtrer les activités en fonction du poste sélectionné
    const filteredActivites = selectedPoste
      ? activites.filter((activite) => activite.poste.nomPoste === selectedPoste)
      : activites;

    return (
      <div className ={styles.activiteContainer}>
        <h1 className={styles.h1}>Mes activités</h1>
  
 
       
        <select onChange={handlePosteChange} value={selectedPoste} className={styles.filterSelect}>
          <option value=""> Filtrer</option>
          {postes.map((poste) => (
            <option key={poste.idPoste} value={poste.nomPoste} >
              {poste.nomPoste}
            </option>
          ))}
        </select>

      <ul className={styles.liste}>
        {filteredActivites.map((activite, index) => (
        <div key={index} className={styles.activite} style={dynamicStyle(activite.poste.nomPoste)}>
            <li>
            
              <h2 className={styles.h2}>{activite.poste.nomPoste}</h2>
            
              
              <p className={styles.pzoneCreneau}>
                <strong className={styles.info}>Zone:</strong> {activite.inscription.idZoneBenevole} - <strong className={styles.info}>Créneau:</strong> {activite.inscription.Creneau}
              </p>
            
            <p className={styles.p}>
              <strong className={styles.info}>Description:</strong> {activite.poste.description}
            </p>
            <p className={styles.preferent}>
              <strong className={styles.info}>Référents:</strong>{" "}
              {activite.referents.map((referent) => referent.prenomReferent).join(", ")}
            </p>
        
          </li>
        </div>
        ))}
      </ul>
    </div>
  );
};

export default Activite;
