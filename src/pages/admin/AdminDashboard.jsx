import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';


const AdminDashboard = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };
  return (
    <div>
        <Header currentPage="dashboard" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
        <NavbarAdmin idFestival={selectedFestival}/>
    </div>
  );
};

export default AdminDashboard;