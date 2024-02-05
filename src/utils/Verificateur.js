import { useEffect, useState } from "react";
import Unauthorized from "../pages/common/Unauthorized";
const accessToken = localStorage.getItem('token');

const Verificateur = ({ roleAutorise, composant }) => {
  const [authorize, setAuthorize] = useState(false);
  console.log("authorize",authorize);
  console.log(roleAutorise);
  console.log(accessToken);
  setAuthorize(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/authentication-module/authorized',{ // Remplacez avec votre logique pour vérifier le token
          method: 'Get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: {
            "RoleAuthorized" : roleAutorise,
            "Token" : accessToken,
          }
        });
        console.log("response",response);
        if (response.ok) {
          const data = await response.json();
          console.log("data",data);
         //setAuthorize(data); // Mettez à jour l'autorisation
        } else {
          throw new Error('Erreur lors de la vérification du token ');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [roleAutorise]);

  if (!authorize) {
    composant = <Unauthorized />;
  }
  return composant;
};

export default Verificateur;
