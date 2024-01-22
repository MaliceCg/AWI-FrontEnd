import React, { useState } from 'react';
import styles from '../../../styles/creationFestival.module.css';

const CreationFestival = () => {

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJlbWFpbEBleGFtcGxlLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMzY3MTY2OCwiZXhwIjoxNzAzNzU4MDY4fQ.IzaIGhd1c0HrFF57zvrk0k7v9QAJ_iGvg4s-CeQTzsE';
    
    const currentDate = new Date().toISOString().split('T')[0];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [nomFestival, setNomFestival] = useState('');
    const [ville, setVille] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleStartDateChange = (event) => {
        const selectedStartDate = event.target.value;
        setStartDate(selectedStartDate);

        // Calculer la date de fin (2 jours après la date de début)
        const calculatedEndDate = new Date(selectedStartDate);
        calculatedEndDate.setDate(calculatedEndDate.getDate() + 2);

        // Mettre à jour la valeur de la date de fin seulement si l'utilisateur n'a pas modifié manuellement la date
        if (!endDate || new Date(endDate) <= calculatedEndDate) {
        setEndDate(calculatedEndDate.toISOString().split('T')[0]);
        }
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleNomFestivalChange = (event) => {
        setNomFestival(event.target.value);
      };
    
      const handleVilleChange = (event) => {
        setVille(event.target.value);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        //Vérification des données (non vide, date de fin > date de début, etc.
        if (!nomFestival || !startDate || !endDate || !ville) {
            console.error('Veuillez remplir tous les champs du formulaire.');
            //Affiche un message d'erreur à l'utilisateur
            return;
        }

        if(new Date(startDate) > new Date(endDate)){
            console.error('La date de fin doit être supérieure à la date de début.');
            //Affiche un message d'erreur à l'utilisateur
            return;
        }

        // Création de l'objet contenant les données à envoyer au serveur
        const festivalData = {
          NomFestival: nomFestival,
          DateDebut: startDate,
          DateFin: endDate,
          Ville: ville,
        };
    
        try {
          const response = await fetch('http://localhost:3000/festival-module', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`, // Ajout du token d'authentification
            },
            body: JSON.stringify(festivalData),
          });
    
          if (response.ok) {
            setIsSuccess(true);
            setIsError(false);
    
            // Masquer le bandeau de succès après 3 secondes
            setTimeout(() => {
              setIsSuccess(false);
            }, 3000);
          } else {
            // Gestion des erreurs en cas de problème avec la requête
            console.error('Erreur lors de la création du festival.');
            // Affiche un bandeau rouge d'erreur à l'utilisateur
          }
        } catch (error) {
          setIsError(true);
        setIsSuccess(false);
        setErrorMessage('Erreur lors de la création du festival.');

        // Masquer le bandeau d'erreur après 3 secondes
        setTimeout(() => {
          setIsError(false);
        }, 3000);
        }
      };
    

    return (
        <div className={styles.creationFestivalContainer} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Création Festival</h1>

          <form className={styles.festivalForm}>
              <div className={styles.formGroup}>
              <label htmlFor="nomFestival">Nom Festival</label>
              <input type="text" id="nomFestival" name="nomFestival" onChange={handleNomFestivalChange}/>
              </div>

              <div className={styles.formGroup}>
              <label htmlFor="dateDebut">Date début</label>
              <input
                  type="date"
                  id="dateDebut"
                  name="dateDebut"
                  min={currentDate}
                  value={startDate}
                  onChange={handleStartDateChange}
              />
              </div>

              <div className={styles.formGroup}>
              <label htmlFor="dateFin">Date fin</label>
              <input
                  type="date"
                  id="dateFin"
                  name="dateFin"
                  value={endDate}
                  min={startDate !== '' ? startDate:currentDate}
                  onChange={handleEndDateChange}
              />
              </div>

              <div className={styles.formGroup}>
              <label htmlFor="ville">Ville</label>
              <input type="text" id="ville" name="ville" onChange={handleVilleChange}/>
              </div>

              <button className={styles.submitButton} type="submit">Créer Festival</button>
          </form>

          <div>
            {isSuccess && (
              <div className={styles.successBanner}>
                <p>Le festival a été créé avec succès !</p>
              </div>
            )}

            {isError && (
              <div className={styles.errorBanner}>
                <p>Erreur : {errorMessage}</p>
              </div>
            )}

            {/* Votre formulaire */}
          </div>
        </div>
    );
};

export default CreationFestival;
