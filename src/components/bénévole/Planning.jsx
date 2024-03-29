import React, { useEffect, useState } from 'react';
import styles from '../../styles/planning.module.css';
import Loader from '../AccueilAdmin/admin/Loader';

const Planning = ({idFestival, idBenevole}) => {
  const [festivalInfo, setFestivalInfo] = useState(null);
  const [festivalPositions, setFestivalPositions] = useState([]); // État pour stocker les postes de l'utilisateur
  const [AllPositions, setAllPositions] = useState([]); // État pour stocker les postes de l'utilisateur
  const [loading, setLoading] = useState(true);
  


  if (!idBenevole) {
    idBenevole = parseInt(localStorage.getItem('id'));
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        await fetchFestivalInfo();
        await fetchPositions();
        await fetchAllPositions();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idFestival]);
  
  const fetchFestivalInfo = async () => {
    try {
      const response = await fetch(`https://awi-api-2.onrender.com/festival-module/${idFestival}`);

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations du festival');
      }

      const data = await response.json();
      setFestivalInfo(data);
    } catch (error) {
      console.error(error);
    }
  };


    const fetchPositions = async () => {
      try {
        // Récupérer tous les postes pour le festival spécifique
        const positionsResponse = await fetch(`https://awi-api-2.onrender.com/employer-module/festival/${idFestival}`);

        if (!positionsResponse.ok) {
          throw new Error('Erreur lors de la récupération des postes du festival');
        }

        const positionsData = await positionsResponse.json();

        // Récupérer les inscriptions de l'utilisateur pour chaque poste
        const userPromises = positionsData.map(async (position) => {
          const response = await fetch(`https://awi-api-2.onrender.com/inscription-module/position/${position.idPoste}/volunteer/${idBenevole}`);

          if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des inscriptions pour le poste ${position.idPoste}`);
          }

          const userPositionData = await response.json();
          return { ...position, userInscriptions: userPositionData }; // Associer les inscriptions au poste
        });

        // Attendre que toutes les requêtes pour les inscriptions se terminent
        const festivalPositionsResult = await Promise.all(userPromises);
        setFestivalPositions(festivalPositionsResult); // Mettre à jour l'état avec les postes de l'utilisateur
      } catch (error) {
        console.error(error);
        // Gérer les erreurs de requête ou de traitement des données
      }
    };

    const fetchAllPositions = async () => {
      try {
        const positionsResponse = await fetch(`https://awi-api-2.onrender.com/position-module`);

        if (!positionsResponse.ok) {
          throw new Error('Erreur lors de la récupération des postes');
        }

        const positionsData = await positionsResponse.json();
        setAllPositions(positionsData);
      } catch (error) {
        console.error(error);
      }
    };



  // Fonction pour calculer le nombre de jours entre deux dates
  const getDaysDifference = (dateStart, dateEnd) => {
    const diffInTime = new Date(dateEnd) - new Date(dateStart);
    return diffInTime / (1000 * 3600 * 24); // Convertir la différence en jours
  };

  const renderTimeSlots = () => {
    if (!festivalInfo || festivalPositions.length === 0) {
      return <p>Chargement en cours...</p>;
    }
  
    const dateDebut = new Date(festivalInfo.DateDebut);
    const daysDifference = getDaysDifference(dateDebut, new Date(festivalInfo.DateFin));
  
    const days = [];
    for (let i = 0; i <= daysDifference; i++) {
      const timeSlots = ['09-11', '11-14', '14-17', '17-20', '20-22'];
      days.push(
        <div className={styles.columnCalendar} key={i}>
          <h3 className={styles.dayLabel}>Jour {i + 1}</h3>
          <ul className={styles.cellColumnCalendar}>
          
            {timeSlots.map((slot, index) => {
              let isUserRegistered = false;
              let dynamicStyle = {};
  
              for (const position of festivalPositions) {

                let backgroundColor = '';

                //get nomPoste from AllPositions with position.idPoste

                const positionData = AllPositions.find((positionData) => positionData.idPoste === position.idPoste);

                switch (positionData.nomPoste.toLowerCase()) {
                    case 'accueil':
                        backgroundColor = '#3CCBF4';
                        break;
                    case 'buvette':
                        backgroundColor = '#117F45';
                        break;
                    case 'animation jeux':
                        backgroundColor = '#105C9F';
                        break;
                    case 'cuisine':
                        backgroundColor = '#33C481';
                        break;
                    default:
                        backgroundColor = '#F4B740';
                        break;
                }
            
                dynamicStyle = {
                    backgroundColor: backgroundColor,
                };

                for (const inscription of position.userInscriptions) {

                  if(inscription.idZoneBenevole === null){
                    backgroundColor = '#f06767';

                    dynamicStyle = {
                      backgroundColor: backgroundColor,
                    };
                  }

                  const inscriptionDate = new Date(inscription.Jour);  
                  if (
                    inscriptionDate.getDate() === dateDebut.getDate() + i &&
                    slot === inscription.Creneau 
                  ) {
                    isUserRegistered = true;
                    break;
                  }
                }
  
                if (isUserRegistered) {
                  break;
                }
              }
  
              const slotClassName = isUserRegistered ? `${styles.cellCalendar} ${styles.inscription} ` : styles.cellCalendar;
  
              return (
                <li className={slotClassName} style={isUserRegistered ? dynamicStyle : null} key={index}>
                  {slot}
                </li>
              );
            })}
          </ul>
        </div>

      );
    }
  
    return days;
  };
  

  return (

        <div className={styles.benevoleCalendar}>
          <h2 className={styles.titre}>Planning</h2>
          {loading ? (
            <div className={styles.loaderContainer}>
        <Loader />
        </div>
      ) : (
          <div className={styles.Calendar}>
          {renderTimeSlots()}
          </div>
          )}
        <div className={styles.calendarLegend}>

          <div className={styles.legendColor} style={{ backgroundColor: '#3CCBF4' }}></div>
          <p>Accueil</p>

          <div className={styles.legendColor} style={{ backgroundColor: '#117F45' }}></div>
          <p>Buvette</p>

          <div className={styles.legendColor} style={{ backgroundColor: '#105C9F' }}></div>
          <p>Animation jeux</p>

          <div className={styles.legendColor} style={{ backgroundColor: ' #33C481' }}></div>
          <p>Cuisine</p>

          <div className={styles.legendColor} style={{ backgroundColor: '#F4B740' }}></div>
          <p>Autre</p>

        </div>
    </div>
  );
};

export default Planning;
