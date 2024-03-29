import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FlexibleSelection from '../../components/bénévole/FlexibleSelection';
import InscriptionPoste from '../../components/bénévole/InscriptionPoste';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import style from '../../styles/inscription.module.css';

const BenevoleInscription = () => {
  const { idFestival } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  const [postes, setPostes] = useState([]);

  const navigate = useNavigate();
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const fetchPostes = async () => {
      try {
        const response = await fetch(`https://awi-api-2.onrender.com/employer-module/festival/${idFestival}`);
        if (response.ok) {
          const datas = await response.json();
          const postePromises = datas.map(async (data) => {
            const reponsePoste = await fetch(`https://awi-api-2.onrender.com/position-module/${data.idPoste}`);
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
      <Header currentPage="inscription" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <div className={style.inscriptionContainer}>
          <h2 className={style.title}>Veuillez choisir le poste où vous souhaitez vous inscrire :</h2>
          <div>
              {postes.map((poste, index) => (
                <InscriptionPoste key={index} poste={poste} onClick={() => {
                  handlePosteClick(poste.idPoste, poste.nomPoste);
                }}/>
              ))}
          </div>

          <p className={style.flexibleText} onClick={openModal}>Je suis flexible sur les postes</p>
        </div>
        {showModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
          <FlexibleSelection postes={postes} idFestival={idFestival} onSelectionChange={(selectedPostes) => console.log(selectedPostes)} onClose={closeModal}/>
          </div>
        </div>
      )}
        <Navbar idFestival={selectedFestival}/>
    </div>
  );
};

export default BenevoleInscription;