import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CreationFestival from '../../components/AccueilAdmin/admin/CreationFestival';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import styles from '../../styles/espaceCreation.module.css';
const FestivalCreation = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };
  return (
    <div>
     <Header currentPage="espace-creation" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
        <NavbarAdmin idFestival={selectedFestival}/>
        </div>
        <div className={styles.creationFestival} >
          <CreationFestival />
        </div>
      </div>
    </div>
  );
};

export default FestivalCreation;
