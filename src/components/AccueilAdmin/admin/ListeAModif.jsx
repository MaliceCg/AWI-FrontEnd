import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import React, { useState } from "react";
import styles from '../../../styles/listeBenevole.module.css';
import PlanningBenevole from '../../AccueilAdmin/admin/PlanningBenevole';

const ListBenevoles = ({ idFestival, benevole, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState(benevole.Role);
  const [openPlanningBenevole, setOpenPlanningBenevole] = useState(-1);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleBenevoleClick = () => {
    setOpenPlanningBenevole(benevole.idBenevole);
  };

  const onClose = () => {
    setOpenPlanningBenevole(-1);
  };

  const handleSaveClick = async () => {

    try{
        const response = await fetch(`https://awi-api-2.onrender.com/authentication-module/update-role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ idBenevole: benevole.idBenevole, Role: selectedRole }),
        });
        if (response.ok) {
          // Update local state only if the server update was successful
          setIsEditing(false);
        } else {
          throw new Error('Erreur lors de la mise à jour du rôle sur le serveur');
        }
  } catch (error) {
    console.error(error);
  }
  //reload page
  window.location.reload();
};

  return (
    <div>
      <div className={styles.benevoleBox} key={index} >
        <div>
          <div className={styles.nomBenevole} onClick={handleBenevoleClick}>
            {benevole.Pseudo}
          </div>
          {!isEditing ? (
            benevole.Role
          ) : (
            <select value={selectedRole} onChange={handleRoleChange} className={styles.editInput}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Referent">Referent</option>
              <option value="Accueil">Accueil</option>
            </select>
          )}
        </div>
        <div className={styles.iconsBenevole}>
          <EditIcon onClick={handleEditClick} />
          <EmailIcon />
          {isEditing && <button onClick={handleSaveClick} className={styles.btn}>Save</button>}
        </div>
      </div>

      {/* Conditionally render the Popup component */}
      {openPlanningBenevole !== -1 && (
        <div className={styles.popup}>
          <div className={styles.popupHeader}>
            <button className={styles.closeButton} onClick={onClose}>
              &#10006; {/* Unicode character for 'X' */}
            </button>
          </div>
          <p>Planning du bénévole :  {benevole.Pseudo}</p>
          <h3>{benevole.Nom}</h3>
          <h3>{benevole.Prenom}</h3>
          <h3>{benevole.Email}</h3>
          <h3>{benevole.TailletTShirt}</h3>
          <h3>{benevole.Regime}</h3>
          <h3>{benevole.StatutHebergement}</h3>
          <h3>{benevole.JeuPrefere}</h3>
          <div className={styles.planning}>
          <PlanningBenevole idFestival={idFestival} idBenevole={benevole.idBenevole} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListBenevoles;
