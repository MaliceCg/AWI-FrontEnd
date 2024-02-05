import React from "react";
import nofestival from '../../img/noFestival.svg';
import styles from '../../styles/accueil.module.css';

const Unauthorized= ()=>{
    return (
        <div>
        <img src={nofestival} alt="no festival" className={styles.nofestival} />
            <h1>Tu n'es pas authorisé à venir ici </h1>
        </div>
       
    )

}
export default Unauthorized