import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ZoneFestival from '../../components/AccueilAdmin/admin/ZoneFestival';
import PopUpZone from '../../components/bénévole/PopUpZone';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import styles from '../../styles/inscription.module.css';

const BenevoleInscriptionZone = () => {
    const { idFestival, idPoste } = useParams();
    const [selectedFestival, setSelectedFestival] = useState(idFestival);
  
    const handleFestivalChange = (newFestivalId) => {
      setSelectedFestival(newFestivalId);
    };

    const navigate = useNavigate();

    const [listAreas, setListAreas] = useState([]);
    const [selectedZone, setSelectedZone] = useState(null);



    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await fetch(`http://localhost:3000/volunteer-area-module/${idFestival}/${idPoste}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();
                setListAreas(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAreas();
    }, [idFestival, idPoste]);

    const openPopup = (zone) => {
        setSelectedZone(zone);
        console.log('zone : ', zone);
    };

    const closePopup = () => {
        setSelectedZone(null);
    };

    const chooseZone = () => {
        navigate(`/benevole-inscription-creneaux/${idFestival}/${selectedZone.idZoneBenevole}`)
        closePopup();
    };

    return (
        <div>
             <Header currentPage="inscription" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
            <div className={styles.ContainerAllZone}>
                <h2 className={styles.title}>Choisissez la zone où vous souhaitez vous inscrire</h2>

                {listAreas.map((area) => (
                    <ZoneFestival key={area.id} zone={area} onClick={() => openPopup(area)} />
                ))}

                {selectedZone && (
                    <PopUpZone
                        idZone={selectedZone.idZoneBenevole}
                        title={selectedZone.nomZoneBenevole}
                        onClose={closePopup}
                        onChoose={chooseZone}
                    />
                )}
            </div>
            <Navbar idFestival={selectedFestival}/>
        </div>
    );
};

export default BenevoleInscriptionZone;