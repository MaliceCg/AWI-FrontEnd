import React from 'react';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';


const AdminNotifications = () => {
  return (
    <div>
        <Header currentPage="notifications" />
        <NavbarAdmin />
    </div>
  );
};

export default AdminNotifications;