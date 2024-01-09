import React from 'react';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';


const BenevoleInscription = () => {
  return (
    <div>
        <Header currentPage="inscription" />
        <h1>Veuillez choisir le poste où vous souhaitez vous inscrire :</h1>

        <Navbar />
    </div>
  );
};

export default BenevoleInscription;