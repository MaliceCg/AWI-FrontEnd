// ImportCSV.jsx
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/espaceCreation.module.css';
import Loader from './Loader';

const ImportCSV = ({ idFestival }) => {
  const apiEndpointGame = 'https://awi-api-2.onrender.com/game-module';
  const apiEndpointZone = 'https://awi-api-2.onrender.com/volunteer-area-module';
  const accessToken = localStorage.getItem('token');
  const [errorDiv, setErrorDiv] = useState(null);
  const [csvContent, setCSVContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


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

  const importCSV = async () => {
    if (!csvContent) {
      displayErrorMessage('Veuillez d\'abord sélectionner un fichier CSV.');
      return;
    }

    try {
      setLoading(true);
      await processData(csvContent);
      setSuccessMessage('Importation réussie !');
    } catch (error) {
      console.error('Erreur lors du traitement du fichier CSV.', error);
      displayErrorMessage('Erreur lors du traitement du fichier CSV.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      alert(successMessage); // Vous pouvez utiliser une bibliothèque de pop-up plus avancée ici
      setSuccessMessage('');
    }
  }, [successMessage]);

  const processData = async (csvContent) => {
    const lines = csvContent.split('\n');
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i];
      const columns = currentLine.split(';');
      await enterDataInDatabase(columns);
    }
  };

  const enterDataInDatabase = async (columns) => {
    await enterZoneData(columns);
    await enterGameData(columns);
  };

  const checkExistingData = async (endpoint, id) => {
    try {
      const response = await fetch(`${endpoint}/${id}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        return null;
      } else {
        throw new Error(`Erreur lors de la vérification de l'existence des données: ${response.status}`);
      }
    } catch (error) {
      console.error(`Erreur lors de la vérification de l'existence des données.`, error);
      throw error;
    }
  };

  const updateData = async (endpoint, id, newData) => {
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour des données: ${response.status}`);
      }

      // console.log(`Données avec ID ${id} mises à jour avec succès.`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données.', error);
      throw error;
    }
  };

  const insertData = async (endpoint, data) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de l'insertion des données: ${response.status}`);
      }

      console.log(`Insertion des données réussie.`);
    } catch (error) {
      console.error('Erreur lors de l\'insertion des données.', error);
      throw error;
    }
  };

  const enterGameData = async (columns) => {
    const idJeux = parseInt(columns[0], 10);
    // console.log('idJeux :', idJeux);
    const existingGameData = await checkExistingData(apiEndpointGame, idJeux);
  
    if (existingGameData) {
      const updatedGameData = {
        NomJeu: columns[1],
        Auteur: columns[2],
        Editeur: columns[3],
        NbJoueurs: columns[4],
        AgeMin: columns[5],
        Duree: columns[6],
        TypePublic: columns[7],
        LienNotice: columns[8],
        Animation: columns[12],
        Recu: columns[13],
        Mecanisme: columns[14],
        Theme: columns[15],
        Tags: columns[16],
        Description: columns[17],
        LienVideoExplicative: columns[20],
      };
  
      // console.log('Données de mise à jour :', updatedGameData);
      // console.log('ID :', existingGameData.idJeux);
      await updateData(apiEndpointGame, existingGameData.idJeux, updatedGameData);

    } else {
      const newGameData = {
        idJeux: parseInt(columns[0], 10),
        NomJeu: columns[1],
        Auteur: columns[2],
        Editeur: columns[3],
        NbJoueurs: columns[4],
        AgeMin: columns[5],
        Duree: columns[6],
        TypePublic: columns[7],
        LienNotice: columns[8],
        Animation: columns[12],
        Recu: columns[13],
        Mecanisme: columns[14],
        Theme: columns[15],
        Tags: columns[16],
        Description: columns[17],
        LienVideoExplicative: columns[20],
        idZoneBenevole: parseInt(columns[11], 10)
      };
  
      // console.log('Données d\'insertion :', newGameData);
      await insertData(apiEndpointGame, newGameData);
    }
  };
  

  const enterZoneData = async (columns) => {
    const idZone = parseInt(columns[11], 10);
    const existingZoneData = await checkExistingData(apiEndpointZone, idZone);
  
    const fetchPoste = async () => {
      try {
        const response = await fetch(`https://awi-api-2.onrender.com/employer-module/festival/${idFestival}`);
        if (response.ok) {
          const data = await response.json();
          const postePromises = data.map(async (data) => {
            const reponsePoste = await fetch(`https://awi-api-2.onrender.com/position-module/${data.idPoste}`);
            if (reponsePoste.ok) {
              return reponsePoste.json();
            } else {
              throw new Error('Erreur lors de la récupération des postes');
            }
          });
          const posteData = await Promise.all(postePromises);
          // console.log('posteData :', posteData);
          return posteData;
        } else {
          throw new Error('Erreur lors de la récupération des postes');
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
  
    const postes = await fetchPoste();
    const poste = postes.find(poste => poste.nomPoste === "Animation Jeux");
    // const idZoneBenevole = parseInt(columns[11], 10);

    if (existingZoneData) {
      if (poste.idPoste) {
        const idPoste = poste.idPoste;

        const updatedZoneData = {
          nomZoneBenevole: columns[10] || columns[9],
          idFestival: parseInt(idFestival, 10),
          idPoste: parseInt(idPoste, 10)
        };
  
        // console.log('Données de mise à jour Zone :', updatedZoneData);
        await updateData(apiEndpointZone, existingZoneData.idZoneBenevole, updatedZoneData);
      } else {
        console.error('Erreur lors de la récupération des informations du poste pour la mise à jour de la zone.');
      }
    } else {
      if (poste.idPoste) {
        const idPoste = poste.idPoste;
  
        const newZoneData = {
          nomZoneBenevole: columns[10] || columns[9],
          idZoneBenevole: parseInt(columns[11], 10),
          idFestival: parseInt(idFestival, 10),
          idPoste: parseInt(idPoste, 10),
          capacite: 3,
        };
        // console.log('Données d\'insertion Zone :', newZoneData);
        await insertData(apiEndpointZone, newZoneData);
      } else {
        console.error('Erreur lors de la récupération des informations du poste pour l\'insertion de la zone.');
      }
    }
  };
  

  const displayErrorMessage = (message) => {
    setErrorDiv(<div style={{ color: 'red' }}>{message}</div>);
  };

  return (
    <div>
      {loading && <div className={styles.loading}>Chargement, merci de patienter quelques minutes...</div>}
      {loading && <Loader />} {/* Affichez le loader si loading est true */}
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
