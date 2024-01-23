import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';


const BenevoleActivites = () => {
  const { idFestival } = useParams();
  console.log('Cest lid du festival',idFestival);
  return (
    <div>
        <Header currentPage="activites" idFestival={idFestival} />
        <Navbar idFestival={idFestival}/>
    </div>
  );
};

export default BenevoleActivites;