import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ListeFestivals from '../../components/AccueilAdmin/admin/ListeFestivals';
import Header from '../../components/common/Header';
import styles from '../../styles/espaceCreation.module.css';

const AdminFestivals = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  return (
    <div>
      <Header currentPage="festivals" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <div className={styles.wrapper}>
        <ListeFestivals linkPath="/espace-creation" />
              <Link to="/admin-creation-festival">
                <button className={styles.creationButton}>Créer un festival</button>
              </Link>
    
      </div>
    </div>
  );
};

export default AdminFestivals;
