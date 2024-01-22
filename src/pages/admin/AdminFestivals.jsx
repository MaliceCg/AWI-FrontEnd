import React from 'react';
import { Link } from 'react-router-dom';
import ListeFestivals from '../../components/AccueilAdmin/admin/ListeFestivals';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import styles from '../../styles/espaceCreation.module.css';

const AdminFestivals = () => {

  return (
    <div>
      <Header currentPage="festivals" />
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <NavbarAdmin />
        </div>
        <ListeFestivals linkPath="/espace-creation" />
              <Link to="/admin-creation-festival">
                <button className={styles.creationButton}>Créer un festival</button>
              </Link>
    
      </div>
    </div>
  );
};

export default AdminFestivals;
