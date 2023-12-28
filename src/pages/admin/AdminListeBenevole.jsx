import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import styles from '../../styles/listeBenevole.module.css';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';

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
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <NavbarAdmin />
        </div>
        <div className={styles.benevoleContainer}>
          <h1 className={styles.benevoleTitle}>Liste des bénévoles</h1>
          {listBenevoles.map((benevole, index) => (
            <div className={styles.benevoleBox} key={index}>
              <div>
                <div className={styles.nomBenevole}>
                  {benevole.Nom} {benevole.Prenom}
                </div>
                {benevole.Role}
              </div>
              <div className={styles.iconsBenevole}>
                <EditIcon />
                <EmailIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminListeBenevole;
