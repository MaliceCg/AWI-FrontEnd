import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import styles from '../../styles/adminDashboard.module.css';
import AdminPlanning from '../../components/AccueilAdmin/admin/AdminPlanning';

const AdminDashboard = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };
  return (
    <div>
        <Header currentPage="dashboard" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
        <div className={styles.adminDashboard}>
        <Link to={`/benevole-dashboard/${idFestival}`}>
          <button className={styles.btnMode}>Passez en mode bénévole</button>
        </Link>
        </div>

        <div>
          <AdminPlanning idFestival={selectedFestival}/>
        </div>

        <NavbarAdmin idFestival={selectedFestival}/>

    </div>
  );
};

export default AdminDashboard;