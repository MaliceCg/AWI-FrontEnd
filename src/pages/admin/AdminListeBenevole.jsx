import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';

const AdminListeBenevole = () => {
  const [listBenevoles, setListBenevoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/authentication-module');
        if (response.ok) {
          const data = await response.json();
          setListBenevoles(data); // Mettre à jour l'état avec les données récupérées
        } else {
          throw new Error('Erreur lors de la récupération des données');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Appel de la fonction pour récupérer les données au chargement du composant
  }, []); // Le tableau vide [] signifie que useEffect ne s'exécute qu'une seule fois au montage du composant

  return (
    <div>
      <Header currentPage="liste-benevole" />
      <NavbarAdmin />
      <div>
        <h1>Liste des bénévoles</h1>
        {listBenevoles.map((benevole, index) => (
          <div key={index}>
            {benevole.Nom}
            {benevole.Prenom}
            {benevole.Role}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminListeBenevole;
