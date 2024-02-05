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
        console.log("response",response);
        if (response.ok) {
          const data = await response.json();
          console.log("data",data);
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
  console.log(roleAutoriseSplit.includes(authorize));
  console.log("authorize",authorize);
  console.log(roleAutoriseSplit);

  if (roleAutoriseSplit.includes(authorize))  {
    composant = composant;
  }else{
    composant = <Unauthorized />;
  }
  return composant;
};

export default Verificateur;