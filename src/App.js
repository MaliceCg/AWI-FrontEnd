import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
import Verificateur from './utils/Verificateur';




// ... (importations)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PremierePage />} />
        <Route path="/accueil" element={<PageAccueil />} />
        <Route path="/compte/:idFestival" element={<Compte />} />
        <Route path="/benevole-dashboard/:idFestival" element={<Verificateur roleAutorise="User,Accueil,Referent,Admin" composant={<BenevoleDashboard />} />} />
        <Route path="/benevole-activites/:idFestival" element={<BenevoleActivites /> } />
        <Route path="/benevole-inscription/:idFestival" element={<Verificateur roleAutorise="User,Accueil,Referent,Admin" composant={<BenevoleInscription />}  />} />

        <Route path="/benevole-animation-jeux/:idFestival/:idPoste" element={<Verificateur roleAutorise="User,Accueil,Referent,Admin" composant={<BenevoleInscriptionZone />} />} />
        <Route path="/benevole-inscription-creneaux/:idFestival/:idZone" element={<Verificateur roleAutorise="User,Accueil,Referent,Admin" composant={<BenevoleInscriptionCreneau />} />} />

        <Route path="/benevole-notification/:idFestival" element={<Verificateur roleAutorise="User,Accueil,Referent,Admin" composant={<BenevoleNotification />} />}/>
        <Route path="/benevole-planning/:idFestival" element={<Verificateur roleAutorise="User,Accueil,Referent,Admin" composant={<BenevolePlanning />}  />} />
        
        <Route path="/liste-benevole/:idFestival" element={<Verificateur roleAutorise="Accueil,Admin" composant={<ListeBenevole />}  />}/>
        <Route path="/benevole-animation-jeux/:idFestival/:idPoste" element={<Verificateur roleAutorise="User,Accueil,Referent,Admin" composant={<BenevoleInscriptionZone />}  />} />
        <Route path="/liste-benevole-zone/:idFestival/:idPoste" element={<Verificateur roleAutorise="Referent,Admin" composant={<ListeBenevoleZone />}  />} />

        <Route path="/admin-dashboard/:idFestival" element={<Verificateur roleAutorise="Admin" composant={<AdminDashboard />}  />} />
        <Route path="/espace-creation/:idFestival" element={<Verificateur roleAutorise="Admin" composant={<EspaceCreation />}  />} />
        <Route path="/admin-creation-festival/:idFestival" element={<Verificateur roleAutorise="Admin" composant={<FestivalCreation />}  />} />
        <Route path="/admin-notifications/:idFestival" element={<Verificateur roleAutorise="Admin" composant={<AdminNotifications />}  />}/>
        <Route path="/admin-planning/:idFestival" element={<Verificateur roleAutorise="Admin" composant={<AdminPlanning />} />}/>
        <Route path="/festivals" element={<Verificateur roleAutorise="Admin" composant={<AdminFestivals />}  />}/>
        <Route path="/send-notif/:idFestival" element={<Verificateur roleAutorise="Admin" composant={<AdminSendNotif />}  />}/>
        <Route path="/admin-liste-benevole/:idFestival" element={<Verificateur roleAutorise="Admin" composant={<AdminListeBenevole />} />}/>
      </Routes>
    </Router>
  );
}

export default App;
