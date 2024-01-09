import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import styles from '../../../styles/listeBenevole.module.css';

const ListBenevoles = ({ benevole, index }) => {
    return (
        <div>
            <div className={styles.benevoleBox} key={index}>
              <div>
                <div className={styles.nomBenevole}>
                  {benevole.Nom} {benevole.Prenom}
                </div>
                {benevole.Role}
              </div>
              <div className={styles.iconsBenevole}>
                <EditIcon />
                <EmailIcon />
              </div>
            </div>
        </div>
    );
}

export default ListBenevoles;
