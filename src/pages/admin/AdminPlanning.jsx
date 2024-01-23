import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';

const AdminPlanning = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };
  return (
    <div>

        <Header currentPage="planning" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
        <NavbarAdmin idFestival={selectedFestival}/>
    </div>
  );
};

export default AdminPlanning;