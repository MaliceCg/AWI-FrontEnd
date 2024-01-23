import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import Notifications from '../../components/common/Notifications';


const BenevoleNotification = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  return (
    <div>
        <Header currentPage="notifications" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
        <Notifications idFestival={selectedFestival} />
        <Navbar idFestival={selectedFestival}/>
    </div>
  );
};

export default BenevoleNotification;