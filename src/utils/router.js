import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import EspaceCreation from 'src/pages/admin/AdminCreation'
import AdminDashboard from 'src/pages/admin/AdminDashboard'
import AdminNotifications from 'src/pages/admin/AdminNotifications'
import AdminPlanning from 'src/pages/admin/AdminPlanning'
import AdminListeBenevole from 'src/pages/admin/ListeBenevoleModif'
import Compte from 'src/pages/common/Compte'
import Login from 'src/pages/common/Login'
import PageAccueil from 'src/pages/common/PageAccueil'
import PremierePage from 'src/pages/common/PremierePage'
import Register from 'src/pages/common/Register'
import ListeBenevoleZone from 'src/pages/référent/ListeBenevoleZone'
import PrivateRoute from 'src/utils/PrivateRoute'
import ListeBenevole from './pages/accueil/ListeBenevole'
import BenevoleActivites from './pages/bénévole/BenevoleActivites'
import BenevoleDashboard from './pages/bénévole/BenevoleDashboard'
import BenevoleInscription from './pages/bénévole/BenevoleInscription'
import BenevoleNotification from './pages/bénévole/BenevoleNotifications'
import BenevolePlanning from './pages/bénévole/BenevolePlanning'



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<PremierePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <PrivateRoute path="/accueil" element={<PageAccueil />} />
        <PrivateRoute path="/compte" element={<Compte />} />
        <PrivateRoute path="/benevole-dashboard" element={<BenevoleDashboard />} roles={['benevole']} />
        <PrivateRoute path="/benevole-activites" element={<BenevoleActivites />} roles={['benevole']} />
        <PrivateRoute path="/benevole-inscription" element={<BenevoleInscription />} roles={['benevole']} />
        <PrivateRoute path="/benevole-notification" element={<BenevoleNotification />} roles={['benevole']} />
        <PrivateRoute path="/benevole-planning" element={<BenevolePlanning />} roles={['benevole']} />
        <PrivateRoute path="/liste-benevole" element={<ListeBenevole />} roles={['accueil']} />
        <PrivateRoute path="/liste-benevole-zone" element={<ListeBenevoleZone />} roles={['referent']} />
        <PrivateRoute path="/admin-dashboard" element={<AdminDashboard />} roles={['admin']} />
        <PrivateRoute path="/espace-creation" element={<EspaceCreation />} roles={['admin']} />
        <PrivateRoute path="/admin-notifications" element={<AdminNotifications />} roles={['admin']} />
        <PrivateRoute path="/admin-planning" element={<AdminPlanning />} roles={['admin']} />
        <PrivateRoute path="/admin-liste-benevole" element={<AdminListeBenevole />} roles={['admin']} />

        
        
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)