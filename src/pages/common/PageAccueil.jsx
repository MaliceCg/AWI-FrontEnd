import React, { useEffect, useState } from 'react';
import Form from '../../components/common/FormInfo';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';

function PageAccueil() {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    const hasShownPopup = localStorage.getItem('hasShownPopup');
    if (!hasShownPopup && user) {
      setShowPopup(true);
      localStorage.setItem('hasShownPopup', 'true');
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/festival-module',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length':'2',
            'X-Powered-By': 'Express',
            'Date': Date.now(),
            'Connection': 'keep-alive',
            'Keep-Alive': 'timeout=5',
            'ETag':'W/"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w"'
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
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

  const handleLogin = (userData) => {
   
    setUser(userData);
  };

  const handleFillLater = () => {
    setShowPopup(false); // Fermer la pop-up lorsque l'utilisateur clique sur "Remplir plus tard"
  };

  const handleFormSubmit = (formData) => {
    // Logique pour traiter les informations du formulaire
    console.log('Données du formulaire soumises :', formData);
    setShowPopup(false); // Fermer la pop-up après soumission du formulaire
  };

  return (
    
    <div>
    <Header currentPage="accueil" user={user} />
     <Navbar/>
      {showPopup && (
        <Form
          fields={[
            { type: 'text', name: 'name', label: 'Nom' },
            { type: 'text', name: 'shirtSize', label: 'Taille de t-shirt' },
            { type: 'text', name: 'dietaryRestrictions', label: 'Régime alimentaire' },
            { type: 'text', name: 'address', label: 'Adresse' },
          ]}
          buttonText="Soumettre"
          onSubmit={handleFormSubmit}
          clickableText="Remplir plus tard"
          clickableHref="/accueil"
          onClose={handleFillLater} // Passer la fonction de fermeture à FormInfo
        />
      )}

      {user && (
        <div>

          <header>

          </header>
          

          <nav>

          </nav>

          {festivals.length === 0 ? (
            // Page sans festival
            <div>
              <h1>Bienvenue sur la page d'accueil</h1>

            </div>
          ) : (

            <div>
              <h1>Festivals en cours</h1>
              {festivals.map((festival) => (
                <div key={festival.id}>
                  <button onClick={() => { window.location.href = `/festivals/${festival.id}` }}>
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
