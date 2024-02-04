import { useEffect, useState } from "react";
import Unauthorized from "../pages/common/Unauthorized";
const accessToken = localStorage.getItem('token');

const Verificateur = ({ roleAutorise, composant }) => {
  const [authorize, setAuthorize] = useState("");
  console.log(roleAutorise);
  console.log(accessToken);
  const roleAutoriseSplit = roleAutorise.split(',');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/authentication-module/authorized',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("data",data)
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
  console.log(authorize);
  if (authorize in roleAutoriseSplit) {
    composant = composant;
  }else{
    composant = <Unauthorized />;
  }
  return composant;
};

export default Verificateur;
