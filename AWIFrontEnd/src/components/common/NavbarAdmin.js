import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Account from '../../img/account.svg';
import ActivitesIcon from '../../img/icons/activites.svg';
import HomeIcon from '../../img/icons/home.svg';
import PlanningIcon from '../../img/icons/planning.svg';
import Logo from '../../img/logo.svg';
import '../../styles/navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* Version mobile */}
      <div className="mobile-nav">
        <Link to="/benevole-notification" className={`mobile-icon ${location.pathname === '/benevole-notification' ? 'active' : ''}`}>
          <img src={NotifIcon} alt="notifications" />
        </Link>
        <Link to="/benevole-planning" className={`mobile-icon ${location.pathname === '/benevole-planning' ? 'active' : ''}`}>
          <img src={PlanningIcon} alt="planning" />
        </Link>
        <Link to="/benevole-dashboard" className={`mobile-icon ${location.pathname === '/benevole-dashboard' ? 'active' : ''}`}>
          <img src={HomeIcon} alt="accueil" />
        </Link>
        <Link to="/benevole-activites" className={`mobile-icon ${location.pathname === '/benevole-activites' ? 'active' : ''}`}>
          <img src={ActivitesIcon} alt="activites" />
        </Link>
        <Link to="/benevole-inscription" className={`mobile-icon ${location.pathname === '/benevole-inscription' ? 'active' : ''}`}>
          <img src={InscriptionIcon} alt="inscription" />
        </Link>
      </div>

      {/* Version ordinateur */}
      <div className="desktop-nav">
        <img src={Logo} id="logo" alt="logo" />
        <Link to="/benevole-dashboard" className={`desktop-item ${location.pathname === '/benevole-dashboard' ? 'active' : ''}`}>Overview</Link>
        <Link to="/benevole-planning" className={`desktop-item ${location.pathname === '/benevole-planning' ? 'active' : ''}`}>Planning</Link>
        <Link to="/benevole-inscription" className={`desktop-item ${location.pathname === '/benevole-inscription' ? 'active' : ''}`}>Inscription</Link>
        <Link to="/benevole-activites" className={`desktop-item ${location.pathname === '/benevole-activites' ? 'active' : ''}`}>Activités</Link>
        <Link to="/benevole-notification" className={`desktop-item ${location.pathname === '/benevole-notification' ? 'active' : ''}`}>Notifications</Link>
        <Link to="/compte" className={`account ${location.pathname === '/compte' ? 'active' : ''}`}>
        <img src={Account} alt="compte" />
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
