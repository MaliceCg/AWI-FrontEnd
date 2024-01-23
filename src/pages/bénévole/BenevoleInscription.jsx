import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';


const BenevoleInscription = () => {
  const { idFestival } = useParams();
  console.log('Cest lid du festival',idFestival);
  return (
    <div>
        <Header currentPage="inscription" idFestival={idFestival} />
        <h1>Veuillez choisir le poste où vous souhaitez vous inscrire :</h1>
        <Navbar idFestival={idFestival}/>
    </div>
  );
};

export default BenevoleInscription;