import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Planning from '../../components/AccueilAdmin/admin/AdminPlanning';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import styles from '../../styles/adminplanning.module.css';

const AdminPlanning = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };
  return (
    <div>

        <Header currentPage="planning" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
        <div className={styles.planningContainer}>
        <Planning idFestival={selectedFestival} />
        </div>
        <NavbarAdmin idFestival={selectedFestival}/>
    </div>
  );
};

export default AdminPlanning;