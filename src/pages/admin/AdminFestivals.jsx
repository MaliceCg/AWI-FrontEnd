import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import { Link } from 'react-router-dom';

const AdminFestivals = () => {
  const [listFestivals, setListFestivals] = useState([]);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await fetch('http://localhost:3000/festival-module');
        if (response.ok) {
          const data = await response.json();
          setListFestivals(data); // Mettre à jour l'état avec les données récupérées
        } else {
          throw new Error('Erreur lors de la récupération des données');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFestivals(); // Appel de la fonction pour récupérer les données au chargement du composant
  }, []); // Le tableau vide [] signifie que useEffect ne s'exécute qu'une seule fois au montage du composant

  return (
    <div>
      <Header currentPage="festivals" />
      <NavbarAdmin />

      <div className="container">
        <h1>Liste des festivals</h1>
        {listFestivals.map((festival, index) => (
          <div key={index}>
            <Link to={`/espace-creation/${festival.idFestival}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>{festival.NomFestival}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFestivals;
