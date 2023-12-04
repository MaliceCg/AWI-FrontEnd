import React from 'react';
import Form from '../../components/common/FormInfo';
import logo from '../../img/logo.svg';
import '../../styles/insconnex.css';
const Register = () => {
  const registerFields = [
    { label: 'Pseudo', type: 'text', name: 'pseudo' },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Mot de passe', type: 'password', name: 'password' },
    { label: 'Confirmation Mot de passe', type: 'password', name: 'confirmPassword' },
  ];

  const handleRegisterSubmit = (formData) => {
    // Traitement spécifique à la page d'inscription avec les données du formulaire
    console.log('Données du formulaire d\'inscription :', formData);
    // Ajoutez votre logique d'inscription ici
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
        <Form  fields={registerFields}
        buttonText="S'inscrire"
        onSubmit={handleRegisterSubmit}
        clickableText="Se connecter"
        clickableHref="/login"
        />
        </div>
        </div>
    </body>
  );
};

export default Register;