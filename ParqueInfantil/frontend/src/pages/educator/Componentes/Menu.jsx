import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import PlayHubLogo from '../../../assets/PlayHub.png';
import { FiLogOut } from 'react-icons/fi';

const Sidebar = styled.div`
    width: 20%;
    background-color:rgb(131, 215, 221); /* pastel green */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
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

const Menu = ({ handleActivitiesClick, handleStatsClick, selectedMenu, handlePerfilClick, handleLogOutClick }) => {
   
    const navigate = useNavigate();
    const handleLogOut = () => {
        handleLogOutClick();
        navigate("/");

    };
    return (
        <Sidebar>
            <div style={{ marginTop: '50px' }} />
            <MenuItem
                selected={selectedMenu === 'Actividades'}
                onClick={handleActivitiesClick}
            >
                Mis Actividades
            </MenuItem>

            <MenuItem
                selected={selectedMenu === 'Estadísticas'}
                onClick={handleStatsClick}
            >
                Estadísticas
            </MenuItem>

            <MenuItem
                selected={selectedMenu === 'Perfil'}
                onClick={handlePerfilClick}
            >
                Perfil
            </MenuItem>

            <MenuItem
                selected={selectedMenu === 'LogOut'}
                onClick={ handleLogOut }
            >
                LogOut  <FiLogOut />
            </MenuItem>

            <img src={PlayHubLogo} alt="PlayHub Logo" style={{ width: '100%', marginTop: 'auto' }} />
        </Sidebar>


    );
};
export default Menu;