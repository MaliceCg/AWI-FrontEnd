import React, { useEffect, useState } from 'react';
import styles from '../../styles/inscription.module.css';

const PopUpZone = ({ title, onClose, onChoose, idZone }) => {
    const [idPoste, setIdPoste] = useState(null);
    const [listJeux, setListJeux] = useState([]);
    const [referentsDetails, setReferentsDetails] = useState([]);

    const fetchIdPoste = async () => {
        try {
            const response = await fetch(`https://awi-api-2.onrender.com/volunteer-area-module/${idZone}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            const data = await response.json();
            const postId = data.idPoste;
            setIdPoste(postId);
            return postId;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchInfoReferent = async (postId) => {
        const referentsResponse = await fetch(`https://awi-api-2.onrender.com/referent-module/position/${postId}`);
        const referentsData = await referentsResponse.json();

        const referentsDetails = await Promise.all(referentsData.map(async (referent) => {
            const referentResponse = await fetch(`https://awi-api-2.onrender.com/authentication-module/${referent.idBenevole}`);
            const referentData = await referentResponse.json();
            return {
                idReferent: referent.idBenevole,
                prenomReferent: referentData.Pseudo,
            };
        }));

        setReferentsDetails(referentsDetails);
    };

    useEffect(() => {
        const fetchData = async () => {
            const postId = await fetchIdPoste();

            if (postId) {
                fetchInfoReferent(postId);

                try {
                    const response = await fetch(`https://awi-api-2.onrender.com/game-module/zoneBenevole/${idZone}`);
                    if (!response.ok) {
                        throw new Error('Erreur lors de la récupération des données');
                    }
                    const data = await response.json();
                    setListJeux(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();
    }, [idZone]);

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <div className={styles.popupHeader}>
                    <span className={styles.popupTitle}>Informations sur la zone : </span>
                    <button className={styles.popupCloseButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <span className={styles.titre}>{title}</span>
                <div className={styles.popupBody}>
                    <p className={styles.pjeu}>
                        <strong className={styles.jeu}>Jeux à animer:</strong>
                        <ul className={styles.listeJeux}>
                            {listJeux
                                ? listJeux.map((jeu) => (
                                      <li key={jeu.id}>{jeu.NomJeu}</li>
                                  ))
                                : "Jeux non disponibles"}
                        </ul>
                    </p>
                    <p className={styles.preferent}>
                        <strong className={styles.info}>Référents:</strong>{" "}
                        {referentsDetails
                            ? referentsDetails.map((referent) => referent.prenomReferent).join(", ")
                            : "Référents non disponibles"}
                    </p>
                </div>
                <button className={styles.popupChooseButton} onClick={onChoose}>
                    Choisir cette zone
                </button>
            </div>
        </div>
    );
};

export default PopUpZone;
