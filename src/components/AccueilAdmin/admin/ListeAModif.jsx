import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import React, { useState } from "react";
import styles from '../../../styles/listeBenevole.module.css';

const ListBenevoles = ({ benevole, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState(benevole.Role);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSaveClick = async () => {

    try{
        const response = await fetch(`http://localhost:3000/authentication-module/update-role`, {
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
      <div className={styles.benevoleBox} key={index}>
        <div>
          <div className={styles.nomBenevole}>
            {benevole.Nom} {benevole.Prenom}
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
    </div>
  );
}

export default ListBenevoles;
