import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate depuis react-router-dom
import Form from '../../components/common/FormInfo';
import logo from '../../img/logo.svg';
import '../../styles/insconnex.css';


const Login = () => {

  const navigate = useNavigate(); // Initialisez la fonction navigate

  const loginFields = [
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Mot de passe', type: 'password', name: 'password' },
  ];

  const handleLoginSubmit = async (formData) => {
    const apiURL ="http://localhost:3000/authentication-module/signin";
    const idusers = formData.email;
    const password = formData.password;

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ "Email": idusers, "Password": password })
      });


      if (response.ok) {
        const userData = await response.json();
       
        localStorage.setItem('token', userData.data.token);
        
        localStorage.setItem('role', userData.data.role);
        localStorage.setItem('id', userData.data.id);
        
        localStorage.setItem('pseudo', userData.data.pseudo);
        
        if (userData.data.role === "Admin"){
          navigate('/festivals');
        }
        else {navigate('/accueil');}

      } else {
        console.error('Échec de la connexion');
        alert('Échec de la connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      alert(error.message);
    }
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
          <h2 id="insc">Se connecter</h2>
          <Form
            fields={loginFields}
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
