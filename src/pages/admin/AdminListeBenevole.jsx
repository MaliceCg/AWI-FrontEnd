import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListBenevoles from '../../components/AccueilAdmin/admin/ListeAModif';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import styles from '../../styles/listeBenevole.module.css';


const AdminListeBenevole = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };
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
      <Header currentPage="liste-benevole" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
        <NavbarAdmin idFestival={selectedFestival}/>
        </div>
        <div className={styles.benevoleContainer}>
          <h1 className={styles.benevoleTitle}>Liste des bénévoles</h1>
          {listBenevoles.map((benevole, index) => (
            <ListBenevoles idFestival={idFestival} benevole={benevole} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminListeBenevole;
