// ImportCSV.jsx
import React, { useState } from 'react';
import styles from '../../../styles/espaceCreation.module.css';
import { useParams } from 'react-router-dom';

const ImportCSV = () => {
  const accessToken = localStorage.getItem('token');
  const [errorDiv, setErrorDiv] = useState(null);
  const [csvContent, setCSVContent] = useState('');
  const { idFestival } = useParams();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (errorDiv) {
      setErrorDiv(null);
    }

    if (file) {
      if (file.type !== 'text/csv') {
        displayErrorMessage('Le format du fichier n\'est pas pris en charge. Veuillez sélectionner un fichier CSV.');
        return;
      }

      readCSVFile(file);
    }
  };

  const readCSVFile = async (file) => {
    try {
      const content = await readFileAsync(file);
      setCSVContent(content);
    } catch (error) {
      console.error('Erreur lors de la lecture du fichier CSV.', error);
      displayErrorMessage('Erreur lors de la lecture du fichier CSV.');
    }
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const importCSV = () => {
    if (!csvContent) {
      displayErrorMessage('Veuillez d\'abord sélectionner un fichier CSV.');
      return;
    }

    processData(csvContent);
  };

  const processData = (csvContent) => {
    const lines = csvContent.split('\n');

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i];
      const columns = currentLine.split(';');
      enterGameColumnsInDataBase(columns);
    }
  };

  const enterGameColumnsInDataBase = async (columns) => {
    const apiEndpointGame = 'http://localhost:3000/game-module';
  
    // Création de l'objet contenant les données à envoyer au serveur
    const gameData = {
      idJeu: columns[0],    // Colonne 1 : Identifiant du jeu
      NomJeu: columns[1],    // Colonne 2 : Nom du jeu
      Auteur: columns[2],    // Colonne 3 : Auteur du jeu
      Editeur: columns[3],   // Colonne 4 : Editeur du jeu
      NbJoueurs: columns[4],    // Colonne 5 : Nombre de joueurs
      AgeMin: columns[5],    // Colonne 6 : Age minimum
      Duree: columns[6],    // Colonne 7 : Durée du jeu
      TypePublic: columns[7],   // Colonne 8 : Type de jeu
      LienNotice: columns[8],     // Colonne 9 : Lien de la notice du jeu
      Animation: columns[12],     // Colonne 13 : Animation du jeu
      Recu: columns[13],       // Colonne 14 : Reçu ou non
      Mecanisme: columns[14],     // Colonne 15 : Mécanisme du jeu
      Theme: columns[15],     // Colonne 16 : Thème du jeu
      Tags: columns[16],       // Colonne 17 : Tags du jeu
      Description: columns[17],     // Colonne 18 : Description du jeu
      Image: columns[18],       // Colonne 19 : Image du jeu
      Logo: columns[19],       // Colonne 20 : Logo du jeu
      LienVideoExplicative: columns[20]       // Colonne 21 : Vidéo explicative du jeu
    };
  
    try {
      const response = await fetch(apiEndpointGame, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Ajout du token d'authentification
        },
        body: JSON.stringify(gameData),
      });
  
      if (response.ok) {
        console.log('Import successful:', response.data);
        // Afficher un message de succès ou effectuer d'autres actions nécessaires
      } else {
        // Gestion des erreurs en cas de problème avec la requête
        console.error('Erreur lors de l\'importation du jeu.');
        // Affichez un bandeau rouge d'erreur à l'utilisateur
      }
    } catch (error) {
      console.error('Erreur lors de l\'importation du jeu.', error);
      // Gestion des erreurs en cas d'échec de la requête
      // Affichez un bandeau rouge d'erreur à l'utilisateur
    }

    const apiEndpointZone = 'http://localhost:3000/volunteer-area-module';

    // Sélection du nom de la zone (colonne 11), utilisera la colonne 10 si la colonne 11 est vide
    const nomZone = columns[10] || columns[9]; // Colonne 11, sinon colonne 10
  
    // Création de l'objet contenant les données à envoyer au serveur
    const zoneData = {
      NomZone: nomZone,
      idZone: columns[11],    // Colonne 12 : Identifiant de la zone
      idFestival: idFestival
    };

    try {
      const response = await fetch(apiEndpointZone, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Ajout du token d'authentification
        },
        body: JSON.stringify(zoneData),
      });

      if (response.ok) {
        console.log('Import successful:', response.data);
        // Afficher un message de succès ou effectuer d'autres actions nécessaires
      } else {
        // Gestion des erreurs en cas de problème avec la requête
        console.error('Erreur lors de l\'importation du jeu.');
        // Affichez un bandeau rouge d'erreur à l'utilisateur
      }
    } catch (error) {
      console.error('Erreur lors de l\'importation du jeu.', error);
      // Gestion des erreurs en cas d'échec de la requête
      // Affichez un bandeau rouge d'erreur à l'utilisateur
    }
  };

  const displayErrorMessage = (message) => {
    setErrorDiv(<div style={{ color: 'red' }}>{message}</div>);
  };

  return (
    <div>
      <div id="fileInputContainer">
        <input className={styles.importButton} type="file" id="csvFileInput" onChange={handleFileChange} accept=".csv" />
      </div>
      <button className={styles.importButton} onClick={importCSV}>
        Importer des jeux (CSV)
      </button>
      <div id="resultContainer"></div>
      {errorDiv}
    </div>
  );
};

export default ImportCSV;
