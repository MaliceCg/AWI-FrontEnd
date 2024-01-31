import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import style from '../../styles/inscription.module.css'
import InscriptionPoste from '../../components/bénévole/InscriptionPoste';
import CalendarInscription from '../../components/bénévole/CalendarInscription';

const BenevoleInscriptionCreneau = () => {
    const { idFestival, idZone } = useParams();

    const [festivalInfo, setFestivalInfo] = useState(null);
    const [poste, setPoste] = useState(null);

    useEffect(() => {

        const fetchFestivalInfo = async () => {
            try {
              // Envoyer une requête GET au backend pour récupérer les informations du festival
              const response = await fetch(`http://localhost:3000/festival-module/${idFestival}`);
      
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
                const response = await fetch(`http://localhost:3000/volunteer-area-module/${idZone}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();

                console.log('data : ', data);

                const responsePoste = await fetch(`http://localhost:3000/position-module/${data.idPoste}`);
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
        return <p>Chargement en cours...</p>;
    }

    //get all areas of a festival where jeux is not empty
    return (
        <div>
            <Header currentPage="inscription" />
            <div className={style.inscriptionContainer}>
                <h2>Choisissez le créneau pour lequel souhaitez vous inscrire</h2>
                <div>
                    <InscriptionPoste poste={poste} />
                    <CalendarInscription festivalInfo={festivalInfo} poste={poste} idZone={idZone} />
                </div>
            </div>
            <Navbar />
        </div>
    );
}

export default BenevoleInscriptionCreneau;