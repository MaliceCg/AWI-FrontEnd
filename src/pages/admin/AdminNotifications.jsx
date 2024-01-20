import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import styles from '../../styles/notif.module.css';


const AdminNotifications = () => {
  return (
    <div>
        <Header currentPage="notifications" />
        <Link to='/notif'>
        <button className={styles.btnSend}>Envoyez une notification à tous les bénévoles </button>
        </Link>
        <NavbarAdmin />
    </div>
  );
};

export default AdminNotifications;