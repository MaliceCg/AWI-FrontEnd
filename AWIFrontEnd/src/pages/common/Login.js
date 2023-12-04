import React from 'react';
import Form from '../../components/common/FormInfo';
import logo from '../../img/logo.svg';
import '../../styles/insconnex.css';
const Login = () => {
  const loginFields = [
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Mot de passe', type: 'password', name: 'password' },
  ];

  const handleLoginSubmit = (formData) => {
    // Traitement spécifique à la page de connexion avec les données du formulaire
    console.log('Données du formulaire de connexion :', formData);
    // Ajoutez votre logique de connexion ici
  };

  return (
    <body>
        <div className="corps">
        <div className="img">
        <img src={logo} alt="logo" />
        </div>
        <div className='desktop'>
        <h3>Rebonjour,</h3>
        <h3> n'hésite pas à regarder les nouvelles</h3>
        <h2>mises à jour !</h2>
        <h2 id ="insc">Se connecter</h2>
        <Form  fields={loginFields}
        buttonText="Se connecter"
        onSubmit={handleLoginSubmit}
        clickableText="S'inscrire"
        clickableHref="/register"
      />
      </div>
       </div>
    </body>
  );
};

export default Login;