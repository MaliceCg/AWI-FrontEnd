import React, { useEffect, useState } from 'react';
import styles from '../../../styles/planning.module.css';

const AdminPlanning = ({idFestival}) => {
    const [festivalInfo, setFestivalInfo] = useState(null);
    const [popupBgColor, setPopupBgColor] = useState(''); // État pour stocker la couleur de fond du popup
    const [festivalPositions, setFestivalPositions] = useState([]); // État pour stocker les postes de l'utilisateur
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [AllPositions, setAllPositions] = useState([]); // État pour stocker les postes de l'utilisateur

    // Créer un dictionnaire pour stocker les inscriptions
    let inscriptions = {};
    
    const handleSlotClick = (day, slot, popupBgColor) => {
        console.log(`Créneau cliqué : Jour ${day + 1} - ${slot}`);
        // Mettre à jour l'état selectedSlot avec les informations du créneau cliqué
        setSelectedSlot({ day, slot });
        setPopupBgColor(popupBgColor); // Mettre à jour l'état avec la couleur de fond du popup
      };

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
            // Gérer les erreurs de requête ou de traitement des données
        }
        };

        const fetchPositions = async () => {
        try {
            // Récupérer tous les postes pour le festival spécifique
            const positionsResponse = await fetch(`http://localhost:3000/employer-module/festival/${idFestival}`);

            if (!positionsResponse.ok) {
            throw new Error('Erreur lors de la récupération des postes du festival');
            }

            const positionsData = await positionsResponse.json();

            // Récupérer les inscriptions de l'utilisateur pour chaque poste
            const userPromises = positionsData.map(async (position) => {
            const response = await fetch(`http://localhost:3000/inscription-module/position/${position.idPoste}`);

            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des inscriptions pour le poste ${position.idPoste}`);
            }

            const userPositionData = await response.json();

            return { ...position, userInscriptions: userPositionData }; // Associer les inscriptions au poste
            });

            // Attendre que toutes les requêtes pour les inscriptions se terminent
            const festivalPositionsResult = await Promise.all(userPromises);
            setFestivalPositions(festivalPositionsResult); // Mettre à jour l'état avec les postes de l'utilisateur
        } catch (error) {
            console.error(error);
            // Gérer les erreurs de requête ou de traitement des données
        }
        };

        const fetchAllPositions = async () => {
            try {
                const positionsResponse = await fetch(`http://localhost:3000/position-module`);
                
                if (!positionsResponse.ok) {
                    throw new Error('Erreur lors de la récupération des postes');
                }

                const positionsData = await positionsResponse.json();
                setAllPositions(positionsData); // Mettre à jour l'état avec les postes
            } catch (error) {
                console.error(error);
            }
        };

        fetchFestivalInfo();
        fetchPositions();
        fetchAllPositions();
    }, [idFestival]);


    // Fonction pour calculer le nombre de jours entre deux dates
    const getDaysDifference = (dateStart, dateEnd) => {
        const diffInTime = new Date(dateEnd) - new Date(dateStart);
        return diffInTime / (1000 * 3600 * 24); // Convertir la différence en jours
    };

    const renderTimeSlots = () => {
        if (!festivalInfo || festivalPositions.length === 0) {
          return <p>Chargement en cours...</p>;
        }
      
        const dateDebut = new Date(festivalInfo.DateDebut);
        const daysDifference = getDaysDifference(dateDebut, new Date(festivalInfo.DateFin));
      
        const days = [];
        for (let i = 0; i <= daysDifference; i++) {
          const timeSlots = ['09-11', '11-14', '14-17', '17-20', '20-22'];
          days.push(
            <div className={styles.columnCalendar} key={i}>
              <h3 className={styles.dayLabel}>Jour {i + 1}</h3>
              <ul className={styles.cellColumnCalendar}>
                {timeSlots.map((slot, index) => {  
                    
                    let dynamicStyle = {};
                    let remplissage = 'satisfaisant';

                    for (const position of festivalPositions) {
                        const filteredInscriptions = position.userInscriptions.filter((inscription) => {
                        const inscriptionDate = new Date(inscription.Jour);
                    
                        // Comparaison de la date avec dateDebut + i
                        const currentDate = new Date(dateDebut);
                        currentDate.setDate(dateDebut.getDate() + i);
                    
                        return (
                            inscriptionDate.getDate() === currentDate.getDate() &&
                            inscriptionDate.getMonth() === currentDate.getMonth() &&
                            inscriptionDate.getFullYear() === currentDate.getFullYear() &&
                            inscription.Creneau === slot
                        );
                        });

                        //Ajout des inscriptions dans le dictionnaire : clés = Jour-Creneau-idPoste et valeurs = nombre d'inscriptions
                        inscriptions[`${i}-${slot}-${position.idPoste}`] = filteredInscriptions.length;

                        if(remplissage !== 'critique' && filteredInscriptions.length > 0){
                            if(remplissage !== 'passable' && filteredInscriptions.length > 2){
                                if(remplissage !== 'satisfaisant' && filteredInscriptions.length > 4){
                                    remplissage = 'excellent';
                                } else{
                                    remplissage = 'satisfaisant';
                                }
                            } else{
                                remplissage = 'passable';
                            }
                        } else {
                            remplissage = 'critique';
                        }
                    }

                    let backgroundColor = '';

                    switch (remplissage) {
                        case 'excellent':
                            backgroundColor = '#7DF98A';
                            break;
                        case 'satisfaisant':
                            backgroundColor = '#FFDB5C';
                            break;
                        case 'passable':
                            backgroundColor = '#F99941';
                            break;
                        case 'critique':
                            backgroundColor = '#FD4F4F';
                            break;
                        default:
                            backgroundColor = '#FFFFFF';
                            break;
                    }

                    dynamicStyle = {
                        borderRadius: '12px',
                        backgroundColor: backgroundColor,
                    };

                    return (
                        <li className={styles.cellCalendar} style={dynamicStyle} key={index} onClick={() => handleSlotClick(i, slot, backgroundColor)}>
                            {slot}
                        </li>
                    );
                })}
              </ul>
            </div>
          );
        }
      
        return days;
    };
      
    
      return (
            <div className={styles.benevoleCalendar}>
            <h2 className={styles.titre}>Planning</h2>
            <div className={styles.Calendar}>
              {renderTimeSlots()}
            </div>
            <div className={styles.calendarLegend}>
    
              <div className={styles.legendColor} style={{ backgroundColor: '#FD4F4F' }}></div>
              <p>Critique</p>
    
              <div className={styles.legendColor} style={{ backgroundColor: '#F99941' }}></div>
              <p>Passable</p>
    
              <div className={styles.legendColor} style={{ backgroundColor: '#FFDB5C' }}></div>
              <p>Satisfaisant</p>
    
              <div className={styles.legendColor} style={{ backgroundColor: '#7DF98A' }}></div>
              <p>Parfait</p>
    
            </div>

            {/* Popup */}
            {selectedSlot && (
                <div className={styles.popup} style={{ backgroundColor: popupBgColor }}>
                    <div className={styles.closeButtonPopup} onClick={() => setSelectedSlot(null)}>
                        &#10006;
                    </div>
                    <h2 className={styles.popupTitle}>{`Jour ${selectedSlot.day + 1} - ${selectedSlot.slot}`}</h2>
                    
                    <div className={styles.popupContent}>
                        <ul>
                            {festivalPositions.map((position, index) => {
                                
                                const nbInscriptions = inscriptions[`${selectedSlot.day}-${selectedSlot.slot}-${position.idPoste}`];
                                const poste = AllPositions.find((p) => p.idPoste === position.idPoste);
                                return (
                                    <li className={styles.popupListe} key={index}>{poste.nomPoste} : {nbInscriptions} / {poste.capacite}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}


        </div>
      );
    };

export default AdminPlanning;
