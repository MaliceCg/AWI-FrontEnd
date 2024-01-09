import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import styles from "../../../styles/espaceCreation.module.css";

const PosteFestival = (props) => {
    const { poste } = props;
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
        <div className={`${styles.posteBox}`} style={dynamicStyle}>
           <h3 className={styles.posteTitle}>{poste.nomPoste}</h3>
           <div>
                <button className={styles.posteButton}>
                    <EditIcon />
                </button>

                <button className={styles.posteButton}>
                    <DeleteForeverIcon />
                </button>
            </div>
        </div>
    );
};

export default PosteFestival;
