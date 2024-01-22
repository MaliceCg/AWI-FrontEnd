import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import styles from "../../../styles/espaceCreation.module.css";

const PosteFestival = (props) => {
    const { poste } = props;
    const { idFestival } = useParams();
    const accessToken = localStorage.getItem('token');
    const idPoste = poste.idPoste;
    console.log(idPoste);
    console.log(accessToken);
    let backgroundColor = '';

    switch (poste.nomPoste.toLowerCase()) {
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

    const dynamicStyle = {
        backgroundColor: backgroundColor,
    };
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [editedPoste, setEditedPoste] = useState({
        nomPoste: poste.nomPoste,
        description: poste.description,
        capacite: poste.capacite,
    });

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
    const updatePoste = () => {
        fetch(`http://localhost:3000/position-module/${idPoste}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(editedPoste),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du poste');
            }
            // Mettre à jour les données du poste dans l'interface utilisateur si nécessaire
            // Peut-être recharger les données depuis le serveur ou mettre à jour l'état local
        })
        .catch(error => {
            alert(error.message);
        });
        alert('Le poste a bien été modifié');
        props.fetchPostes();
        // Après la mise à jour, fermer la popup de modification
        closeEditPopup();
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
        fetch(`http://localhost:3000/employer-module/${idFestival}/${idPoste}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

      }).then(response => {
             if (!response.ok) {
                throw new Error('Erreur lors de la suppression de la relation employer');
           }
             return fetch(`http://localhost:3000/position-module/${idPoste}`, {
                method: 'DELETE',
                headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
            });
         }).then(response => {
             if (!response.ok) {
               throw new Error('Erreur lors de la suppression du poste');
           }

       
        }).catch(error => {
            alert(error.message);
        });
        alert('Le poste a bien été supprimé');
        props.fetchPostes();
        // Après la suppression, fermer la boîte de dialogue
        closeConfirmationDialog();
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
                        <div className={styles.editPopupContent}>
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
                        <button className={styles.btn2} onClick={updatePoste}>Enregistrer</button>
                        <button className={styles.btn2} onClick={closeEditPopup}>Annuler</button>
                        </div>
                    </div>
                )}
            </div>
    );
};

export default PosteFestival;
