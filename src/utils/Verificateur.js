import { useEffect, useState } from "react";
import Loader from "../components/AccueilAdmin/admin/Loader";
import Unauthorized from "../pages/common/Unauthorized";
import styles from '../styles/Verificateur.module.css';
const accessToken = localStorage.getItem('token');

const Verificateur = ({ roleAutorise, composant }) => {
  const [authorize, setAuthorize] = useState("");
  const roleAutoriseSplit = roleAutorise.split(',');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://awi-api-2.onrender.com/authentication-module/authorized',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

       
        if (response.ok) {
          const data = await response.json();
          
  
         setAuthorize(data); // Mettez à jour l'autorisation
        } else {
          throw new Error('Erreur lors de la vérification du token ');
        }
      } catch (error) {
        console.log("error" + error);
      }
      finally {
        setLoading(false); // Mettez à jour l'état de chargement une fois que la requête est terminée
      }
    };
    fetchData();
  }, [roleAutorise]);
  if (loading) {
    // Affichez le composant Loader pendant le chargement
    return <div className={styles.loaderContainer}> <Loader /> </div>;
  } else {
    // Affichez la page autorisée ou Unauthorized en fonction de l'autorisation
    return roleAutoriseSplit.includes(authorize) ? composant : <Unauthorized />;
  }
};

export default Verificateur;