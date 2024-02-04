import React, { useEffect, useState } from "react";
import styles from "../../../styles/creaNotif.module.css";

const CreaNotif = ({idFestival}) => {
  const accessToken = localStorage.getItem("token");

  const [notificationType, setNotificationType] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const [dateEnvoi, setDateEnvoi] = useState(new Date()); // Initialiser avec la date actuelle

  useEffect(() => {
    // Mettre à jour la date de l'envoi lors du montage du composant
    setDateEnvoi(new Date());
  }, []);

  const handleTypeChange = (e) => {
    setNotificationType(e.target.value);
  };

  const handleTextChange = (e) => {
    setNotificationText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si le type de notification et le texte ne sont pas vides
    if (!notificationType || !notificationText || !dateEnvoi) {
      alert("Veuillez remplir tous les champs");
      return;
    }


    // Créer un objet avec les données à envoyer au backend
    const notificationData = {
      Type: notificationType,
      TexteNotification: notificationText,
      idFestival: parseInt(idFestival, 10)
    };


    try {
      // Effectuer la requête POST vers le backend
      const response = await fetch("https://awi-api-2.onrender.com/notif-module", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(notificationData),
      });

      if (response.ok) {
        alert("Notification envoyée avec succès !");
        //redirige vers la page /admin-notification
        window.location.href = `/admin-notifications/${idFestival}`;
      } else {
        alert("Erreur lors de l'envoi de la notification");
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Notification à envoyer</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <select
          className={styles.select}
          value={notificationType}
          onChange={handleTypeChange}
        >
          <option value="">Type </option>
          <option value="Festival">Festival</option>
          <option value="Soirée Découverte">Soirée Découverte</option>
        </select>

        <textarea
          className={styles.textarea}
          type="text"
          placeholder="Texte de la notification"
          value={notificationText}
          onChange={handleTextChange}
        />

        <button type="submit" className={styles.btn}>
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default CreaNotif;
