import React from 'react';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
//il faudra penser a changer la navbar si c'est un admin

const Compte = () => {
  return (
    <div>
        <Header currentPage="profile" />
        <Navbar />
    </div>
  );
};

export default Compte;