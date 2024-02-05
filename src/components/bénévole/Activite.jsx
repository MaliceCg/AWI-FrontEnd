import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import inscription from "../../img/icons/inscription.svg";
import styles from "../../styles/activites.module.css";
import Loader from "../AccueilAdmin/admin/Loader";

const Activite = ({ idFestival, displayInline }) => {
const [activites, setActivites] = useState([]);
const [postes, setPostes] = useState([]);  // Nouvel état pour stocker la liste des postes
const [selectedPoste, setSelectedPoste] = useState(""); // Nouvel état pour stocker le poste sélectionné
const [hasActivities, setHasActivities] = useState(false);
const userId = localStorage.getItem("id");
const [loading, setLoading] = useState(true);

//On recupere les postes du festival
const fetchPostes = async () => {
  try {
    console.log("fetching postes");
    const PostesResponse = await fetch(`https://awi-api-2.onrender.com/employer-module/festival/${idFestival}`);
    const Postesdata = await PostesResponse.json();

    console.log(Postesdata);
    const poste = Postesdata.map(async (poste) => {
      const idPoste = poste.idPoste;
      const nomPoste = await fetch(`https://awi-api-2.onrender.com/position-module/${idPoste}`);
      const nomPosteData = await nomPoste.json();
      console.log(nomPosteData);
      return {
        idPoste: idPoste,
        nomPoste: nomPosteData.nomPoste,

      };
    });
    
    const PostData = await Promise.all(poste);
    console.log(PostData);
    setPostes(PostData);
  } catch (error) {
    console.error(error);
  }
};
const fetchActivites = async () => {

  try {
    console.log("fetching activites");
    // Récupérez les inscriptions de l'utilisateur
    const inscriptionResponse = await fetch(`https://awi-api-2.onrender.com/inscription-module/volunteer/${userId}`);
    const inscriptionData = await inscriptionResponse.json();
console.log(inscriptionData);

    // Utilisez les données des inscriptions pour récupérer les informations des postes
    const activitesPromises = inscriptionData.map(async (inscription) => {
console.log(inscription);
      const postId = inscription.idPoste;
      const employerResponse = await fetch(`https://awi-api-2.onrender.com/employer-module/position/${postId}`);
      const employerData = await employerResponse.json();
      console.log(employerData);
      console.log(idFestival);
console.log(employerData[0].idFestival); // Affichez la valeur de idFestival dans l'élément unique
console.log(employerData[0].idFestival === idFestival);

      console.log(employerData.map(data => data.idFestival));

      if (employerData.some(data => data.idFestival === parseInt(idFestival,10))) {


        // Récupérez les données du poste
        const posteResponse = await fetch(`https://awi-api-2.onrender.com/position-module/${postId}`);
        const posteData = await posteResponse.json();


        // Récupérez le nom de la zone bénévole
        const zoneResponse = await fetch(`https://awi-api-2.onrender.com/volunteer-area-module/${inscription.idZoneBenevole}`);
        const zoneData = await zoneResponse.json();
  

        // Récupérez les référents du poste
        const referentsResponse = await fetch(`https://awi-api-2.onrender.com/referent-module/position/${postId}`);
        const referentsData = await referentsResponse.json();


        // Pour chaque référent, récupérez son prénom à partir de son ID
        const referentsDetails = await Promise.all(referentsData.map(async (referent) => {
  
          const referentResponse = await fetch(`https://awi-api-2.onrender.com/authentication-module/${referent.idBenevole}`);
          const referentData = await referentResponse.json();
          return {
            idReferent: referent.idBenevole,
            prenomReferent: referentData.Pseudo, // Assurez-vous que votre API renvoie le prénom correctement
          };
        }));
        console.log(referentsDetails);
        console.log(inscription);

        // Retournez un objet avec les données d'inscription, de poste, de zone et de référents combinées
        return {
          inscription,
          poste: posteData,
          zone: zoneData, // Ajout de la zone
          referents: referentsDetails,
        };
      } else {
        return null;
      }
    });

    const activitesData = await Promise.all(activitesPromises);
    setActivites(activitesData);
    setHasActivities(activitesData.some((activite) => activite !== null));
  } catch (error) {
    console.error(error);
  }
};


useEffect(() => {
  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data

    try {
      // Fetch postes and activites data
      await fetchPostes();
      await fetchActivites();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or in case of an error
    }
  };

  fetchData();
}, [idFestival, userId]);
  
    const handlePosteChange = (event) => {
      setSelectedPoste(event.target.value);
    };
    const dynamicStyle = (nomPoste) => {
      let backgroundColor = '';
    

    
      if (nomPoste && typeof nomPoste === 'string') {
        switch (nomPoste.toLowerCase()) {
          case 'accueil':
            backgroundColor = '#3CCBF4';
            break;
          case 'buvette':
            backgroundColor = '#117F45';
            break;
          case 'cuisine':
            backgroundColor = '#33C481';
            break;
          case 'animation jeux':
            backgroundColor = '#105C9F';
            break;
          default:
            backgroundColor = '#F4B740';
            break;
        }
      }
    
      return {
        backgroundColor: backgroundColor,
      };
    };
    
  
     // Filtrer les activités en fonction du poste sélectionné
