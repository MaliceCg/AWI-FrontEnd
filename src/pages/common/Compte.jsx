import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import '../../styles/compte.css';
import styles from "../../styles/editPopup.module.css";

const Compte = () => {
  const idBenevole = localStorage.getItem('id');
  
  const [userData, setUserData] = useState();
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/authentication-module/${idBenevole}`);
      const data = await response.json();
      setUserData(data);

      // Initialize editedInfo here after userData is updated
      const editedInfoData = {
        Pseudo: data?.Pseudo || '',
        Prenom: data?.Prenom || '',
        Nom: data?.Nom || '',
        Email: data?.Email || '',
        Adresse: data?.Adresse || '',
        Ville: data?.Ville || '',
        Telephone: data?.Telephone || '',
        Regime: data?.Regime || '',
        TailletTShirt: data?.TailletTShirt || '',
        StatutHebergement: data?.StatutHebergement || '',
        JeuPrefere: data?.JeuPrefere || '',
      };

      setEditedInfo(editedInfoData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [idBenevole]);

const [editedInfo, setEditedInfo] = useState({
  Pseudo: userData?.Pseudo || '', // Utilisation de l'opérateur de coalescence nullish
  Prenom: userData?.Prenom || '',
  Nom: userData?.Nom || '',
  Email: userData?.Email || '',
  Adresse: userData?.Adresse || '',
  Ville: userData?.Ville || '',
  Telephone: userData?.Telephone || '',
  Regime: userData?.Regime || '',
  TailletTShirt: userData?.TailletTShirt || '',
  StatutHebergement: userData?.StatutHebergement || '',
  JeuPrefere: userData?.JeuPrefere || '',
});
const [isEditPopupOpen, setEditPopupOpen] = useState(false);
const openEditPopup = () => {
setEditPopupOpen(true);
};

const closeEditPopup = () => {
setEditPopupOpen(false);
};
const updateInfo = async () => {
try {
  const response = await fetch(`http://localhost:3000/authentication-module/${idBenevole}/update-account`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedInfo),
  });
  console.log("editedInfo",editedInfo);

  if (!response.ok) {
    throw new Error('Erreur lors de la modification des données utilisateur');
  }

  const data = await response.json();
  setUserData(data);
  
  alert('Vos informations ont été modifiées avec succès !');
  fetchUserData();
  closeEditPopup();
} catch (error) {
  console.error(error);
}
};

const handleInputChange = (event) => {
const { name, value } = event.target;
setEditedInfo({
    ...editedInfo,
    [name]: value,
});
};

  return (
    <div className='CompteInfo'>
      <Header currentPage="profile" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <Navbar idFestival={idFestival}/>
      <main>
        {userData ? (
          <div className='Infosutilisateur'>
            <h2>Mes Informations</h2>
            <IconButton onClick={openEditPopup} color="primary">
              <EditIcon />
            </IconButton>
              <p>Pseudo: {userData.Pseudo}</p>
              <p>Prénom: {userData.Prenom}</p>
              <p>Nom: {userData.Nom}</p>
              <p>Email: {userData.Email}</p>
              <p>Adresse: {userData.Adresse}</p>
              <p>Ville : {userData.Ville}</p>
              <p>Telephone: {userData.Telephone}</p>
              <p>Régime Alimentaire: {userData.Regime}</p>
              <p>Taille T-Shirt: {userData.TailletTShirt}</p>
              <p>Logement: {userData.StatutHebergement}</p>
              <p>Jeu préféré: {userData.JeuPrefere}</p>
              <p>Nombre d'édition précédente : {userData.NombreEditionPrecedente}</p>
          </div>
        ) : (
            <div className='Infosutilisateur'>

            <h2>Mes Informations</h2>
            <p>Nom: chargement</p>
            <p>Email: chargement</p>
            <p>Adresse: chargement</p>
            <p>Email: chargement</p>
            <p>Telephone: chargement</p>
            <p>Régime Alimentaire: chargement</p>
            <p>Taille T-Shirt: chargement</p>
            <p>Pseudo: chargement</p>
            <p>Logement: chargemet</p>
            <p>Jeu préféré: chargement</p>
            </div>
        )}

        <button onClick={() => console.log('Déconnexion')}>Me Déconnecter</button>
        <p id="supp"onClick={() => console.log('Supprimer mon Compte')}>Supprimer mon Compte</p>

        {isEditPopupOpen && userData && (
                <div className={styles.editPopup}>
                    <div className={styles.editPopupContent}>
                        <h1 className={styles.titre}>Modification vos informations :</h1>
                        <label className={styles.label}>Pseudo</label>
                        <input className={styles.editInput}
                            type="text"
                            name="Pseudo"
                            value={editedInfo.Pseudo}
                            onChange={handleInputChange}
                        />
                        <label className={styles.label}>Nom</label>
                        <textarea className={styles.editText}
                            name="Nom"
                            value={editedInfo.Nom}
                            onChange={handleInputChange}
                        ></textarea>
                        <label className={styles.label}>Prénom </label>
                        <input className={styles.editInput}
                            type="text"
                            name="Prenom"
                            value={editedInfo.Prenom}
                            onChange={handleInputChange}
                        />
                        <label className={styles.label}>Email</label>
                        <input className={styles.editInput}
                            type="text"
                            name="Email"
                            value={editedInfo.Email}
                            onChange={handleInputChange}
                        />
                        <label className={styles.label}>Adresse</label>
                        <input className={styles.editInput}
                            type="text"
                            name="Adresse"
                            value={editedInfo.Adresse}
                            onChange={handleInputChange}
                        />
                        <label className={styles.label}>Ville</label>
                        <input className={styles.editInput}
                            type="text"
                            name="Ville"
                            value={editedInfo.Ville}
                            onChange={handleInputChange}
                        />
                        <label className={styles.label}>Telephone</label>
                        <input className={styles.editInput}
                            type="text"
                            name="Telephone"
                            value={editedInfo.Telephone}
                            onChange={handleInputChange}
                        />
                        <label className={styles.label}>Regime Alimentaire</label>
                        <select className={styles.editInput}
                            name="Regime"
                            value={editedInfo.Regime}
                            onChange={handleInputChange}
                        >
                            <option value="aucun">Peu importe</option>
                            <option value="vegetarien">Végétarien</option>
                            <option value="vegan">Omnivore</option>
                            <option value="sansGluten">Halal</option>
                        </select>

                        <label htmlFor="statutHebergement">Statut Hébergement:</label>
                          <select
                            id="statutHebergement"
                            name="StatutHebergement"
                            value={editedInfo.StatutHebergement}
                            onChange={handleInputChange}
                          >
                            <option value="en recherche">En Recherche</option>
                            <option value="proposition">Proposition</option>
                            <option value="rien">Rien</option>
                          </select>
                        <label className={styles.label}>Taille T-Shirt</label>
                        <select className={styles.editInput}
                            name="TailletTShirt"
                            value={editedInfo.TailletTShirt}
                            onChange={handleInputChange}
                        >
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        <label className={styles.label}>Jeu préféré</label>
                        <input className={styles.editInput}
                            type="text"
                            name="JeuPrefere"
                            value={editedInfo.JeuPrefere}
                            onChange={handleInputChange}
                        />

                        
                        <button className={styles.btn2} onClick={updateInfo}>Enregistrer</button>
                        <button className={styles.btn2} onClick={closeEditPopup}>Annuler</button>
                    </div>
                </div>
            )}
      </main>
    </div>
  );
};

export default Compte;
