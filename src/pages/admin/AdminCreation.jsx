import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import NavbarAdmin from '../../components/common/NavbarAdmin';
import PosteFestival from '../../components/AccueilAdmin/admin/PosteFestival';
import styles from '../../styles/espaceCreation.module.css';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ImportCsv from '../../components/AccueilAdmin/admin/ImportCsv';

const EspaceCreation = () => {
  const { idFestival } = useParams();
  const [postes, setPostes] = useState([]);

  useEffect(() => {
    const fetchPostes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/employer-module/festival/${idFestival}`);
        if (response.ok) {
          const datas = await response.json();
          console.log("data : ", datas);
          const postePromises = datas.map(async (data) => {
            const reponsePoste = await fetch(`http://localhost:3000/position-module/${data.idPoste}`);
            if (reponsePoste.ok) {
              return reponsePoste.json();
            } else {
              throw new Error('Erreur lors de la récupération des postes');
            }
          });
  
          const posteData = await Promise.all(postePromises);
          setPostes(posteData);
        } else {
          throw new Error('Erreur lors de la récupération des données');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPostes(); // Appel de la fonction fetch lors du premier rendu
  }, [idFestival]);

  console.log("postes : ", postes);

  return (
    <div>
      <Header currentPage="espace-creation" />
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <NavbarAdmin />
        </div>
        <div className={styles.componentContainer}>
          <ImportCsv />

          <div className={styles.posteContainer}>
            <h3>Postes existants pour ce Festival : </h3>
            <div>
              {postes.map((poste, index) => (
                <PosteFestival key={index} poste={poste} />
              ))}
            </div>

            <button className={styles.addPoste}><AddIcon />Ajouter un poste</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspaceCreation;
