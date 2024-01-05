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
    const apiURL ="http://localhost:3000/authentication-module/signin";
    var idusers = formData.email;
    var password = formData.password;
    console.log(idusers);
    console.log(password);
    try{
      fetch(apiURL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length':'208',
          'X-Powered-By': 'Express',
          'Date': Date.now(),
          'Connection': 'keep-alive',
          'Keep-Alive': 'timeout=5', 
          'ETag':'W/"d0-ksiszyPX7J6Y3qdwtiOUEUkBGIE"'
        },
        body: JSON.stringify({"Email": idusers, "Password": password})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.href ='/accueil';

      })
    }
    catch(error){
      console.log(error);
    }
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
        onSubmit={handleLoginSubmit }
        clickableText="S'inscrire"
        clickableHref="/register"
      />
      </div>
       </div>
    </body>
  );
};

export default Login;