import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaCalendarAlt, FaCheck } from 'react-icons/fa';

const MenuContainer = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 5px;
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e2e6ea;
    }
`;

const IconWrapper = styled.div`
    margin-right: 8px;
`;

/**
 * Componente MenuCatalogo
 * 
 * Este componente representa un menú con tres opciones: "En curso", "Programadas" y "Realizadas".
 * Cada opción tiene un ícono asociado y dispara una función cuando se hace clic en ella.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onEnCursoClick - Función que se ejecuta al hacer clic en "En curso".
 * @param {function} props.onProgramadasClick - Función que se ejecuta al hacer clic en "Programadas".
 * @param {function} props.onRealizadasClick - Función que se ejecuta al hacer clic en "Realizadas".
 * @param {string} props.actual - La opción actualmente seleccionada.
 * 
 * @returns {JSX.Element} El componente MenuCatalogo.
 */
const MenuCatalogo = ({ onEnCursoClick, onProgramadasClick, onRealizadasClick, actual }) => {
    return (
        <MenuContainer>
            <MenuItem onClick={onEnCursoClick}>
                <IconWrapper>
                    <FaPlay />
                </IconWrapper>
                En curso
            </MenuItem>
            <MenuItem onClick={onProgramadasClick}>
                <IconWrapper>
                    <FaCalendarAlt />
                </IconWrapper>
                Programadas
            </MenuItem>
            <MenuItem onClick={onRealizadasClick}>
                <IconWrapper>
                    <FaCheck />
                </IconWrapper>
                Realizadas
            </MenuItem>
        </MenuContainer>
    );
};

export default MenuCatalogo;