import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import AlertPage from './pages/AlertPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ParentPage from './pages/parent/ParentPage';
import AdminPage from './pages/admin/AdminPage';
import ActivityCatalog from './pages/catalog/ActivityCatalog';
// import ParentProfile from './pages/parent/ParentProfile';
import EducatorPage from './pages/educator/EducatorPage';
// import EducatorProfile from './pages/educator/EducatorProfile';

/*

import StatisticsRequest from './pages/educator/StatisticsRequest';

import ParentProfile from './pages/parent/ParentProfile';
import ReservedActivities from './pages/parent/ReservedActivities';*/

/**
 * Componente principal de la aplicación que define las rutas utilizando React Router.
 * 
 * @component
 * @returns {JSX.Element} El componente App con las rutas definidas.
 * 
 * Rutas:
 * - "/" : Componente Home
 * - "/register" : Componente Register
 * - "/about" : Componente AboutUs
 * - "/contact" : Componente ContactUs
 * - "/adminPage" : Componente AdminPage
 * - "/padrePage" : Componente ParentPage
 * - "/alertPage" : Componente AlertPage
 * - "/activity-catalog" : Componente ActivityCatalog
 * - "/educadorPage" : Componente EducatorPage
 * 
 * Nota: La ruta "/educator/profile" está comentada y no se encuentra activa.
 */
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/adminPage" element={<AdminPage />} />
                <Route path="/padrePage" element={<ParentPage />} />
                <Route path="/alertPage" element={<AlertPage />} />
                <Route path="/activity-catalog" element={<ActivityCatalog />} />
                {/* <Route path="/educator/profile" element={<EducatorProfile />} /> */}
                <Route path="/educadorPage" element={<EducatorPage />} />
            </Routes>
        </Router>
    );
};

export default App;


/*
                
                
                
              
                <Route path="/educator/statistics-request" element={<StatisticsRequest />} />
               
                <Route path="/parent/profile" element={<ParentProfile />} />
                <Route path="/parent/reserved-activities" element={<ReservedActivities />} />*/


