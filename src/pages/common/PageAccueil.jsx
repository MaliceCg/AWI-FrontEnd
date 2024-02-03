import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../../components/common/FormInfo';
import nofestival from '../../img/noFestival.svg';
import styles from '../../styles/accueil.module.css';

function PageAccueil() {
  const [showPopup, setShowPopup] = useState(false);
  const [listFestivals, setListFestivals] = useState([]);

  useEffect(() => {
    const hasShownPopup = localStorage.getItem('hasShownPopup');
    if (!hasShownPopup) {
      setShowPopup(true);
      localStorage.setItem('hasShownPopup', 'true');
    }
  }, []);

  

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await fetch('http://localhost:3000/festival-module');
        if (response.ok) {
          const data = await response.json();
          setListFestivals(data); // Mettre à jour l'état avec les données récupérées
        } else {
          throw new Error('Erreur lors de la récupération des données');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFestivals(); // Appel de la fonction pour récupérer les données au chargement du composant
  }, []); // Le tableau vide [] signifie que useEffect ne s'exécute qu'une seule fois au montage du composant

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const handleFillLater = () => {

    setShowPopup(false);
  };

  const handleConfirm = (formData) => {

    setShowPopup(false);
    // Ajoutez ici toute autre logique nécessaire après la confirmation
  };

  return (
    <div>

      {showPopup && (
        <Form
          fields={[
            { type: 'text', name: 'name', label: 'Nom' },
            { type: 'text', name: 'shirtSize', label: 'Taille de t-shirt' },
            { type: 'text', name: 'dietaryRestrictions', label: 'Régime alimentaire' },
            { type: 'text', name: 'address', label: 'Adresse' },
          ]}
          buttonText="Confirmer"
          onSubmit={handleConfirm}
          clickableText="Remplir plus tard"
          clickableHref="/accueil"
          onClose={handleFillLater}
        />
      )}

      {(
        <div>
          {listFestivals.length === 0 ? (
            <div className={styles.DivNoFestival}>
              <img src={nofestival} alt="no festival" className={styles.nofestival} />
              <h3>Il n’y a pas de festival prévu pour le moment,</h3>
              <h1>Reviens plus tard</h1>
            </div>
          ) : (
            <div className={styles.festivalContainer}>
            <h1>Tu peux choisir ton Festival </h1>
            {listFestivals.map((festival, index) => (
              <div key={index}>
                <Link to={`/benevole-dashboard/${festival.idFestival}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className={styles.festivalBox}>
                    <div>
                      {festival.NomFestival}
                      <p className={styles.dateFestival}>Du {formatDate(festival.DateDebut)} au {formatDate(festival.DateFin)}</p>
                    </div>
                    <ArrowForwardIosIcon />
                  </div>
                </Link>
              </div>
            ))}
          </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PageAccueil;
