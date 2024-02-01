import Email from '@mui/icons-material/Email';
import Calendar from '@mui/icons-material/CalendarMonth';
import styles from '../../../styles/listeBenevole.module.css';
import React, { useEffect, useState } from 'react';

const GoCalendar = (id) => {
  // Todo: Utiliser le backend pour accéder au calendrier
}

const ListeACocher = ({ benevole, index }) => {
  const [checkboxChecked, setCheckboxChecked] = useState(benevole.isPresent);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/authentication-module/${benevole.idBenevole}`);
        if (response.ok) {
          const data = await response.json();
          setNom(data.Nom);
          setPrenom(data.Prenom);
          setEmail(data.Email);
        } else {
          throw new Error('Erreur lors de la récupération des données');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [benevole.idBenevole]);

  const handleCheckboxChange = async () => {
    try {
      // Make API call to update presence on the server
      console.log("changement de présence ")
      const response = await fetch(`http://localhost:3000/inscription-module/inscriptionPresent/${benevole.idBenevole}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Presence:!checkboxChecked }),
      });

      if (response.ok) {
        // Update local state only if the server update was successful
        setCheckboxChecked(!checkboxChecked);
      } else {
        throw new Error('Erreur lors de la mise à jour de la présence sur le serveur');
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      <div className={styles.benevoleBox} key={index}>
        <div>
          <div className={styles.nomBenevole}>
            {nom} {prenom}
          </div>
          {benevole.Pseudo}
        </div>
        <div className={styles.iconsBenevole}>
        <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
            <Email />
          </a>
          <Calendar onClick={() => GoCalendar(benevole.idBenevole)} />
          <input type="checkbox" checked={checkboxChecked} onChange={handleCheckboxChange} style={{ height: '20px', width: '20px' }}/>  
        </div>
      </div>
    </div>
  );
}

export default ListeACocher;
