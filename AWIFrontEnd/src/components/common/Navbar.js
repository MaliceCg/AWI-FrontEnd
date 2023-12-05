// Navbar.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Account from '../../img/account.svg';
import ActivitesIcon from '../../img/icons/activites.svg';
import HomeIcon from '../../img/icons/home.svg';
import InscriptionIcon from '../../img/icons/inscription.svg';
import NotifIcon from '../../img/icons/notif.svg';
import PlanningIcon from '../../img/icons/planning.svg';
import Logo from '../../img/logo.svg';
import '../../styles/navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* Version mobile */}
      <div className="mobile-nav">
        <Link to="/notifications" className={`mobile-icon ${location.pathname === '/notifications' ? 'active' : ''}`}>
          <img src={NotifIcon} alt="notifications" />
        </Link>
        <Link to="/planning" className={`mobile-icon ${location.pathname === '/planning' ? 'active' : ''}`}>
          <img src={PlanningIcon} alt="planning" />
        </Link>
        <Link to="/accueil" className={`mobile-icon ${location.pathname === '/accueil' ? 'active' : ''}`}>
          <img src={HomeIcon} alt="accueil" />
        </Link>
        <Link to="/activites" className={`mobile-icon ${location.pathname === '/activites' ? 'active' : ''}`}>
          <img src={ActivitesIcon} alt="activites" />
        </Link>
        <Link to="/inscription" className={`mobile-icon ${location.pathname === '/inscription' ? 'active' : ''}`}>
          <img src={InscriptionIcon} alt="inscription" />
        </Link>
      </div>

      {/* Version ordinateur */}
      <div className="desktop-nav">
        <img src={Logo} id="logo" alt="logo" />
        <Link to="/accueil" className={`desktop-item ${location.pathname === '/accueil' ? 'active' : ''}`}>Overview</Link>
        <Link to="/planning" className={`desktop-item ${location.pathname === '/planning' ? 'active' : ''}`}>Planning</Link>
        <Link to="/inscription" className={`desktop-item ${location.pathname === '/inscription' ? 'active' : ''}`}>Inscription</Link>
        <Link to="/activites" className={`desktop-item ${location.pathname === '/activites' ? 'active' : ''}`}>Activités</Link>
        <Link to="/notifications" className={`desktop-item ${location.pathname === '/notifications' ? 'active' : ''}`}>Notifications</Link>
        <Link to="/compte" className={`account ${location.pathname === '/compte' ? 'active' : ''}`}>
        <img src={Account} alt="compte" />
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
