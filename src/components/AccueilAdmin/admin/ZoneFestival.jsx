import React from "react";
import styles from "../../../styles/inscription.module.css";
import LinearProgress from '@mui/material/LinearProgress';
import { useState, useEffect } from 'react';

const ZoneFestival = ({ zone, onClick }) => {

    //get inscriptions by idZone via http://localhost:3000/inscription-module/zone/idZone

    const [listInscriptions, setListInscriptions] = useState([]);

    useEffect(() => {
        const fetchInscriptions = async () => {
            try {
                const response = await fetch(`http://localhost:3000/inscription-module/zone/${zone.idZone}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();
                setListInscriptions(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchInscriptions();
    }, [zone.idZone]);


    const progressBarValue = listInscriptions.length / zone.capacite;
    return (
        <div className={styles.zoneContainer} onClick={onClick}>
            <div className={styles.zoneBackground}>
                <h3>{zone.nomZoneBenevole}</h3>
                <LinearProgress variant="determinate" value={progressBarValue * 100} />
            </div>
        </div>
    );
};

export default ZoneFestival;
