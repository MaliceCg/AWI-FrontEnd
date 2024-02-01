import React from 'react';
import ListeBenevole from './pages/accueil/ListeBenevole';
import EspaceCreation from './pages/admin/AdminCreation';
import FestivalCreation from './pages/admin/AdminCreationFestival';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFestivals from './pages/admin/AdminFestivals';
import AdminListeBenevole from './pages/admin/AdminListeBenevole';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminPlanning from './pages/admin/AdminPlanning';
import AdminSendNotif from './pages/admin/AdminSendNotif';
import BenevoleActivites from './pages/bénévole/BenevoleActivites';
import BenevoleDashboard from './pages/bénévole/BenevoleDashboard';
import BenevoleInscription from './pages/bénévole/BenevoleInscription';
import BenevoleInscriptionCreneau from './pages/bénévole/BenevoleInscriptionCreneau';
import BenevoleInscriptionZone from './pages/bénévole/BenevoleInscriptionZone';
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
        <Route path="/compte/:idFestival" element={<Compte/>} />
        <Route path="/benevole-dashboard/:idFestival" element={<BenevoleDashboard />} roles={['benevole']} />
        <Route path="/benevole-activites/:idFestival" element={<BenevoleActivites/>} roles={['benevole']} />
        <Route path="/benevole-inscription/:idFestival" element={<BenevoleInscription />} roles={['benevole']} />
        <Route path="/benevole-notification/:idFestival" element={<BenevoleNotification/>} roles={['benevole']} />
        <Route path="/benevole-planning/:idFestival" element={<BenevolePlanning/>} roles={['benevole']} />
        <Route path="/liste-benevole/:idFestival" element={<ListeBenevole/>} roles={['accueil']} />
        <Route path="/benevole-animation-jeux/:idFestival/:idPoste" element={<BenevoleInscriptionZone/>} roles={['benevole']} />
        <Route path="/benevole-inscription-creneaux/:idFestival/:idZone" element={<BenevoleInscriptionCreneau />} roles={['benevole']} />
        <Route path="/liste-benevole-zone" element={<ListeBenevoleZone/>} roles={['referent']} />
        <Route path="/admin-dashboard/:idFestival" element={<AdminDashboard/>} roles={['admin']} />
        <Route path="/espace-creation/:idFestival" element={<EspaceCreation/>} roles={['admin']} />
        <Route path="/admin-creation-festival/:idFestival" element={<FestivalCreation/>} roles={['admin']} />
        <Route path="/admin-notifications/:idFestival" element={<AdminNotifications/>} roles={['admin']} />
        <Route path="/admin-planning/:idFestival" element={<AdminPlanning/>} roles={['admin']} />
        <Route path="/admin-liste-benevole/:idFestival" element={<AdminListeBenevole/>} roles={['admin']} />
        <Route path="/festivals" element={<AdminFestivals/>} roles={['admin']} />
        <Route path="/send-notif/:idFestival" element={<AdminSendNotif/>} roles={['admin']} />
      </Routes>
    </Router>
  );
}

export default App;