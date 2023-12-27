import React from 'react';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';


const AdminDashboard = () => {
  return (
    <div>
        <Header currentPage="dashboard" />
        <NavbarAdmin />
    </div>
  );
};

export default AdminDashboard;