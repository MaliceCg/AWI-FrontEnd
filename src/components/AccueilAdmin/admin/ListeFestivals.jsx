import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/listefestival.module.css';

const ListeFestivals = ({ linkPath }) => {
  const [listFestivals, setListFestivals] = useState([]);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await fetch('https://awi-api-2.onrender.com/festival-module');
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

  return (
    <div className={styles.festivalContainer}>
      <h1>Liste des festivals</h1>
      {listFestivals.map((festival, index) => (
        <div key={index}>
          <Link to={`${linkPath}/${festival.idFestival}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
  );
}

export default ListeFestivals;
