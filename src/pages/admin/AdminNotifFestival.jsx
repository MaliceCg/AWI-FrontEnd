import React from 'react';
import ListeFestivals from '../../components/AccueilAdmin/admin/ListeFestivals';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';


const AdminNotifications = () => {
  return (
    <div>
        <Header currentPage="notifications" />
        <ListeFestivals linkPath="/admin-notifications" />
        <NavbarAdmin />
    </div>
  );
};

export default AdminNotifications;