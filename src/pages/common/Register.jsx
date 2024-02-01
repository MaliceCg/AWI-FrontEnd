import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/common/FormInfo';
import logo from '../../img/logo.svg';
import '../../styles/insconnex.css';

const Register = () => {
  const navigate = useNavigate();
  const registerFields = [
    { label: 'Pseudo', type: 'text', name: 'Pseudo' },
    { label: 'Email', type: 'email', name: 'Email' },
    { label: 'Mot de passe', type: 'password', name: 'Password' },
    { label: 'Confirmation Mot de passe', type: 'password', name: 'confirmPassword' },
  ];

  const [passwordMatchError, setPasswordMatchError] = useState(null);

  const handleRegisterSubmit = async (formData) => {
    if (formData.Password !== formData.confirmPassword) {
      setPasswordMatchError("Les mots de passe ne correspondent pas.");
      return;
    }

    console.log('formData :', formData);
    try {
      // Envoi de la requête au serveur
      const response = await fetch('http://localhost:3000/authentication-module/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
console.log('response :', response);
      // Vérification de la réussite de la requête
      if (response.ok) {
        const result = await response.json();
        console.log('Inscription réussie :', result);
        // Ajoutez ici la gestion de l'inscription réussie
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de l\'inscription :', errorData);
        // Ajoutez ici la gestion de l'échec de l'inscription
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      // Ajoutez ici la gestion des erreurs
    }
  };

  return (
    <body>
      <div className="corps">
        <div className="img">
          <img src={logo} alt="logo" />
        </div>
        <div className='desktop'>
          <h3>Bonjour à toi,</h3>
          <h2>nouvel arrivant !</h2>
          <h2 id="insc">S'inscrire</h2>
          
          <Form
            fields={registerFields}
            buttonText="S'inscrire"
            onSubmit={handleRegisterSubmit}
            clickableText="Se connecter"
            clickableHref="/login"
          />
          {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>}
        </div>
      </div>
    </body>
  );
};

export default Register;
