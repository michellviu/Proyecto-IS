import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateEntity from './pages/admin/CreateEntity';
import ListEntities from './pages/admin/ListEntities';

// Educator Pages
import EducatorDashboard from './pages/educator/EducatorDashboard';
import ActivityCatalogEducator from './pages/educator/ActivityCatalog';
import EducatorProfile from './pages/educator/EducatorProfile';
import StatisticsRequest from './pages/educator/StatisticsRequest';
import ResponsibleActivities from './pages/educator/ResponsibleActivities';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ActivityCatalogParent from './pages/parent/ActivityCatalog';
import ParentProfile from './pages/parent/ParentProfile';
import CommentsHistory from './pages/parent/CommentsHistory';
import ReservedActivities from './pages/parent/ReservedActivities';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        {/* Rutas públicas */}
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/about" component={AboutUs} />
        <Route path="/contact" component={ContactUs} />

        {/* Rutas del rol Administrador */}
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/create-entity" component={CreateEntity} />
        <Route path="/admin/list-entities" component={ListEntities} />

        {/* Rutas del rol Educador */}
        <Route path="/educator/dashboard" component={EducatorDashboard} />
        <Route path="/educator/activity-catalog" component={ActivityCatalogEducator} />
        <Route path="/educator/profile" component={EducatorProfile} />
        <Route path="/educator/statistics-request" component={StatisticsRequest} />
        <Route path="/educator/responsible-activities" component={ResponsibleActivities} />

        {/* Rutas del rol Padre */}
        <Route path="/parent/dashboard" component={ParentDashboard} />
        <Route path="/parent/activity-catalog" component={ActivityCatalogParent} />
        <Route path="/parent/profile" component={ParentProfile} />
        <Route path="/parent/comments-history" component={CommentsHistory} />
        <Route path="/parent/reserved-activities" component={ReservedActivities} />

        {/* Ruta para manejar 404 - Página no encontrada */}
        <Route render={() => <h1>404 - Página no encontrada</h1>} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;

