import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Account from '../../img/account.svg';
import ActivitesIcon from '../../img/icons/activites.svg';
import CreationIcon from '../../img/icons/creation.svg';
import HomeIcon from '../../img/icons/home.svg';
import PlanningIcon from '../../img/icons/planning.svg';
import SendIcon from '../../img/icons/send.svg';
import Logo from '../../img/logo.svg';
import '../../styles/navbar.css';

const NavbarAdmin = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* Version mobile */}
      <div className="mobile-nav">
        <Link to="/admin-notifications" className={`mobile-icon ${location.pathname === '/admin-notifications' ? 'active' : ''}`}>
          <img src={SendIcon} alt="notifications" />
        </Link>
        <Link to="/admin-planning" className={`mobile-icon ${location.pathname === '/admin-planning' ? 'active' : ''}`}>
          <img src={PlanningIcon} alt="planning" />
        </Link>
        <Link to="/admin-dashboard" className={`mobile-icon ${location.pathname === '/admin-dashboard' ? 'active' : ''}`}>
          <img src={HomeIcon} alt="accueil" />
        </Link>
        <Link to="/admin-liste-benevole" className={`mobile-icon ${location.pathname === '/admin-liste-benevole' ? 'active' : ''}`}>
          <img src={ActivitesIcon} alt="liste admins" />
        </Link>
        <Link to="/festivals" className={`mobile-icon ${location.pathname === '/espace-creation' ? 'active' : ''}`}>
          <img src={CreationIcon} alt="espace creation" />
        </Link>
      </div>

      {/* Version ordinateur */}
      <div className="desktop-nav">
        <img src={Logo} id="logo" alt="logo" />
        <Link to="/admin-dashboard" className={`desktop-item ${location.pathname === '/admin-dashboard' ? 'active' : ''}`}>Overview</Link>
        <Link to="/admin-planning" className={`desktop-item ${location.pathname === '/admin-planning' ? 'active' : ''}`}>Planning</Link>
        <Link to="/espace-creation" className={`desktop-item ${location.pathname === '/espace-creation' ? 'active' : ''}`}>Espace Création</Link>
        <Link to="/admin-liste-benevole" className={`desktop-item ${location.pathname === '/admin-liste-benevole' ? 'active' : ''}`}>Liste Bénévoles</Link>
        <Link to="/admin-notifications" className={`desktop-item ${location.pathname === '/admin-notifications' ? 'active' : ''}`}>Notifications</Link>
        <Link to="/compte" className={`account ${location.pathname === '/compte' ? 'active' : ''}`}>
        <img src={Account} alt="compte" />
        </Link>

      </div>
    </nav>
  );
};

export default NavbarAdmin;
