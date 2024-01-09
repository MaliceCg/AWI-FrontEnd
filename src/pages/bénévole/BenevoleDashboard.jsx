import React from 'react';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import Planning from '../../components/bénévole/Planning';
import styles from '../../styles/benevoleDashboard.module.css';


const BenevoleDashboard = () => {

  return (
    <div>
      <Header currentPage="dashboard" />
      <Navbar />
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
