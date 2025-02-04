import React from 'react';
import styled from 'styled-components';
import { Menu } from 'antd';


const { SubMenu } = Menu;

const Sidebar = styled(Menu)`
  width: 256px;
`;


/**
 * Componente MenuAdmin que renderiza un menú de administración con varias opciones.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Array<string>} props.entities - Lista de entidades a mostrar en el submenú.
 * @param {Function} props.handleUserAuthorizationClick - Función a ejecutar al hacer clic en "Autorización de Usuarios".
 * @param {Function} props.handleResourceClick - Función a ejecutar al hacer clic en "Recursos en Uso".
 * @param {Function} props.handleMenuClick - Función a ejecutar al hacer clic en una entidad del submenú.
 * @param {Function} props.handleReservationRequestsClick - Función a ejecutar al hacer clic en "Solicitudes de Reserva".
 *
 * @returns {JSX.Element} El componente Sidebar con las opciones del menú.
 */
const MenuAdmin = ({ entities, handleUserAuthorizationClick, handleResourceClick,
    handleMenuClick, handleReservationRequestsClick }) => {
    
    return (
        <Sidebar mode="inline">
            <Menu.Item key="user-authorization" onClick={() => handleUserAuthorizationClick()}>
                Autorización de Usuarios
            </Menu.Item>
            <Menu.Item key="resource" onClick={() => handleResourceClick()}>
                Recursos en Uso
            </Menu.Item>
            <Menu.Item key="reservation-requests" onClick={() => handleReservationRequestsClick()}>
                Solicitudes de Reserva
            </Menu.Item>
            <SubMenu key="entities" title="Entidades">
                {entities.map(entity => (
                    <Menu.Item key={entity} onClick={() => handleMenuClick(entity)}>
                        {entity}
                    </Menu.Item>
                ))}
            </SubMenu>
        </Sidebar>);
};

export default MenuAdmin;