const filteredActivites = selectedPoste
? activites.filter((activite) => activite && activite.poste && activite.poste.nomPoste === selectedPoste)
: activites;

const handleUnsubscribe = async (inscriptionId, idZoneBenevole, Creneau, Jour) => {
  try {
    const response = await fetch(`https://awi-api-2.onrender.com/inscription-module/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idBenevole: userId,
        idPoste: inscriptionId,
        idZoneBenevole: idZoneBenevole, // Pass the idZoneBenevole parameter
        Jour: Jour, // Pass the Jour parameter
        Creneau: Creneau, // Pass the Creneau parameter
        // Add other necessary parameters
      }),
    });

    if (response.ok) {
      console.log('Unsubscription successful');
      alert('Désinscription réussie');
      fetchActivites();
    } else {
      console.error('Failed to unsubscribe');
      alert('Echec de la désinscription');
    }
  } catch (error) {
    console.error(error);
  }
};


return (
  <div className={styles.activiteContainer} >
    <h1 className={styles.h1}>Mes activités</h1>

    <select onChange={handlePosteChange} value={selectedPoste} className={styles.filterSelect}>
      <option value="">Filtrer</option>
      {postes.map((poste) => (
        <option key={poste.idPoste} value={poste.nomPoste}>
          {poste.nomPoste}
        </option>
      ))}
    </select>

    {loading ? (
      <div className={styles.loaderContainer}>
        <Loader />
        </div> // Display Loader component while data is being fetched
      ) : hasActivities ? (
      // Affichez les activités s'il y en a
      <ul className={styles.liste} style={displayInline ? { display: "flex", margin: "0",padding: "0" } : {}}>
        {filteredActivites.map((activite, index) => (
          // Ajoutez une vérification pour s'assurer que activite n'est pas nulle
          activite && (
            <div key={index} className={styles.activite} style={dynamicStyle(activite?.poste?.nomPoste)} >
              {activite.poste && (
                <li>
                  <>
                    <h2 className={styles.h2}>{activite.poste.nomPoste}</h2>
                    <p className={styles.pzoneCreneau}>
                      <strong className={styles.info}>Zone:</strong> {activite.zone ? activite.zone.nomZoneBenevole : "Zone non disponible"} -{" "}
                      <strong className={styles.info}>Créneau:</strong> {activite.inscription ? activite.inscription.Creneau : "Créneau non disponible"}
                    </p>
                    <p className={styles.p}>
                      <strong className={styles.info}>Description:</strong>{" "}
                      {activite.poste ? activite.poste.description : "Description non disponible"}
                    </p>
                    <p className={styles.preferent}>
                      <strong className={styles.info}>Référents:</strong>{" "}
                      {activite.referents ? activite.referents.map((referent) => referent.prenomReferent).join(", ") : "Référents non disponibles"}
                    </p>
                    <p>
                    <button
  className={styles.btn}
  onClick={() =>
    handleUnsubscribe(
      activite.inscription.idPoste,
      activite.inscription.idZoneBenevole,
      activite.inscription.Creneau,
      activite.inscription.Jour
    )
  }
>
  Se désinscrire
</button>
                    </p>
                  </>
                </li>
              )}
            </div>
          )
        ))}
      </ul>
    ) : (
      <div>
        <p className={styles.txtInscription}>On attend votre inscription !</p>
        <p className={styles.txtInscription}>Vous pouvez vous inscrire à une activité en cliquant ici :</p>
        <Link to={`/benevole-inscription/${idFestival}`}>
          <img src={inscription} alt="Inscription" className={styles.logoInscription}/>
        </Link>
      </div>
    )}
  </div>
);
}
export default Activite;
