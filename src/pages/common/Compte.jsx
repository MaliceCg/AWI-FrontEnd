import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import '../../styles/compte.css';

const Compte = () => {
  const idBenevole = localStorage.getItem('id');
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };
  useEffect(() => {
  
    const fetchUserData = async () => {
      try {
// A REMPLACER
        const response = await fetch(`http://localhost:3000/authentication-module/${idBenevole}`);
        const data = await response.json();

        setUserData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      }
    };

    fetchUserData();
  }, []); // Exécutez une seule fois lors du montage du composant
console.log(userData);
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div className='CompteInfo'>
      <Header currentPage="profile" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <Navbar idFestival={idFestival}/>
      <main>
        {userData ? (
          <div className='Infosutilisateur'>
            <h2>Mes Informations</h2>
              <span role="img" aria-label="Edit" onClick={handleEditClick}>
                ✏️
              </span>
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
      </main>
    </div>
  );
};

export default Compte;
