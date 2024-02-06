import React, { useEffect, useState } from 'react';
import style from '../../../styles/attributionPoste.module.css';

const AttributionPoste = ({ idFestival, idBenevole, creneau, jour }) => {
console.log(idBenevole);
    const [inscriptions, setInscriptions] = useState([])
    const [allPositions, setAllPositions] = useState([]); // État pour stocker les postes de l'utilisateur

    const handlePosteClick = async (poste) => {
        const updatePromises = inscriptions.map(async (inscription) => {
            if (inscription.idPoste !== poste.idPoste) {
                await fetch(`http://localhost:3000/inscription-module/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idBenevole: parseInt(inscription.idBenevole),
                        idPoste: parseInt(inscription.idPoste),
                        Creneau: inscription.Creneau,
                        Jour: inscription.Jour,
                    }),
                });
            } else {
                if(poste.nomPoste === "Animation jeux"){
                    //get all zones via this : http://localhost:3000/volunteer-area-module/:idFestival/:idPoste
                    const response = await fetch(`http://localhost:3000/volunteer-area-module/${idFestival}/${poste.idPoste}`);
                    if (!response.ok) {
                        throw new Error('Erreur lors de la récupération des zones');
                    }

                    const zonesData = await response.json();

                    //pick a random zone
                    const randomZone = zonesData[Math.floor(Math.random() * zonesData.length)];
            
                    await fetch(`http://localhost:3000/inscription-module/update`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idBenevole: parseInt(inscription.idBenevole),
                            idPoste: parseInt(inscription.idPoste),
                            Creneau: inscription.Creneau,
                            Jour: inscription.Jour,
                            updateInscriptionDto: {
                                idZoneBenevole: parseInt(randomZone.idZoneBenevole),
                            },
                        }),
                    });

                } else {
                    await fetch(`http://localhost:3000/inscription-module/update`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idBenevole: parseInt(inscription.idBenevole),
                            idPoste: parseInt(inscription.idPoste),
                            Creneau: inscription.Creneau,
                            Jour: inscription.Jour,
                            updateInscriptionDto: {
                                idZoneBenevole: parseInt(poste.idPoste),
                            },
                        }),
                    });
                }
            }
        });
    
        try {
            await Promise.all(updatePromises);
            // Toutes les requêtes ont réussi
            console.log('Mises à jour terminées avec succès.');
        } catch (error) {
            console.error('Erreur lors des mises à jour :', error);
        }

        window.location.href = `http://localhost:3006/admin-liste-benevole/1`;
    };
    

    useEffect(() => {
        const fetchInscriptions = async () => {
            try {

                //change jour format to dd/mm/yyyy to yyyy-mm-dd
                let date = jour.split('/'); 
                date = date[2] + '-' + date[1] + '-' + date[0];
                console.log(date);
                const response = await fetch(`http://localhost:3000/inscription-module/volunteer/${idBenevole}/jour/${date}/creneau/${creneau}`);

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des inscriptions');
                }

                const inscriptionsData = await response.json();
                setInscriptions(inscriptionsData);

            } catch (error) {
                console.error(error);
            }
        };

        const fetchAllPositions = async () => {
            try {
                const positionsResponse = await fetch(`http://localhost:3000/position-module`);

                if (!positionsResponse.ok) {
                    throw new Error('Erreur lors de la récupération des postes');
                }

                const positionsData = await positionsResponse.json();
                setAllPositions(positionsData);
            } catch (error) {
                console.error(error);
            }
        };


        fetchInscriptions();
        fetchAllPositions();
    } , [idBenevole, creneau, jour]);


    return (
        <div>
            <div>
                <h2 className={style.posteTitle}>A quel poste souhaitez-vous affecter ce bénévole ?</h2>
                
                {inscriptions.map((inscription, index) => {
                    // Filtrer les objets de allPositions pour trouver celui avec idPoste égal à inscription.idPoste
                    const objetsFiltres = allPositions.filter(objet => objet.idPoste === inscription.idPoste);

                    // Vérifier si un objet correspondant a été trouvé
                    if (objetsFiltres.length > 0) {
                        let backgroundColor = '';

                        switch (objetsFiltres[0].nomPoste.toLowerCase()) {
                            case 'accueil':
                                backgroundColor = '#3CCBF4';
                                break;
                            case 'buvette':
                                backgroundColor = '#117F45';
                                break;
                            case 'animation jeux':
                                backgroundColor = '#33C481';
                                break;
                            case 'cuisine':
                                backgroundColor = '#105C9F';
                                break;
                            default:
                                backgroundColor = '#F4B740';
                                break;
                        }
                    
                        let dynamicStyle = {
                            backgroundColor: backgroundColor,
                        };

                        return (
                            <div key={index}>
                                <h3 className={style.posteBox} style={dynamicStyle} onClick={() => handlePosteClick(objetsFiltres[0])}>{objetsFiltres[0].nomPoste}</h3>
                            </div>
                        );
                    } else {
                        return null; // Aucun objet correspondant trouvé
                    }
                })}
            </div>
        </div>
    );
    
};

export default AttributionPoste;
