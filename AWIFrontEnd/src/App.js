import React from 'react';
import ListeBenevole from './pages/accueil/ListeBenevole';
import EspaceCreation from './pages/admin/AdminCreation';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminPlanning from './pages/admin/AdminPlanning';
import AdminListeBenevole from './pages/admin/ListeBenevoleModif';
import BenevoleActivites from './pages/bénévole/BenevoleActivites';
import BenevoleDashboard from './pages/bénévole/BenevoleDashboard';
import BenevoleInscription from './pages/bénévole/BenevoleInscription';
import BenevoleNotification from './pages/bénévole/BenevoleNotifications';
import BenevolePlanning from './pages/bénévole/BenevolePlanning';
import Compte from './pages/common/Compte';
import Login from './pages/common/Login';
import PageAccueil from './pages/common/PageAccueil';
import PremierePage from './pages/common/PremierePage';
import Register from './pages/common/Register';
import ListeBenevoleZone from './pages/référent/ListeBenevoleZone';


import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login"  element={<Login />}/>
        <Route path="/register"  element={<Register />} />
        <Route path="/"  element={<PremierePage />} />
        <Route path="/accueil" element={<PageAccueil />} />
        <Route path="/compte" component={Compte} />
        <Route path="/benevole-dashboard" component={BenevoleDashboard} roles={['benevole']} />
        <Route path="/benevole-activites" component={BenevoleActivites} roles={['benevole']} />
        <Route path="/benevole-inscription" component={BenevoleInscription} roles={['benevole']} />
        <Route path="/benevole-notification" component={BenevoleNotification} roles={['benevole']} />
        <Route path="/benevole-planning" component={BenevolePlanning} roles={['benevole']} />
        <Route path="/liste-benevole" component={ListeBenevole} roles={['accueil']} />
        <Route path="/liste-benevole-zone" component={ListeBenevoleZone} roles={['referent']} />
        <Route path="/admin-dashboard" component={AdminDashboard} roles={['admin']} />
        <Route path="/espace-creation" component={EspaceCreation} roles={['admin']} />
        <Route path="/admin-notifications" component={AdminNotifications} roles={['admin']} />
        <Route path="/admin-planning" component={AdminPlanning} roles={['admin']} />
        <Route path="/admin-liste-benevole" component={AdminListeBenevole} roles={['admin']} />
      </Routes>

    </Router>
  );
}

export default App;