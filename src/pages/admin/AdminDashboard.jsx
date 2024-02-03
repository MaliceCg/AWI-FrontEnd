import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminPlanning from '../../components/AccueilAdmin/admin/AdminPlanning';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import styles from '../../styles/benevoleDashboard.module.css';

const AdminDashboard = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };
  return (
    <div>
        <Header currentPage="dashboard" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
        <div className={styles.dashboardContainer}>
          <div className={styles.dashboardButtons}>
              <Link to={`/benevole-dashboard/${idFestival}`}>
                <button className={styles.btnMode}>Passez en mode bénévole</button>
              </Link>
              <Link to={`/liste-benevole/${idFestival}`}>
            <button className={styles.btnMode}>Passez en mode Accueil</button>
          </Link>
          </div>
            <div>
              <Link to={`/admin-creation-festival/${idFestival}`}>
                    <button className={styles.creationButton}>Créer un festival</button>
              </Link>
            </div>
            <div className={styles.benevoleListe}>
              <Link to={`/liste-benevole/${idFestival}`}>
                <button className={styles.ListeBenevole}> Gérer les benevoles</button>
              </Link>
            </div>
            <div className={styles.benevolePlanning}>
              <AdminPlanning idFestival={selectedFestival}/>
            </div>
           
        </div>

        
        <NavbarAdmin idFestival={selectedFestival}/>

    </div>
  );
};

export default AdminDashboard;