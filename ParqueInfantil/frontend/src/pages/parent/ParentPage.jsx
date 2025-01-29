import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ActivityCatalog from '../ActivityCatalog'; // Make sure to import your component
import Perfil from './ParentProfile';
import PlayHubLogo from '../../assets/PlayHub.png';
import Reservations from './ReservedActivities'

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
    cursor: pointer;
    transition: all 0.3s ease;
    ${({ selected }) =>
        selected &&
        css`
            background-color: #f5f5dc; /* beige */
            border-radius: 50px 0 0 50px;
            margin-left: 40%;
        `}
    &:hover {
        background-color: #f5f5dc; /* beige */
    }
`;

const ParentPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('Catalogo');

    return (
        <Container>
            <Sidebar>
                <div style={{ marginTop: '50px' }} />
                <MenuItem
                    selected={selectedMenu === 'Catalogo'}
                    onClick={() => setSelectedMenu('Catalogo')}
                >
                    Catálogo
                </MenuItem>
                <MenuItem
                    selected={selectedMenu === 'Mis Reservas'}
                    onClick={() => setSelectedMenu('Mis Reservas')}
                >
                    Reservaciones
                </MenuItem>
                <MenuItem
                    selected={selectedMenu === 'Perfil'}
                    onClick={() => setSelectedMenu('Perfil')}
                >
                    Perfil
                </MenuItem>
                <MenuItem
                    selected={selectedMenu === 'Home'}
                    onClick={() => setSelectedMenu('Home')}
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
                selected={selectedMenu === 'Mis Reservas'} && (
                    <div style={{ width: '100%' }}>
                        <Reservations />
                    </div>
                )
                {selectedMenu === 'Perfil' && (
                    <div style={{ width: '100%' }}>
                        <Perfil />
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