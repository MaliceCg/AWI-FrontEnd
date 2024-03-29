import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Account from '../../img/account.svg';
import ActivitesIcon from '../../img/icons/activites.svg';
import HomeIcon from '../../img/icons/home.svg';
import InscriptionIcon from '../../img/icons/inscription.svg';
import NotifIcon from '../../img/icons/notif.svg';
import PlanningIcon from '../../img/icons/planning.svg';
import Logo from '../../img/logo.svg';
import '../../styles/navbar.css';

const Navbar = ({ idFestival }) => {
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setScrolling(currentScrollPos > 60 && currentScrollPos > prevScrollPos);
    setPrevScrollPos(currentScrollPos);
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [prevScrollPos]);

  return (
    <nav className={`navbar ${scrolling ? 'scrolling' : ''}`}>
      {/* Version mobile */}
      <div className="mobile-nav">
        <Link to={`/benevole-notification/${idFestival}`} className={`mobile-icon ${location.pathname === `/benevole-notification/${idFestival}` ? 'active' : ''}`}>
          <div className="iconBox">
            <img src={NotifIcon} alt="notifications" />
            <h2 className="titleNavbar">Notification</h2>
          </div>
        </Link>
        <Link to={`/benevole-planning/${idFestival}`} className={`mobile-icon ${location.pathname === `/benevole-planning/${idFestival}` ? 'active' : ''}`}>
          <div className="iconBox">
            <img src={PlanningIcon} alt="planning" />
            <p className="titleNavbar">Planning</p>
          </div>
        </Link>
        <Link to={`/benevole-dashboard/${idFestival}`} className={`mobile-icon ${location.pathname === `/benevole-dashboard/${idFestival}` ? 'active' : ''}`}>
          <div className="iconBox">
            <img src={HomeIcon} alt="accueil" />
            <h2 className="titleNavbar">Accueil</h2>
          </div>
        </Link>
        <Link to={`/benevole-activites/${idFestival}`} className={`mobile-icon ${location.pathname === `/benevole-activites/${idFestival}` ? 'active' : ''}`}>
          <div className="iconBox">
            <img src={ActivitesIcon} alt="activites" />
            <h2 className="titleNavbar">Activités</h2>
          </div>
        </Link>
        <Link to={`/benevole-inscription/${idFestival}`} className={`mobile-icon ${location.pathname === `/benevole-inscription/${idFestival}` ? 'active' : ''}`}>
          <div className="iconBox">
            <img src={InscriptionIcon} alt="inscription" />
            <h2 className="titleNavbar">S'inscrire</h2>
          </div>
        </Link>
      </div>

      {/* Version ordinateur */}
      <div className="desktop-nav">
        <img src={Logo} id="logo" alt="logo" />
        <Link to={`/benevole-dashboard/${idFestival}`} className={`desktop-item ${location.pathname === `/benevole-dashboard/${idFestival}` ? 'active' : ''}`}>Overview</Link>
        <Link to={`/benevole-planning/${idFestival}`} className={`desktop-item ${location.pathname === `/benevole-planning/${idFestival}` ? 'active' : ''}`}>Planning</Link>
        <Link to={`/benevole-inscription/${idFestival}`} className={`desktop-item ${location.pathname === `/benevole-inscription/${idFestival}` ? 'active' : ''}`}>Inscription</Link>
        <Link to={`/benevole-activites/${idFestival}`} className={`desktop-item ${location.pathname === `/benevole-activites/${idFestival}` ? 'active' : ''}`}>Activités</Link>
        <Link to={`/benevole-notification/${idFestival}`} className={`desktop-item ${location.pathname === `/benevole-notification/${idFestival}` ? 'active' : ''}`}>Notifications</Link>
        <Link to={`/compte/${idFestival}`} className={`account ${location.pathname === `/compte/${idFestival}` ? 'active' : ''}`}>
        <img src={Account} alt="compte" />
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
