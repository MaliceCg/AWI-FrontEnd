import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';


const BenevoleActivites = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };
  return (
    <div>
      <Header currentPage="activites" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
        <Navbar idFestival={selectedFestival}/>
    </div>
  );
};

export default BenevoleActivites;