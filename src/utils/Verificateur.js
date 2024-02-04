import { useEffect, useState } from "react";
import Unauthorized from "../pages/common/Unauthorized";
const accessToken = localStorage.getItem('token');

const Verificateur = ({ roleAutorise, composant }) => {
  const [authorize, setAuthorize] = useState("");
  const roleAutoriseSplit = roleAutorise.split(',');

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
    };
    fetchData();
  }, [roleAutorise]);
  if (roleAutoriseSplit.includes(authorize))  {
    composant = composant;
  }else{
    composant = <Unauthorized />;
  }
  return composant;
};

export default Verificateur;