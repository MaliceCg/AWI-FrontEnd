import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InscriptionPoste from '../../components/bénévole/InscriptionPoste';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import style from '../../styles/inscription.module.css';
import { Margin } from '@mui/icons-material';


const BenevoleFlexiblePoste = () => {
  const { idFestival } = useParams();
//   console.log('idFestival : ', idFestival);
  const [selectedFestival, setSelectedFestival] = useState(idFestival);
  const [selectedPostes, setSelectedPostes] = useState([]);
  
  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  const [postes, setPostes] = useState([]);

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

    fetchPostes();
  }, [idFestival]);

  //console.log('postes : ', postes);

  const handlePosteClick = (idPoste, nomPoste) => {
    const isSelected = selectedPostes.includes(nomPoste);
    if (isSelected) {
      setSelectedPostes(selectedPostes.filter(nom => nom !== nomPoste));
    } else {
      setSelectedPostes([...selectedPostes, nomPoste]);
    }
  };

  const handleValidation = () => {
    console.log("Postes sélectionnés :", selectedPostes);
    // Vous pouvez faire d'autres actions avec les postes sélectionnés ici
  };

  return (
    <div>
      <Header currentPage="inscription" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <div className={style.inscriptionContainer}>
        <h2 className={style.title}>Veuillez choisir le poste où vous souhaitez vous inscrire :</h2>
        <div>
          {postes.map((poste, index) => (
           <InscriptionPoste 
           key={index} 
           poste={poste} 
           isSelected={selectedPostes.includes(poste.idPoste)}
           style={{ opacity: selectedPostes.includes(poste.idPoste) ? 0.7 : 1 }}
           onClick={() => handlePosteClick(poste.idPoste, poste.nomPoste)}
         />
         
          ))}
        </div>

       
        <div>
            {selectedPostes.map((poste, index) => (
                <p key={index}>{poste}</p>
            ))}
        </div>    
       <button onClick={handleValidation} style={{ marginTop: '20px', marginBottom: '20px' }}> Valider la sélection </button>


        <p>
          <a className={style.flexibleText} href={"/benevole-inscription/"+idFestival} target="_self" rel="noopener noreferrer">
            {"Je ne suis pas flexible sur les postes"}
          </a>
        </p>
      </div>
      <Navbar idFestival={selectedFestival}/>
    </div>
  );
};

export default BenevoleFlexiblePoste;
