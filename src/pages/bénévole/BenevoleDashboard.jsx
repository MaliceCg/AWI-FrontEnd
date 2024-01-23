import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LastNotif from '../../components/bénévole/LastNotif';
import Planning from '../../components/bénévole/Planning';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import styles from '../../styles/benevoleDashboard.module.css';


const BenevoleDashboard = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };



  return (
    <div>
      <Header currentPage="dashboard" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <Navbar idFestival={selectedFestival}/>
      <div className={styles.dashboardContainer}>
        <div className={styles.benevoleCalendar}>
          <Planning idFestival={selectedFestival}/>
        </div>
      <div className={styles.benevoleNotifications}>
        <LastNotif idFestival={selectedFestival}/>
      </div>
    </div>
    </div>
  );
};

export default BenevoleDashboard;
