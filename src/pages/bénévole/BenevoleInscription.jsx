import React from 'react';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import InscriptionPoste from '../../components/bénévole/InscriptionPoste';
import style from '../../styles/inscription.module.css';
import { useNavigate } from 'react-router-dom';

const BenevoleInscription = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  const [postes, setPostes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/employer-module/festival/${idFestival}`);
        if (response.ok) {
          const datas = await response.json();
          const postePromises = datas.map(async (data) => {
            const reponsePoste = await fetch(`http://localhost:3000/position-module/${data.idPoste}`);
            if (reponsePoste.ok) {
              return reponsePoste.json();
            } else {
              throw new Error('Erreur lors de la récupération des postes');
            }
          });
  
          const posteData = await Promise.all(postePromises);
          setPostes(posteData);
        } else {
          throw new Error('Erreur lors de la récupération des données');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPostes(); // Appel de la fonction fetch lors du premier rendu
  }, [idFestival]);

  console.log('postes : ', postes);

  const handlePosteClick = (idPoste, nomPoste) => {
    if (nomPoste === 'Animation Jeux') {
      //redirection vers la page animation jeux
      navigate(`/benevole-animation-jeux/${idFestival}/${idPoste}`);
    } else {
      //redirection vers la page inscription
      navigate(`/benevole-inscription-creneaux/${idFestival}/${idPoste}`);
    }
  };

  return (
    <div>
        <Header currentPage="inscription" />
        <h1>Veuillez choisir le poste où vous souhaitez vous inscrire :</h1>
        <Navbar />
    </div>
  );
};

export default BenevoleInscription;