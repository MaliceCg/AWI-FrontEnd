import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import Notifications from '../../components/common/Notifications';


const BenevoleNotification = () => {
  const { idFestival } = useParams();
  return (
    <div>
        <Header currentPage="notifications" />
        <Notifications idFestival={idFestival} />
        <Navbar />
    </div>
  );
};

export default BenevoleNotification;