import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import styles from "../../../styles/espaceCreation.module.css";
import ListeReferent from "./ListeReferent";

const PosteFestival = (props) => {
    const { poste } = props;
    const { idFestival } = useParams();
    const accessToken = localStorage.getItem('token');
    const idPoste = poste.idPoste;

    const [zoneData, setZoneData] = useState({});
    const [editedPoste, setEditedPoste] = useState({
        nomPoste: poste.nomPoste,
        description: poste.description,
        capacite: poste.capacite,
        nomZone: "",
    });

    useEffect(() => {
        const fetchZoneData = async () => {
            if (poste.nomPoste.toLowerCase() === 'animation jeux') {
                return;
            }
            try {
                const response = await fetch(`https://awi-api-2.onrender.com/volunteer-area-module/${idPoste}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération de la zone bénévole');
                }

                const zoneData = await response.json();
                setZoneData(zoneData);

                setEditedPoste(prevState => ({
                    ...prevState,
                    nomZone: zoneData.nomZoneBenevole,
                }));
            } catch (error) {
                alert(error.message);
            }
        };

        fetchZoneData();
    }, [idPoste, accessToken]);

    let backgroundColor = '';

    switch (poste.nomPoste.toLowerCase()) {
        case 'accueil':
            backgroundColor = '#3CCBF4';
            break;
        case 'buvette':
            backgroundColor = '#117F45';
            break;
        case 'cuisine':
            backgroundColor = '#33C481';
            break;
        case 'animation jeux':
            backgroundColor = '#105C9F';
            break;
        default:
            backgroundColor = '#F4B740';
            break;
    }

    const dynamicStyle = {
        backgroundColor: backgroundColor,
    };

    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);

    const openConfirmationDialog = () => {
        setConfirmationDialogOpen(true);
    };

    const closeConfirmationDialog = () => {
        setConfirmationDialogOpen(false);
    };

    const openEditPopup = () => {
        setEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
    };

    const [shouldCloseEditPopup, setShouldCloseEditPopup] = useState(false);

    // Référence à la popup de modification pour vérifier si un clic est en dehors d'elle
    const editPopupRef = useRef(null);
  
    // Effet pour ajouter l'écouteur d'événements lors de l'ouverture de la popup de modification
    useEffect(() => {
      const handleClickOutsideEditPopup = (event) => {
        if (editPopupRef.current && !editPopupRef.current.contains(event.target)) {
          // Clic en dehors de la popup de modification, fermer la popup
          setShouldCloseEditPopup(true);
        }
      };
  
      if (isEditPopupOpen) {
        // Ajouter l'écouteur d'événements lorsque la popup de modification est ouverte
        document.addEventListener('mousedown', handleClickOutsideEditPopup);
      }
  
      // Retirer l'écouteur d'événements lorsque la popup de modification est fermée
      return () => {
        document.removeEventListener('mousedown', handleClickOutsideEditPopup);
      };
    }, [isEditPopupOpen]);
  
    // Effet pour fermer la popup de modification lorsque shouldCloseEditPopup est vrai
    useEffect(() => {
      if (shouldCloseEditPopup) {
        closeEditPopup();
        setShouldCloseEditPopup(false);
      }
    }, [shouldCloseEditPopup]);



    const updatePoste = async () => {
        try {
            if (poste.nomPoste.toLowerCase() !== 'animation jeux' && !zoneData.idZoneBenevole) {
            const updatedZone = {
                ...zoneData,
                nomZoneBenevole: editedPoste.nomZone,
                capacite: editedPoste.capacite
            };

            const responseUpdateZone = await fetch(`https://awi-api-2.onrender.com/volunteer-area-module/${idPoste}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(updatedZone),
            });

            if (!responseUpdateZone.ok) {
                throw new Error('Erreur lors de la mise à jour de la zone bénévole');
            }
        }

            const responseUpdatePoste = await fetch(`https://awi-api-2.onrender.com/position-module/${idPoste}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    nomPoste: editedPoste.nomPoste,
                    description: editedPoste.description,
                    capacite: editedPoste.capacite
                }),
            });

            if (!responseUpdatePoste.ok) {
                throw new Error('Erreur lors de la mise à jour du poste');
            }

            alert('Le poste a bien été modifié');
            props.fetchPostes();
            closeEditPopup();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericValue = name === "capacite" ? parseInt(value, 10) : value;
        setEditedPoste(prevState => ({
            ...prevState,
            [name]: numericValue,
        }));
    };

    const deletePoste = () => {
        // Supprimer la relation de zone bénévole
        fetch(`https://awi-api-2.onrender.com/volunteer-area-module/${idPoste}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de la relation zone bénévole');
            }
            // Supprimer le poste
            return fetch(`https://awi-api-2.onrender.com/employer-module/${idFestival}/${idPoste}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de la relation employer');
            }
            // Supprimer le poste
            return fetch(`https://awi-api-2.onrender.com/position-module/${idPoste}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du poste');
            }
            alert('Le poste a bien été supprimé');
            props.fetchPostes();
            closeConfirmationDialog();
        })
        .catch(error => {
            alert(error.message);
        });
    };

    return (
        <div className={`${styles.posteBox}`} style={dynamicStyle}>
            <h3 className={styles.posteTitle}>{poste.nomPoste}</h3>
            <div>
                <button className={styles.posteButton} onClick={openEditPopup}>
                    <EditIcon />
                </button>

                <button className={styles.posteButton} onClick={openConfirmationDialog}>
                    <DeleteForeverIcon />
                </button>

                {isConfirmationDialogOpen && (
                    <div className={styles.confirmationDialog}>
                        <div className={styles.confDialog}>
                            <p className={styles.TxtConf}>Êtes-vous sûr de vouloir supprimer ce poste ?</p>
                            <button className={styles.btn2} onClick={deletePoste}>Oui</button>
                            <button className={styles.btn2} onClick={closeConfirmationDialog}>Annuler</button>
                        </div>
                    </div>
                )}
            </div>

            {isEditPopupOpen && (
                <div className={styles.editPopup}>
                    <div ref={editPopupRef} className={styles.editPopupContent}>
                        <h1 className={styles.titre}>Modification du poste :</h1>
                        <label className={styles.label}>Nom du poste</label>
                        <input className={styles.editInput}
                            type="text"
                            name="nomPoste"
                            value={editedPoste.nomPoste}
                            onChange={handleInputChange}
                        />
                        <label className={styles.label}>Description</label>
                        <textarea className={styles.editText}
                            name="description"
                            value={editedPoste.description}
                            onChange={handleInputChange}
                        ></textarea>
                        <label className={styles.label}>Places disponibles </label>
                        <input className={styles.editInput}
                            type="number"
                            name="capacite"
                            value={editedPoste.capacite}
                            onChange={handleInputChange}
                        />
                        {poste.nomPoste.toLowerCase() !== 'animation jeux' && (
                            <div>
                                <label className={styles.label}>Nom de la zone bénévole</label>
                                <input className={styles.editInput}
                                    type="text"
                                    name="nomZone"
                                    value={editedPoste.nomZone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        <ListeReferent idPoste={idPoste}/>
                        <button className={styles.btn2} onClick={updatePoste}>Enregistrer</button>
                        <button className={styles.btn2} onClick={closeEditPopup}>Annuler</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PosteFestival;
