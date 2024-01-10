import React, { useEffect, useState } from 'react';
import Form from '../../components/common/FormInfo';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';

function PageAccueil() {
  const [user, setUser] = useState();
  const [showPopup, setShowPopup] = useState(true);
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    const hasShownPopup = localStorage.getItem('hasShownPopup');
    if (!hasShownPopup) {
      setShowPopup(true);
      localStorage.setItem('hasShownPopup', 'true');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/festival-module');
        if (response.ok) {
          const data = await response.json();
          setFestivals(data);
        } else {
          console.error('Erreur lors de la récupération des festivals', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des festivals', error);
      }
    };

    fetchData();
  }, []);

  const handleFillLater = () => {
    console.log('Remplir plus tard');
    setShowPopup(false);
  };

  const handleConfirm = (formData) => {
    console.log('Données du formulaire soumises :', formData);
    setShowPopup(false);
    // Ajoutez ici toute autre logique nécessaire après la confirmation
  };

  return (
    <div>
      <Header currentPage="accueil" user={user} />

      {showPopup && (
        <Form
          fields={[
            { type: 'text', name: 'name', label: 'Nom' },
            { type: 'text', name: 'shirtSize', label: 'Taille de t-shirt' },
            { type: 'text', name: 'dietaryRestrictions', label: 'Régime alimentaire' },
            { type: 'text', name: 'address', label: 'Adresse' },
          ]}
          buttonText="Confirmer"
          onSubmit={handleConfirm}
          clickableText="Remplir plus tard"
          clickableHref="/accueil"
          onClose={handleFillLater}
        />
      )}

      {user && (
        <div>
          {festivals.length === 0 ? (
            <div>
              <h1>Bienvenue sur la page d'accueil</h1>
            </div>
          ) : (
            <div>
              <h1>Festivals en cours</h1>
              {festivals.map((festival) => (
                <div key={festival.id}>
                  <button onClick={() => { window.location.href = `/benevole-dashboard/${festival.id}` }}>
                    Voir le festival {festival.name}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PageAccueil;
