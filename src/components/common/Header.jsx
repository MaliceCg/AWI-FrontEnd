// src/components/common/Header.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Account from '../../img/account.svg';
import styles from '../../styles/header.module.css';


const Header = ({ currentPage, user, idFestival, onFestivalChange }) => {
  const [selectedFestival, setSelectedFestival] = useState(idFestival);
  const [availableFestivals, setAvailableFestivals] = useState([]);

  const fetchAvailableFestivals = async () => {
    try {
      const response = await fetch('http://localhost:3000/festival-module');
      if (response.ok) {
        const data = await response.json();
        setAvailableFestivals(data);
      } else {
        throw new Error('Erreur lors de la récupération des festivals');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSelectedFestival(idFestival);
    fetchAvailableFestivals();
  }, [idFestival]); // Appel une seule fois au chargement du composant

  const handleFestivalChange = (event) => {
    const newFestivalId = event.target.value;
    setSelectedFestival(newFestivalId);
    onFestivalChange(newFestivalId);
  };
  const getH3Text = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Bienvenue sur votre';
      case 'accueil':
        return 'Bienvenue,';
      case 'profile':
        return 'Vous êtes sur votre';
      case 'inscription':
        return 'Ici vous pouvez vous';
      case 'liste-benevole':
        return 'Ici vous pouvez retrouver la';
      case 'notifications' :
        return 'Ici vous pouvez retrouver vos';
      case 'planning' :
        return 'Voici votre';
      case 'activites' :
        return 'Voici vos';
      case 'espace-creation' :
        return 'Bienvenue sur votre';
      case 'festivals' :
          return 'Ici vous pouvez gérer vos'

      default:
        return 'Titre par défaut';
    }

  }
  const getH1Text = () => {
    const name = localStorage.getItem('pseudo');
    switch (currentPage) {
      case 'accueil':
        return name;
      case 'dashboard':
        return 'Tableau de bord';
      case 'profile':
        return 'Profil utilisateur';
      case 'inscription':
        return 'Inscrire à une activité';
      case 'liste-benevole':
        return 'Liste des bénévoles';
      case 'notifications' :
        return 'Notifications';
      case 'planning' :
        return 'Planning';
      case 'activites' :
        return 'Activités Choisies';
      case 'espace-creation' :
        return 'Espace de création';
      case 'festivals' :
        return 'Festivals'

      default:
        return 'Titre par défaut';
    }
  };

  return (
    <header >
      <div className={styles.header}>
        <h3 className={styles.h3}>{getH3Text()}</h3>
        <h1 className={styles.h1}>{getH1Text()}</h1>
        <select value={selectedFestival} onChange={handleFestivalChange} className={styles.liste}>
          {availableFestivals.map((festival) => (
            <option key={festival.idFestival} value={festival.idFestival}>
              {festival.NomFestival}
            </option>
          ))}
        </select>
        </div>
        <div className={styles.headerLine}>
        <Link to={`/compte/${selectedFestival}`}>
          <img src={Account} alt="compte" className={styles.logoCompte} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
