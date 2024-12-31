import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ListEntities from './pages/admin/ListEntities';
import ActivityCatalog from './pages/ActivityCatalog';
/*
import EducatorProfile from './pages/educator/EducatorProfile';
import StatisticsRequest from './pages/educator/StatisticsRequest';
import ResponsibleActivities from './pages/educator/ResponsibleActivities';
import ParentProfile from './pages/parent/ParentProfile';
import ReservedActivities from './pages/parent/ReservedActivities';*/

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/admin/list-entities" element={<ListEntities />} />
                <Route path="/activity-catalog" element={<ActivityCatalog />} />
            </Routes>
        </Router>
    );
};

export default App;


/*
                
                
                
                <Route path="/educator/profile" element={<EducatorProfile />} />
                <Route path="/educator/statistics-request" element={<StatisticsRequest />} />
                <Route path="/educator/responsible-activities" element={<ResponsibleActivities />} />
                <Route path="/parent/profile" element={<ParentProfile />} />
                <Route path="/parent/reserved-activities" element={<ReservedActivities />} />*/


