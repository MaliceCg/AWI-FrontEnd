import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/planning.module.css";

const CalendarInscription = ({festivalInfo, poste, idZone}) => {

  const navigate = useNavigate();

  //get all inscriptions by idZone via http://localhost:3000/inscription-module/zone/idZone

  const [listInscriptions, setListInscriptions] = useState([]);

  const [listInscriptionsByUser, setListInscriptionsByUser] = useState([]);

  //const benevoleId = parseInt(localStorage.getItem('idBenevole'));
  const benevoleId = 1;

  useEffect(() => {
    const fetchInscriptions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/inscription-module/zone/${idZone}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setListInscriptions(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchInscriptionsByUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/inscription-module/volunteer/${benevoleId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setListInscriptionsByUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInscriptions();
    fetchInscriptionsByUser();
  }, [idZone, benevoleId]);


  // Fonction pour calculer le nombre de jours entre deux dates
  const getDaysDifference = (dateStart, dateEnd) => {
    const diffInTime = new Date(dateEnd) - new Date(dateStart);
    return diffInTime / (1000 * 3600 * 24); // Convertir la différence en jours
  };

  const [showAlert, setShowAlert] = useState(false);

  const handleForbiddenSlotClick = () => {
    setShowAlert(true);

    // Masquer l'alerte après 5 secondes
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSlotClick = (dayIndex, slot) => {
    // Vous pouvez ajouter des validations supplémentaires ici si nécessaire
    const selectedDate = new Date(festivalInfo.DateDebut);
    selectedDate.setDate(selectedDate.getDate() + dayIndex);

    const body = {
        //"idBenevole": parseInt(localStorage.getItem('idBenevole')),
        "idBenevole": 1,
        "idZoneBenevole": parseInt(idZone),
        "idPoste": poste.idPoste,
        "Creneau": slot,
        "Jour": selectedDate,
        "isPresent": false
    }

    const postInscription = async () => {
        try {
            const response = await fetch(`http://localhost:3000/inscription-module`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la création de l\'inscription');
            }
            const data = await response.json();
  
        } catch (error) {
            console.error(error);
        }
    };

    postInscription();

    navigate(`/benevole-dashboard/${festivalInfo.idFestival}`);
  };

  const renderTimeSlots = () => {
    if (!festivalInfo || !poste === 0) {
      return <p>Chargement en cours...</p>;
    }
  
    const dateDebut = new Date(festivalInfo.DateDebut);
    const daysDifference = getDaysDifference(dateDebut, new Date(festivalInfo.DateFin));
  
    const days = [];

    for (let i = 0; i <= daysDifference; i++) {
      const timeSlots = ['09-11', '11-14', '14-17', '17-20', '20-22'];

      days.push(
        <div className={styles.columnCalendar} key={i}>
          <h3>Jour {i + 1}</h3>
          <ul className={styles.cellColumnCalendar}>
            {timeSlots.map((slot, index) => {  

              let day = new Date(festivalInfo.DateDebut);

              // Formater la date dans le format "YYYY-MM-DD"
              let formattedDate = new Date(day.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA'); // Assurez-vous d'utiliser le format adéquat

              //progressBarValue = nbInscriptions a ce creneaux et ce jour / capacite
              let inscriptionsByCreneauJour = listInscriptions.filter(inscription => {
                return inscription.Creneau === slot && inscription.Jour.startsWith(formattedDate);
              });

              let progressBarValue = inscriptionsByCreneauJour.length / poste.capacite;

              // Get inscriptions of user
              let inscriptionsByUser = listInscriptionsByUser.filter(inscription => {
                //return inscription.idBenevole === parseInt(localStorage.getItem('idBenevole'));
                return inscription.Creneau === slot && inscription.Jour.startsWith(formattedDate);
              });

              return (
                <li
                  className={`${inscriptionsByUser.length > 0 || progressBarValue === 1 ? styles.disabledSlot : styles.cellCalendar}`}
                  key={index}
                  onClick={() => {
                    // Vérifier si le slot est désactivé
                    if (!(inscriptionsByUser.length > 0 || progressBarValue === 1)) {
                      handleSlotClick(i, slot);
                    } else {
                      handleForbiddenSlotClick();
                    }
                  }}
                >
                  {slot}
                  <LinearProgress variant="determinate" value={progressBarValue * 100} className={styles.progressBar}/>
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
    <div>
        <div className={styles.benevoleCalendar}>
          <h2 className={styles.titre}>Planning</h2>
          <div className={styles.Calendar}>
          {renderTimeSlots()}
          </div>

        {showAlert && (
        <div className={styles.bottomAlertContainer}>
          <Alert severity="error" style={{ zIndex: 1 }}>
            Impossible de s'inscrire à ce créneau.
          </Alert>
        </div>
        )}
        </div>
    </div>
  );
};

export default CalendarInscription;