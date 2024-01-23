import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import style from '../../styles/inscription.module.css'
import InscriptionPoste from '../../components/bénévole/InscriptionPoste';
import CalendarInscription from '../../components/bénévole/CalendarInscription';

const BenevoleInscriptionCreneau = () => {
    const { idPoste, idZone } = useParams();
    const [poste, setPoste] = useState(null);

    console.log("idPoste : ", idPoste);

    useEffect(() => {
        console.log("useEffect idPoste : ", idPoste);
        const fetchPoste = async () => {
            try {
                console.log("poste : ", idPoste)
                const response = await fetch(`http://localhost:3000/position-module/${idPoste}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();
                setPoste(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPoste();
    }, [idPoste]); 
    
    console.log(poste);

    //get all areas of a festival where jeux is not empty
    return (
        <div>
            <Header currentPage="inscription" />
            <div className={style.inscriptionContainer}>
                <h2>Choisissez le créneau pour lequel souhaitez vous inscrire</h2>
                <div>
                    <InscriptionPoste poste={poste} />
                    <CalendarInscription />
                </div>
            </div>
            <Navbar />
        </div>
    );
}

export default BenevoleInscriptionCreneau;