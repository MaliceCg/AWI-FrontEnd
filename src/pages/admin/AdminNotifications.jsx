import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import Notifications from '../../components/common/Notifications';
import styles from '../../styles/notif.module.css';

const AdminNotifications = () => {
  const { idFestival } = useParams();
  console.log(idFestival);
  return (
    <div>
        <Header currentPage="notifications" />
        <Link to={`/send-notif/${idFestival}`}>
        <button className={styles.btnSend}>Envoyez une notification à tous les bénévoles </button>
        </Link>
        <Notifications idFestival={idFestival} ></Notifications>
        <NavbarAdmin />
    </div>
  );
};

export default AdminNotifications;