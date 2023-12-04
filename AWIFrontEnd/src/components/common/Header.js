// src/components/common/Header.js

import React from 'react';
import '../../styles/header.css';


const Header = ({ currentPage, user }) => {
  const getH3Text = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Bienvenue sur votre';
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

      default:
        return 'Titre par défaut';
    }

  }
  const getH1Text = () => {
    switch (currentPage) {
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

      default:
        return 'Titre par défaut';
    }
  };

  return (
    <header >
      <div id="header">
        <h3>{getH3Text()}</h3>
        <h1>{getH1Text()}</h1>
        <img src="../img/account.svg" alt="logo" />
      </div>
    </header>
  );
};

export default Header;
