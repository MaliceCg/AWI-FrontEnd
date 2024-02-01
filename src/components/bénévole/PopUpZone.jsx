// Importez useState et créez un composant Popup
import React from 'react';
import styles from '../../styles/inscription.module.css';
import { useState, useEffect } from 'react';

const PopUpZone = ({ title, onClose, onChoose, idZone }) => {

    //get les jeux de la zone via http://localhost:3000/game-module/zoneBenevole/:idZone

    const [listJeux, setListJeux] = useState([]);

    console.log('idZone : ', idZone);

    useEffect(() => {
        const fetchJeux = async () => {
            try {
                const response = await fetch(`http://localhost:3000/game-module/zoneBenevole/${idZone}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();
                setListJeux(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJeux();
    }, [idZone]);
    

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <div className={styles.popupHeader}>
                    <span>{title}</span>
                    <button className={styles.popupCloseButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className={styles.popupBody}>
                    <ul>
                        {listJeux.map((jeu) => (
                            <li key={jeu.id}>{jeu.NomJeu}</li>
                        ))}
                    </ul>
                </div>
                <button className={styles.popupChooseButton} onClick={onChoose}>
                    Choisir cette zone
                </button>
            </div>
        </div>
    );
};

export default PopUpZone;