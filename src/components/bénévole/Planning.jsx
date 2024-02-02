import React, { useEffect, useState } from 'react';
import styles from '../../styles/benevoleDashboard.module.css';

const Planning = ({idFestival}) => {
  const [festivalInfo, setFestivalInfo] = useState(null);
  const [festivalPositions, setFestivalPositions] = useState([]); // État pour stocker les postes de l'utilisateur
  

  useEffect(() => {
    const fetchFestivalInfo = async () => {
      try {
        // Envoyer une requête GET au backend pour récupérer les informations du festival
        const response = await fetch(`http://localhost:3000/festival-module/${idFestival}`);

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des informations du festival');
        }

        const data = await response.json();
        setFestivalInfo(data); // Mettre à jour l'état avec les informations du festival
      } catch (error) {
        console.error(error);
        // Gérer les erreurs de requête ou de traitement des données
      }
    };

    const fetchPositions = async () => {
      try {
        // Récupérer tous les postes pour le festival spécifique
        const positionsResponse = await fetch(`http://localhost:3000/employer-module/festival/${idFestival}`);

        if (!positionsResponse.ok) {
          throw new Error('Erreur lors de la récupération des postes du festival');
        }

        const positionsData = await positionsResponse.json();

        // Récupérer les inscriptions de l'utilisateur pour chaque poste
        const userPromises = positionsData.map(async (position) => {
          const response = await fetch(`http://localhost:3000/inscription-module/position/${position.idPoste}/volunteer/2`);

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

    fetchFestivalInfo();
    fetchPositions();
  }, [idFestival]);


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
      const timeSlots = ['9-11', '11-14', '14-17', '17-20', '20-22'];
      days.push(
        <div className={styles.columnCalendar} key={i}>
          <h3>Jour {i + 1}</h3>
          <ul className={styles.cellColumnCalendar}>
            {timeSlots.map((slot, index) => {
              let isUserRegistered = false;
  
              for (const position of festivalPositions) {
                for (const inscription of position.userInscriptions) {
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
  
              const slotClassName = isUserRegistered ? `${styles.cellCalendar} ${styles.inscription}` : styles.cellCalendar;
  
              return (
                <li className={slotClassName} key={index}>
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
          {/* Afficher les colonnes de jours avec leurs créneaux horaires */}
          {renderTimeSlots()}
        </div>

  );
};

export default Planning;
