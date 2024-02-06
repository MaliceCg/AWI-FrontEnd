import React, { useEffect, useState } from 'react';
import styles from '../../styles/flexible.module.css';
import CalendarInscriptionFlexible from './CalendarInscriptionFlexible';

const FlexibleSelection = ({ postes, onSelectionChange, idFestival, onClose }) => {
  const [selectedPostes, setSelectedPostes] = useState([]);
  const [showPlanning, setShowPlanning] = useState(false);
  const [idZone, setIdZone] = useState();
  const [festivalInfo, setFestivalInfo] = useState(null);

  const handlePosteSelection = (idPoste, isChecked) => {
    if (isChecked) {
      setSelectedPostes([...selectedPostes, { idPoste }]);
    } else {
      const updatedSelection = selectedPostes.filter(poste => poste.idPoste !== idPoste);
      setSelectedPostes(updatedSelection);
    }
  };
  
  
  useEffect(() => {
    if (selectedPostes.length > 0) {
      fetchFestivalInfo();
    }
  }, [selectedPostes]);

  const fetchFestivalInfo = async () => {
    try {
      const response = await fetch(`https://awi-api-2.onrender.com/festival-module/${idFestival}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations du festival');
      }
      const data = await response.json();
      setFestivalInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowPlanning = () => {
    setShowPlanning(true);
  };

  const handlePlanningClose = () => {
    setShowPlanning(false);
  };

  const handleSaveSelection = () => {
    onSelectionChange(selectedPostes);
    setShowPlanning(false);
  };
console.log(postes);
console.log(selectedPostes);
  return (

      <div className={styles.modal}>
        <div className={styles.title}>
        <h3 className={styles.titre}>Sélectionnez les postes que vous désirez</h3>
        <button className={styles.popupCloseButton} onClick={onClose}>
        &times;
        </button>
        </div>
        <div>
          {postes.map((poste) => (
            poste.nomPoste !== 'Animation Jeux' && (
              <div key={poste.idPoste} className={styles.liste}>
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    id={poste.idPoste}
                    checked={selectedPostes.some(selected => selected.idPoste === poste.idPoste)}
                    onChange={(e) => handlePosteSelection(poste.idPoste, e.target.checked)}
                    />
                <label htmlFor={poste.idPoste} className={styles.label}>{poste.nomPoste}</label>
              </div>
            )
          ))}
        </div>
        {selectedPostes.length > 0 && (
          <button className={styles.btn} onClick={handleShowPlanning}>Afficher le planning</button>
        )}
        {showPlanning && (
          <div className={styles.planningcontainer}>
            <CalendarInscriptionFlexible festivalInfo={festivalInfo} postes={selectedPostes} idZone={idZone} />
          </div>
        )}
      </div>
  );
};

export default FlexibleSelection;
