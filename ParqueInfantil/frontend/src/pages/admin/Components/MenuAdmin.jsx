import React from 'react';
import styled from 'styled-components';
import { Menu } from 'antd';


const { SubMenu } = Menu;

const Sidebar = styled(Menu)`
  width: 256px;
`;


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