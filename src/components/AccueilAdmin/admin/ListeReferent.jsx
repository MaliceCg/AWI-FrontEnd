import React, { useEffect, useState } from "react";
import styles from "../../../styles/espaceCreation.module.css";

const ListeReferent = ({ idPoste }) => {
    const accessToken = localStorage.getItem("token");

    const [referents, setReferents] = useState([]);
    const [selectedReferent, setSelectedReferent] = useState("");

    useEffect(() => {
        const fetchReferents = async () => {
            try {
                // Récupérer tous les bénévoles avec le rôle "Referent"
                const responseAll = await fetch("http://localhost:3000/authentication-module");

                if (!responseAll.ok) {
                    throw new Error("Erreur lors de la récupération des bénévoles");
                }

                const allVolunteers = await responseAll.json();

                // Récupérer les référents déjà assignés à ce poste
                const responseAssigned = await fetch(`http://localhost:3000/referent-module/position/${idPoste}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!responseAssigned.ok) {
                    throw new Error("Erreur lors de la récupération des référents assignés");
                }

                const assignedReferents = await responseAssigned.json();

                // Mettre à jour l'état avec les référents
                setReferents(allVolunteers.filter((volunteer) => volunteer.Role === "Referent"));
                
                // Mettre à jour le référent sélectionné si déjà assigné
                if (assignedReferents.length > 0) {
                    setSelectedReferent(assignedReferents[0].idBenevole);
                }
            } catch (error) {
                alert(error.message);
            }
        };

        fetchReferents();
    }, [idPoste, accessToken]);

    const handleReferentChange = (e) => {
        setSelectedReferent(e.target.value);
    };

    const assignReferent = async () => {
        try {
            // Envoi de la requête pour assigner le référent au poste
            const response = await fetch("http://localhost:3000/referent-module", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    idBenevole:  parseInt(selectedReferent, 10),
                    idPoste: idPoste,
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'assignation du référent");
            }

            alert("Référent assigné avec succès !");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <label className={styles.label}>Référents actuels : </label>
            <ul>
                {referents.map((referent) => (
                    <li key={referent.idBenevole} className={styles.listeReferent}>{referent.Pseudo}</li>
                ))}
            </ul>
            <select
                className={styles.editInput}
                name="referent"
                onChange={handleReferentChange}
                value={selectedReferent}
            >
                <option value="">Sélectionner un référent</option>
                {referents.map((referent) => (
                    <option key={referent.idBenevole} value={referent.idBenevole}>
                        {referent.Pseudo}
                    </option>
                ))}
            </select>
            <button className={styles.btn2} onClick={assignReferent}>
                Assigner Référent
            </button>
        </div>
    );
};

export default ListeReferent;
