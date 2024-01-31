import { useEffect, useState } from "react";
import Unauthorized from "../pages/common/Unauthorized";

const Verificateur = ({ roleAutorise, composant }) => {
  const [authorize, setAuthorize] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(''); // Remplacez avec votre logique pour vérifier le token
        if (response.ok) {
          const data = await response.json();
          setAuthorize(data); // Mettez à jour l'autorisation
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
