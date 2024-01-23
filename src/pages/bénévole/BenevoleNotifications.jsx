import React from 'react';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import Notifications from '../../components/common/Notifications';


const BenevoleNotification = () => {
  const idFestival = localStorage.getItem("idFestival");
  return (
    <div>
        <Header currentPage="notifications" />
        <Notifications idFestival={idFestival} />
        <Navbar />
    </div>
  );
};

export default BenevoleNotification;