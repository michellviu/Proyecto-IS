import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ActivityCatalog from '../catalog/ActivityCatalog'; // Make sure to import your component
import Perfil from './ParentProfile';
import PlayHubLogo from '../../assets/PlayHub.png';
import Reservations from './Reservations'
import AlertPage from '../AlertPage';

const Container = styled.div`
    display: flex;
    height: 100vh;
`;

const Sidebar = styled.div`
    width: 20%;
    background-color: #b2d8b2; /* pastel green */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
`;

const Content = styled.div`
    width: 80%;
    background-color: #f5f5dc; /* beige */
    display: flex;
`;

const MenuItem = styled.div`
    padding: 10px;
    margin: 5px 0;
    width: 100%;
    text-align: center;
    transition: all 0.3s ease;
    ${({ selected }) =>
        selected &&
        css`
            background-color: #f5f5dc; /* beige */
            border-radius: 50px 0 0 50px;
            margin-left: 40%;
        `}
`;

/**
 * Componente ParentPage
 * 
 * Este componente representa la página principal para los usuarios con el rol de "padre".
 * 
 * @returns {JSX.Element} El componente ParentPage.
 * 
 * Funcionalidad:
 * - Verifica si el usuario está autenticado como "padre" utilizando el valor almacenado en localStorage.
 * - Si el usuario no está autenticado, redirige a la página de alerta (AlertPage).
 * - Permite la navegación entre diferentes menús: Catálogo, Reservas y Home.
 * - Muestra el contenido correspondiente según el menú seleccionado.
 * 
 * Estados:
 * - isAuthenticated: Booleano que indica si el usuario está autenticado como "padre".
 * - selectedMenu: String que indica el menú actualmente seleccionado.
 * - showSubMenu: Booleano que indica si el submenú debe mostrarse (solo aplicable al menú "Catálogo").
 * 
 * Métodos:
 * - handleMenuClick: Maneja el evento de clic en los elementos del menú, actualizando el estado del menú seleccionado y la visibilidad del submenú.
 */
const ParentPage = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('Role') === 'padre');
    if (!isAuthenticated){
      return (
        <AlertPage />
      );
    }

    const [selectedMenu, setSelectedMenu] = useState('Catalogo');

    const [showSubMenu, setShowSubMenu] = useState(false);

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
        if (menu === 'Catalogo') {
            setShowSubMenu(!showSubMenu);
        } else {
            setShowSubMenu(false);
        }
    };


    return (
        <Container>
            <Sidebar>
                <div style={{ marginTop: '50px' }} />
                <MenuItem
                    selected={selectedMenu === 'Catalogo'}
                    onClick={() => handleMenuClick('Catalogo')}
                >
                    Catálogo
                </MenuItem>
                <MenuItem
                    selected={selectedMenu === 'Reservas'}
                    onClick={() => handleMenuClick('Reservas')}
                >
                    Reservaciones
                </MenuItem>
                <MenuItem
                    selected={selectedMenu === 'Home'}
                    onClick={() => handleMenuClick('Home')}
                >
                    Home
                </MenuItem>

                <img src={PlayHubLogo} alt="PlayHub Logo" style={{ width: '100%', marginTop: 'auto' }} />
            </Sidebar>
            <Content>
                {selectedMenu === 'Catalogo' && (
                    <div style={{ width: '100%' }}>
                        <ActivityCatalog />
                    </div>
                )}
                {selectedMenu === 'Reservas' && (
                    <div style={{ width: '100%' }}>
                        <Reservations />
                    </div>
                )}
                {selectedMenu === 'Home' && (
                    <div style={{ width: '100%' }}>
                        {window.location.href = '/'}
                    </div>
                )}
            </Content>
        </Container>
    );
};

export default ParentPage;