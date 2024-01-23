import React from "react";
import style from "../../styles/inscription.module.css";

const InscriptionPoste = ({ poste, onClick }) => {
  let backgroundColor = '';

  switch (poste.nomPoste.toLowerCase()) {
    case 'accueil':
      backgroundColor = '#3CCBF4';
      break;
    case 'buvette':
      backgroundColor = '#117F45';
      break;
    case 'animation jeux':
      backgroundColor = '#33C481';
      break;
    case 'cuisine':
      backgroundColor = '#105C9F';
      break;
    default:
      break;
  }

  const dynamicStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <div className={style.posteContainer} onClick={() => onClick(poste.nomPoste)}>
      <div className={style.posteBackground} style={dynamicStyle}>
        <p>{poste.nomPoste}</p>
      </div>
    </div>
  );
};

export default InscriptionPoste;
