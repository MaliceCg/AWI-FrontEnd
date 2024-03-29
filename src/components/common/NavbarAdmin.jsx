import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Account from '../../img/account.svg';
import ActivitesIcon from '../../img/icons/activites.svg';
import CreationIcon from '../../img/icons/creation.svg';
import HomeIcon from '../../img/icons/home.svg';
import PlanningIcon from '../../img/icons/planning.svg';
import SendIcon from '../../img/icons/send.svg';
import Logo from '../../img/logo.svg';
import '../../styles/navbar.css';

const NavbarAdmin = ({ idFestival }) => {
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
        <Link to={`/admin-notifications/${idFestival}`} className={`mobile-icon ${location.pathname === `/admin-notifications/${idFestival}` ? 'active' : ''}`}>
          <div className="iconBox">
            <img src={SendIcon} alt="notifications" />
            <h2 className="titleNavbar">Notifications</h2>
          </div>
        </Link>
        <Link to={`/admin-planning/${idFestival}`} className={`mobile-icon ${location.pathname === `/admin-planning/${idFestival}` ? 'active' : ''}`}>
          <div className="iconBox">
            <img src={PlanningIcon} alt="planning" />
            <h2 className="titleNavbar">Planning</h2>
          </div>
        </Link>
        <Link to={`/admin-dashboard/${idFestival}`} className={`mobile-icon ${location.pathname === `/admin-dashboard/${idFestival}` ? 'active' : ''}`}>
          <div className="iconBox">
            <img src={HomeIcon} alt="accueil" />
            <h2 className="titleNavbar">Accueil</h2>
          </div>
        </Link>
        <Link to={`/admin-liste-benevole/${idFestival}`} className={`mobile-icon ${location.pathname === `/admin-liste-benevole/${idFestival}` ? 'active' : ''}`}>
          <div className="iconBox">
            <img src={ActivitesIcon} alt="liste admins" />
            <h2 className="titleNavbar">Bénévoles</h2>
          </div>
        </Link>
        <Link to={`/espace-creation/${idFestival}`} className={`mobile-icon ${location.pathname === `/espace-creation/${idFestival}` ? 'active' : ''}`}>
          <div className="iconBox">
            <img src={CreationIcon} alt="espace creation" />
            <h2 className="titleNavbar">Création</h2>
          </div>
        </Link>
      </div>

      {/* Version ordinateur */}
      <div className="desktop-nav">
        <img src={Logo} id="logo" alt="logo" />
        <Link to={`/admin-dashboard/${idFestival}`} className={`desktop-item ${location.pathname === `/admin-dashboard/${idFestival}` ? 'active' : ''}`}>Overview</Link>
        <Link to={`/admin-planning/${idFestival}`} className={`desktop-item  ${location.pathname === `/admin-planning/${idFestival}` ? 'active' : ''}`}>Planning</Link>
        <Link to={`/espace-creation/${idFestival}`} className={`desktop-item ${location.pathname === `/espace-creation/${idFestival}` ? 'active' : ''}`}>Espace Création</Link>
        <Link to={`/admin-liste-benevole/${idFestival}`} className={`desktop-item ${location.pathname === `/admin-liste-benevole/${idFestival}` ? 'active' : ''}`}>Liste Bénévoles</Link>
        <Link to={`/admin-notifications/${idFestival}`} className={`desktop-item ${location.pathname === `/admin-notifications/${idFestival}` ? 'active' : ''}`}>Notifications</Link>
        <Link to={`/compte/${idFestival}`} className={`account ${location.pathname === `/compte/${idFestival}` ? 'active' : ''}`}>
        <img src={Account} alt="compte" />
        </Link>

      </div>
    </nav>
  );
};

export default NavbarAdmin;
