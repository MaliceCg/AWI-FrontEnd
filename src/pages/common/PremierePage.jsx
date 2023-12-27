import React from 'react';
import logo from '../../img/logo.svg';
import '../../styles/premierePage.css';

const Bouton = ({titre, url}) => (
 <a href={url} className="bouton">
    {titre}
 </a>
);

const PremierePage = () => (
    <div className="premierePage">
        <img id="logo" src={logo} alt="logo" />
        <h3 id="bienv">Bienvenue au <span className="txt-special">Festival du Jeu</span> de <span className="txt-color">Montpellier</span></h3>
        <p id="pcreacompte"> Pour pouvoir participer à l'organisation et t'inscrire à des postes, crée toi un compte </p>
        <Bouton titre="S'inscrire" url="/register" />
        <Bouton titre="Se connecter" url="/login" />
    </div>
);

export default PremierePage;