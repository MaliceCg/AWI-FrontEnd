import Alert from '@mui/material/Alert';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/planning.module.css";

const CalendarInscription = ({ festivalInfo, postes }) => { // Maintenant, il reçoit une liste de postes
  const navigate = useNavigate();
console.log("postes",postes);
  const [listInscriptions, setListInscriptions] = useState([]);
  const [listInscriptionsByUser, setListInscriptionsByUser] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);
  const [selectedPostes, setSelectedPostes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const benevoleId = parseInt(localStorage.getItem('id'));

  useEffect(() => {

    const fetchInscriptions = async () => {
      try {
        // Pour chaque poste sélectionné, effectuez une requête pour récupérer les inscriptions correspondantes
        const promises = selectedPostes.map(poste => {
          return fetch(`https://awi-api-2.onrender.com/inscription-module/zone/${poste.idPoste}`);
        });
        const responses = await Promise.all(promises);
        const data = await Promise.all(responses.map(response => response.json()));
        setListInscriptions(data.flat()); // Flatten the array of arrays into a single array
      } catch (error) {
        console.error(error);
      }
    };

    const fetchInscriptionsByUser = async () => {
      try {
        const response = await fetch(`https://awi-api-2.onrender.com/inscription-module/volunteer/${benevoleId}`);
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
  }, [benevoleId, reloadPage, selectedPostes]);

  const getDaysDifference = (dateStart, dateEnd) => {
    const diffInTime = new Date(dateEnd) - new Date(dateStart);
    return diffInTime / (1000 * 3600 * 24); 
  };

  const handleForbiddenSlotClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSlotClick = (dayIndex, slot) => {
   
    postes.forEach(poste => {
      const selectedDate = new Date(festivalInfo.DateDebut);
      selectedDate.setDate(selectedDate.getDate() + dayIndex);

      const body = {
        "idBenevole": parseInt(localStorage.getItem('id')),
        "idPoste": poste.idPoste,
        "Creneau": slot,
        "Jour": selectedDate,
        "isPresent": false
      }

      const postInscription = async () => {
        try {
          const response = await fetch(`https://awi-api-2.onrender.com/inscription-module`, {
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
          alert('Inscription réussie');
          setReloadPage(true);
        } catch (error) {
          console.error(error);
        }
      };

      postInscription();
    });
  };

  const renderTimeSlots = () => {
    if (!festivalInfo || postes.length === 0) {
      return <p>Chargement en cours...</p>;
    }

    const dateDebut = new Date(festivalInfo.DateDebut);
    const daysDifference = getDaysDifference(dateDebut, new Date(festivalInfo.DateFin));

    const days = [];

    for (let i = 0; i <= daysDifference; i++) {
      const timeSlots = ['09-11', '11-14', '14-17', '17-20', '20-22'];

      days.push(
        <div className={styles.columnCalendar} key={i}>
          <h3 className={styles.dayTitle}>Jour {i + 1}</h3>
          <ul className={styles.cellColumnCalendar}>
            {timeSlots.map((slot, index) => {
              let day = new Date(festivalInfo.DateDebut);
              let formattedDate = new Date(day.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA');

              let inscriptionsByCreneauJour = listInscriptions.filter(inscription => {
                return inscription.Creneau === slot && inscription.Jour.startsWith(formattedDate);
              });

              let inscriptionsByUser = listInscriptionsByUser.filter(inscription => {
                return inscription.Creneau === slot && inscription.Jour.startsWith(formattedDate);
              });

              return (
                <li
                  className={`${inscriptionsByUser.length > 0 ? styles.disabledSlot : styles.cellCalendar}`}
                  key={index}
                  onClick={() => {
                    if (inscriptionsByUser.length === 0) {
                      handleSlotClick(i, slot);
                    } else {
                      handleForbiddenSlotClick();
                    }
                  }}
                >
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
    <div>
      <div className={styles.inscriptionCalendar}>
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
