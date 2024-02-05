import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import Notifications from '../../components/common/Notifications';
import styles from '../../styles/notif.module.css';


const AdminNotifications = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  return (
    <div>
        <Header currentPage="notifications" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
        <NavbarAdmin idFestival={selectedFestival}/>
        <div className={styles.NotifAdmin}>
        <Link to={`/send-notif/${selectedFestival}`}>
        <button className={styles.btnSend}>Envoyez une notification à tous les bénévoles </button>
        </Link>
        <Notifications idFestival={selectedFestival} ></Notifications>
        
        </div>
    </div>
  );
};

export default AdminNotifications;