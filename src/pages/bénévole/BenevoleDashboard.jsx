import React from 'react';
import { useParams } from 'react-router-dom';
import Planning from '../../components/bénévole/Planning';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import styles from '../../styles/benevoleDashboard.module.css';


const BenevoleDashboard = () => {
  const { idFestival } = useParams();
  console.log('Cest lid du festival',idFestival);


  return (
    <div>
      <Header currentPage="dashboard" idFestival={idFestival} />
      <Navbar idFestival={idFestival}/>
      <div className={styles.dashboardContainer}>
        <h1>Planning</h1>
        <div className={styles.benevoleCalendar}>
          <Planning />
        </div>
      </div>
      
    </div>
  );
};

export default BenevoleDashboard;
