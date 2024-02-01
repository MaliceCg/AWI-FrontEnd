// BenevoleDashboard.jsx

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Activite from '../../components/bénévole/Activite';
import LastNotif from '../../components/bénévole/LastNotif';
import Planning from '../../components/bénévole/Planning';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import styles from '../../styles/benevoleDashboard.module.css';

const BenevoleDashboard = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  useEffect(() => {
    setUserRole(localStorage.getItem('role'));
  }, []);

  return (
    <div>
      <Header currentPage="dashboard" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <Navbar idFestival={selectedFestival}/>
      <div className={styles.dashboardContainer}>
        {userRole === 'Admin' && (
          <Link to={`/admin-dashboard/${idFestival}`}>
            <button className={styles.btnMode}>Passez en mode Admin</button>
          </Link>
        )}
        {(userRole === 'Accueil' || userRole === 'Admin') && (
          <Link to={`/liste-benevole/${idFestival}`}>
            <button className={styles.btnMode}>Passez en mode Accueil</button>
          </Link>
        )}

        <div className={styles.desktopColumns}>
          <div className={styles.column}>
            <div className={styles.benevoleCalendar}>
              <Planning idFestival={selectedFestival}/>
            </div>
            <div className={styles.benevoleNotifications}>
              <LastNotif idFestival={selectedFestival}/>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.dashboardActivitiesContainer}>
              <Activite idFestival={selectedFestival} displayInline={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenevoleDashboard;
