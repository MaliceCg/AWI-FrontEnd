import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';


const BenevoleInscription = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  return (
    <div>
        <Header currentPage="inscription" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
        <h1>Veuillez choisir le poste où vous souhaitez vous inscrire :</h1>
        <Navbar idFestival={selectedFestival}/>
    </div>
  );
};

export default BenevoleInscription;