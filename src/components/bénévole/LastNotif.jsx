import React, { useEffect, useState } from 'react';
import styles from '../../styles/notif.module.css';

const LastNotif = ({ idFestival }) => {
  const [listNotif, setListNotif] = useState([]);
  console.log('idFestival = ', idFestival);

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const response = await fetch(`http://localhost:3000/notif-module/${idFestival}`);
        if (response.ok) {
          const data = await response.json();
          
          // Utilisez un objet pour stocker la dernière notification de chaque type
          const lastNotifications = {};

          // Parcourez les notifications et conservez seulement les dernières de chaque type
          data.forEach((notif) => {
            if (!lastNotifications[notif.Type] || new Date(notif.DateEnvoi) > new Date(lastNotifications[notif.Type].DateEnvoi)) {
              lastNotifications[notif.Type] = notif;
            }
          });

          // Transformez l'objet en un tableau des dernières notifications
          const lastNotifsArray = Object.values(lastNotifications);

          setListNotif(lastNotifsArray);
        } else {
          throw new Error('Erreur lors de la récupération des données');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotif();
  }, [idFestival]);

  return (
    <div>
      <div className={styles.NotificationContainer}>
        <h1 className={styles.h1}>Notifications</h1>
        {listNotif.length > 0 ? (
          listNotif.map((notif, index) => (
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

export default LastNotif;
