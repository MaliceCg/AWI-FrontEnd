import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from "../../../styles/espaceCreation.module.css";

const PosteFestival = (props) => {
    // Accéder à la propriété poste depuis les props
    const { poste } = props;


    return (
        <div className={styles.posteBox}>
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
