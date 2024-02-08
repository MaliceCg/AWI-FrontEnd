import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListBenevoles from '../../components/AccueilAdmin/admin/ListeAModif';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import styles from '../../styles/listeBenevole.module.css';

const AdminListeBenevole = () => {
  const { idFestival } = useParams();
  const [selectedFestival, setSelectedFestival] = useState(idFestival);
  const [inscriptions, setInscriptions] = useState([]);
  const [idBenevoles, setIdBenevoles] = useState([]);
  const [isFlexibleChecked, setIsFlexibleChecked] = useState(false);
  const [listBenevoles, setListBenevoles] = useState([]);

  const handleCheckboxChange = (event) => {
    setIsFlexibleChecked(event.target.checked);
  };

  const handleFestivalChange = (newFestivalId) => {
    setSelectedFestival(newFestivalId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://awi-api-2.onrender.com/authentication-module');
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

    const fetchInscriptions = async () => {
      try {
        const response = await fetch(`https://awi-api-2.onrender.com/inscription-module`);
        if (response.ok) {
          const data = await response.json();
          setInscriptions(data);
          // Parcours liste inscriptions et enregistre les idBenevoles des inscriptions où l'idZoneBenevole est null
          const inscriptionsFlexible = data.filter(inscription => inscription.idZoneBenevole === null);
          const idBenevoles = inscriptionsFlexible.map(inscription => inscription.idBenevole);
          setIdBenevoles(idBenevoles);
        } else {
          throw new Error('Erreur lors de la récupération des données');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchInscriptions();

  }, []);

  return (
    <div>
      <Header currentPage="liste-benevole" idFestival={selectedFestival} onFestivalChange={handleFestivalChange} />
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <NavbarAdmin idFestival={selectedFestival} />
        </div>
        <div className={styles.benevoleContainer}>
          <h1 className={styles.benevoleTitle}>Liste des bénévoles</h1>
          <div className={styles.flexibleContainer}>
            <input
              type="checkbox"
              id="flexible"
              name="flexible"
              value="flexible"
              checked={isFlexibleChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="flexible">Bénévoles flexibles</label>
          </div>
          {listBenevoles.map((benevole, index) => (
            ((isFlexibleChecked && idBenevoles.includes(benevole.idBenevole)) || !isFlexibleChecked) && (
              <ListBenevoles idFestival={idFestival} key={index} benevole={benevole} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminListeBenevole;
