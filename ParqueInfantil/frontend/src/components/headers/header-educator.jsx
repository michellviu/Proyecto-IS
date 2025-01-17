import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaListAlt, FaUser, FaTasks, FaChartBar } from 'react-icons/fa';


const HeaderEducator = ({ username }) => {
    return (
        <header className="header-educator">
            <div className="welcome-message">
                <h1>Bienvenido, {username}</h1>
            </div>
            <nav className="nav-links">
                <Link to="/home" className="nav-link">
                    <FaHome /> Home
                </Link>
                <Link to="/catalogo-actividades" className="nav-link">
                    <FaListAlt /> Catálogo de Actividades
                </Link>
                <Link to="/perfil" className="nav-link">
                    <FaUser /> Perfil
                </Link>
                <Link to="/actividades-responsable" className="nav-link">
                    <FaTasks /> Actividades Responsables
                </Link>
                <Link to="/solicitar-estadisticas" className="nav-link">
                    <FaChartBar /> Solicitar Estadísticas
                </Link>
            </nav>
        </header>
    );
};

export default HeaderEducator;