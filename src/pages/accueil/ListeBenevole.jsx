import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListeACocher from '../../components/AccueilAdmin/accueil/ListeACocher.jsx';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar.jsx';
import styles from '../../styles/listeBenevole.module.css';
const ListeBenevole = () => {
  const [listBenevoles, setListBenevoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/inscription-module/getAllbenevoleInscritToday');
        if (response.ok) {
          const data = await response.json();
          setListBenevoles(data);
        } else {
          throw new Error('Erreur lors de la récupération des données');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  return (
    <div>
      <Header currentPage="liste-benevole" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
        <Navbar idFestival={selectedFestival}/>
        </div>
        <div className={styles.benevoleContainer}>
          {listBenevoles.map((benevole, index) => (
            <ListeACocher benevole={benevole} key={index}  />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListeBenevole;