import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/AccueilAdmin/admin/Loader';
import CalendarInscription from '../../components/bénévole/CalendarInscription';
import InscriptionPoste from '../../components/bénévole/InscriptionPoste';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import style from '../../styles/inscription.module.css';

const BenevoleInscriptionCreneau = () => {
    const { idFestival, idZone } = useParams();
    const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

    const [festivalInfo, setFestivalInfo] = useState(null);
    const [poste, setPoste] = useState(null);

    useEffect(() => {

        const fetchFestivalInfo = async () => {
            try {
              // Envoyer une requête GET au backend pour récupérer les informations du festival
              const response = await fetch(`https://awi-api-2.onrender.com/festival-module/${idFestival}`);
      
              if (!response.ok) {
                throw new Error('Erreur lors de la récupération des informations du festival');
              }
      
              const data = await response.json();
              setFestivalInfo(data); // Mettre à jour l'état avec les informations du festival
            } catch (error) {
              console.error(error);
            }
        };
          
        const fetchPoste = async () => {
            try {
                const response = await fetch(`https://awi-api-2.onrender.com/volunteer-area-module/${idZone}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();

 

                const responsePoste = await fetch(`https://awi-api-2.onrender.com/position-module/${data.idPoste}`);
                if (!responsePoste.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const dataPoste = await responsePoste.json();
                setPoste(dataPoste);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFestivalInfo();
        fetchPoste();
    }, [idFestival, idZone]);  
    
    if (!festivalInfo || !poste) {
        return <div>
        <Header currentPage="inscription" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
        <div className={style.loaderContainer}><Loader/></div>;
        <Navbar idFestival={selectedFestival}/>
        </div>
       
    }

    //get all areas of a festival where jeux is not empty
    return (
        <div>
            <Header currentPage="inscription" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
            <div className={style.inscriptionContainer}>
                <h2 className={style.titi}>Choisissez le créneau pour lequel vous souhaitez vous inscrire</h2>
                <div>
                    <InscriptionPoste poste={poste} />
                    <div className={style.planning}>
                        <CalendarInscription festivalInfo={festivalInfo} poste={poste} idZone={idZone} />
                    </div>
                </div>
            </div>
            <Navbar idFestival={selectedFestival}/>
        </div>
    );
}

export default BenevoleInscriptionCreneau;