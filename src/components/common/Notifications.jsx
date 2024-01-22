import React, { useEffect, useState } from 'react';
import styles from '../../styles/notif.module.css';

const Notifications = () => {
  const [listNotif, setListNotif] = useState([]);

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const response = await fetch('http://localhost:3000/notif-module');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setListNotif(data); // Mettre à jour l'état avec les données récupérées
        } else {
          throw new Error('Erreur lors de la récupération des données');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotif(); // Appel de la fonction pour récupérer les données au chargement du composant
  }, []); // Le tableau vide [] signifie que useEffect ne s'exécute qu'une seule fois au montage du composant

  // Séparer les notifications en deux groupes en fonction du type
  const soiréeDécouverteNotifs = listNotif.filter((notif) => notif.Type === 'Soirée Découverte');
  const autresNotifs = listNotif.filter((notif) => notif.Type !== 'Soirée Découverte');

  return (
    <div>
      <div className={styles.NotificationContainer}>
        {soiréeDécouverteNotifs.length > 0 && (
          <>
            <h1 className={styles.h1}>Soirée Découverte</h1>
            {soiréeDécouverteNotifs.map((notif, index) => (
              <div key={index}>
                <div className={styles.TexteNotification}>{notif.TexteNotification}</div>
              </div>
            ))}
          </>
        )}
        <h1 className={styles.h1}>Notifications</h1>
        {autresNotifs.length > 0 ? (
          autresNotifs.map((notif, index) => (
            <div key={index}>
              <div className={styles.TexteNotification}>{notif.TexteNotification}</div>
            </div>
          ))
        ) : (
          <p>Aucune notification</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
