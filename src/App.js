import React from 'react';
import ListeBenevole from './pages/accueil/ListeBenevole';
import EspaceCreation from './pages/admin/AdminCreation';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminListeBenevole from './pages/admin/AdminListeBenevole';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminPlanning from './pages/admin/AdminPlanning';
import BenevoleActivites from './pages/bénévole/BenevoleActivites';
import BenevoleDashboard from './pages/bénévole/BenevoleDashboard';
import BenevoleInscription from './pages/bénévole/BenevoleInscription';
import BenevoleInscriptionZone from './pages/bénévole/BenevoleInscriptionZone';
import BenevoleInscriptionCreneau from './pages/bénévole/BenevoleInscriptionCreneau';
import BenevoleNotification from './pages/bénévole/BenevoleNotifications';
import BenevolePlanning from './pages/bénévole/BenevolePlanning';
import Compte from './pages/common/Compte';
import Login from './pages/common/Login';
import PageAccueil from './pages/common/PageAccueil';
import PremierePage from './pages/common/PremierePage';
import Register from './pages/common/Register';
import ListeBenevoleZone from './pages/référent/ListeBenevoleZone';
import FestivalCreation from './pages/admin/AdminCreationFestival';
import AdminFestivals from './pages/admin/AdminFestivals';


import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login"  element={<Login />}/>
        <Route path="/register"  element={<Register />} />
        <Route path="/"  element={<PremierePage />} />
        <Route path="/accueil" element={<PageAccueil />} />
        <Route path="/compte" element={<Compte/>} />
        <Route path="/benevole-dashboard/:idFestival" element={<BenevoleDashboard />} roles={['benevole']} />
        <Route path="/benevole-activites" element={<BenevoleActivites/>} roles={['benevole']} />
        <Route path="/benevole-inscription/:idFestival" element={<BenevoleInscription />} roles={['benevole']} />
        <Route path="/benevole-animation-jeux/:idFestival/:idPoste" element={<BenevoleInscriptionZone/>} roles={['benevole']} />
        <Route path="/benevole-inscription-creneaux/:idFestival/:idZone" element={<BenevoleInscriptionCreneau />} roles={['benevole']} />
        <Route path="/benevole-notification" element={<BenevoleNotification/>} roles={['benevole']} />
        <Route path="/benevole-planning" element={<BenevolePlanning/>} roles={['benevole']} />
        <Route path="/liste-benevole" element={<ListeBenevole/>} roles={['accueil']} />
        <Route path="/liste-benevole-zone" element={<ListeBenevoleZone/>} roles={['referent']} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} roles={['admin']} />
        <Route path="/espace-creation/:idFestival" element={<EspaceCreation/>} roles={['admin']} />
        <Route path="/admin-creation-festival" element={<FestivalCreation/>} roles={['admin']} />
        <Route path="/admin-notifications" element={<AdminNotifications/>} roles={['admin']} />
        <Route path="/admin-planning" element={<AdminPlanning/>} roles={['admin']} />
        <Route path="/admin-liste-benevole" element={<AdminListeBenevole/>} roles={['admin']} />
        <Route path="/festivals" element={<AdminFestivals/>} roles={['admin']} />
      </Routes>

    </Router>
  );
}

export default App;