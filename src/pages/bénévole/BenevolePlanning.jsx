import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import Planning from '../../components/bénévole/Planning';
import styles from '../../styles/benevoleDashboard.module.css';

const BenevolePlanning = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  return (
    <div>
        <Header currentPage="planning" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
        
        <div className={styles.dashboardContainer}>
          <div className={styles.benevoleCalendar}>
            <Planning idFestival={selectedFestival}/>
          </div>
        </div>

        <Navbar idFestival={selectedFestival}/>
    </div>
  );
};

export default BenevolePlanning;