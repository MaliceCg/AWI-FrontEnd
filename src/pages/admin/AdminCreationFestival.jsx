import React from 'react';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import CreationFestival from '../../components/AccueilAdmin/admin/CreationFestival'
import styles from '../../styles/espaceCreation.module.css';

const FestivalCreation = () => {
  return (
    <div>
      <Header currentPage="espace-creation" />
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <NavbarAdmin />
        </div>
        <div className={styles.creationFestival} >
          <CreationFestival />
        </div>
      </div>
    </div>
  );
};

export default FestivalCreation;
