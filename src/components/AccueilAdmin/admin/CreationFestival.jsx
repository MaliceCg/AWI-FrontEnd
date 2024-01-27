import React, { useState } from 'react';
import styles from '../../../styles/creationFestival.module.css';

const CreationFestival = () => {
    const accessToken = localStorage.getItem('token');

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
        let festivalId; // Variable pour stocker l'ID du festival
        console.log(startDate);
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
              'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(festivalData),
          });
      
          if (response.ok) {
            const festivalResponseData = await response.json(); // Convertir la réponse en JSON
            console.log(festivalData);
            console.log(festivalResponseData);
            festivalId = festivalResponseData.idFestival; // Récupérer l'ID du festival créé
            console.log(festivalId);
            setIsSuccess(true);
            setIsError(false);
      
            setTimeout(async () => {
              const postesData = [
                {
                  nomPoste: 'Accueil',
                  description: 'Ici vous devez accueillir les participants au festival et les orienter.',
                  capacite: 5,
                },
                {
                  nomPoste: 'Buvette',
                  description: 'Ici vous devez gérer la buvette et les participants au festival en leur vendant à boire et à manger.',
                  capacite: 5,
                },
                {
                  nomPoste: 'Animation Jeux',
                  description: 'Ici vous devez organiser et animer les jeux pour divertir les participants.',
                  capacite: 5,
                },
                {
                  nomPoste: 'Cuisine',
                  description: 'Ici vous devez gérer la cuisine et préparer des repas pour les participants au festival.',
                  capacite: 5,
                },
              ];
      
              for (const posteData of postesData) {
                const posteResponse = await fetch('http://localhost:3000/position-module', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                  },
                  body: JSON.stringify(posteData),
                });
      
                if (posteResponse.ok) {
                  const posteResponseData = await posteResponse.json(); // Convertir la réponse en JSON
                  const posteId = posteResponseData.idPoste; // Récupérer l'ID du poste créé
                            // Créer une zone avec le nom spécifié
                  const zoneData = {
                    idZoneBenevole : posteId,
                    nomZoneBenevole: `zone-${posteResponseData.nomPoste}`,
                    capacite:posteResponseData.capacite,  // Ajoutez la capacité que vous souhaitez
                    idFestival: festivalId,  // Associer la zone au festival créé
                    idPoste: posteId,  // Associer la zone au poste créé
                  };

        const zoneResponse = await fetch('http://localhost:3000/volunteer-area-module', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(zoneData),
        });

        if (zoneResponse.ok) {
          console.log(`La zone pour le poste ${posteData.nomPoste} a été créée avec succès !`);
        } else {
          console.error(`Erreur lors de la création de la zone pour le poste ${posteData.nomPoste}.`);
        }
// Lier le poste au festival dans la table employer
                  const employerData = {
                    idFestival: festivalId,
                    idPoste: posteId,
                  };
      
                  const employerResponse = await fetch('http://localhost:3000/employer-module', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(employerData),
                  });
      
                  if (employerResponse.ok) {
                    console.log(`Le poste ${posteData.nomPoste} a été lié au festival avec succès !`);
                  } else {
                    console.error(`Erreur lors de la liaison du poste ${posteData.nomPoste} au festival.`);
                  }
                } else {
                  console.error(`Erreur lors de la création du poste ${posteData.nomPoste}.`);
                }
              }
            }, 1000);
          } else {
            console.error('Erreur lors de la création du festival.');
          }
        } catch (error) {
          setIsError(true);
          setIsSuccess(false);
          setErrorMessage('Erreur lors de la création du festival, des postes, et de la liaison.');
      
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
