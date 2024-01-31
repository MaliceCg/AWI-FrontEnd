import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ZoneFestival from '../../components/AccueilAdmin/admin/ZoneFestival';
import PopUpZone from '../../components/bénévole/PopUpZone';
import styles from '../../styles/inscription.module.css';
import { useNavigate } from 'react-router-dom';

const BenevoleInscriptionZone = () => {

    const navigate = useNavigate();

    const [listAreas, setListAreas] = useState([]);
    const [selectedZone, setSelectedZone] = useState(null);

    const { idFestival, idPoste } = useParams();

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
            <Header currentPage="inscription" />
            <div>
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
            <Navbar />
        </div>
    );
};

export default BenevoleInscriptionZone;