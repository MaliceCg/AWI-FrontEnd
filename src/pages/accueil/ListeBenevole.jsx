import React, { useState, useEffect } from 'react';
import styles from '../../styles/listeBenevole.module.css';
import ListeACocher from '../../components/AccueilAdmin/accueil/ListeACocher.jsx';

import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';




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

  
  console.log(listBenevoles);

  return (
    <div>
      <Header currentPage="liste-benevole" />
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <NavbarAdmin />
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