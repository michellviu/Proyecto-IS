import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaList, FaUser, FaCalendarCheck } from 'react-icons/fa';


/**
 * Componente HeaderParent
 * 
 * Este componente representa el encabezado principal para los padres en la aplicación.
 * Muestra un mensaje de bienvenida con el nombre de usuario y una barra de navegación
 * con enlaces a diferentes secciones de la aplicación.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.username - El nombre de usuario que se mostrará en el mensaje de bienvenida.
 * 
 * @returns {JSX.Element} El componente HeaderParent.
 */
const HeaderParent = ({ username }) => {
    return (
        <header className="header-parent">
            <div className="welcome-message">
                <h1>Bienvenido, {username}!</h1>
            </div>
            <nav className="nav-links">
                <Link to="/home" className="nav-link">
                    <FaHome /> Home
                </Link>
                <Link to="/catalogo" className="nav-link">
                    <FaList /> Catálogo de Actividades
                </Link>
                <Link to="/perfil" className="nav-link">
                    <FaUser /> Perfil
                </Link>
                <Link to="/mis-reservas" className="nav-link">
                    <FaCalendarCheck /> Mis Reservas
                </Link>
            </nav>
        </header>
    );
};

export default HeaderParent;