import React from 'react';
import styled from 'styled-components';
import { Button, List, Spin } from 'antd';
import { FaTimes, FaCheck } from 'react-icons/fa';
import SearchHeaderAdmin from './SearchHeaderAdmin';
import PaginationControls from './PaginationControls'


const Container = styled.div`
    padding: 20px;
    background-color: #f0f2f5;
`;

const StyledList = styled(List)`
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ListItem = styled(List.Item)`
    padding: 20px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const ListItemMeta = styled(List.Item.Meta)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ActionButton = styled(Button)`
    margin: 0 5px;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

/**
 * Componente UserAuthorization
 * 
 * Este componente se encarga de mostrar una lista de usuarios pendientes de autorización,
 * permitiendo aceptar o rechazar cada usuario. También incluye controles de paginación y
 * un componente de búsqueda.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.handleSearch - Función para manejar la búsqueda de usuarios.
 * @param {Array} props.pendingUsers - Lista de usuarios pendientes de autorización.
 * @param {Function} props.handleAcceptUser - Función para aceptar un usuario.
 * @param {Function} props.handleRejectUser - Función para rechazar un usuario.
 * @param {boolean} props.loading - Indicador de carga para mostrar un spinner mientras se cargan los datos.
 * @param {Function} props.handlePage - Función para manejar el cambio de página en la paginación.
 * @param {boolean} props.previous - Indicador para habilitar/deshabilitar el botón de página anterior.
 * @param {boolean} props.next - Indicador para habilitar/deshabilitar el botón de página siguiente.
 * 
 * @returns {JSX.Element} - Retorna el componente UserAuthorization.
 */
const UserAuthorization = ({ handleSearch, pendingUsers, handleAcceptUser, handleRejectUser , loading, handlePage, previous, next}) => {
    return (
        <Container>
            <SearchHeaderAdmin handleSearch={handleSearch} />
            {loading ? (
                <Spin size="large" />
            ) : (
                <StyledList
                    itemLayout="horizontal"
                    dataSource={pendingUsers}
                    renderItem={user => (
                        <ListItem
                            actions={[
                                <ActionButton icon={<FaCheck />} onClick={() => handleAcceptUser(user)} />,
                                <ActionButton icon={<FaTimes />} onClick={() => handleRejectUser(user)} />
                            ]}
                        >
                            <ListItemMeta
                                title={
                                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                        {Object.keys(user).map(key => (
                                            <span key={key} style={{ marginRight: '20px' }}>
                                                <strong>{key === 'username' || key === 'rol' ? <span style={{ color: 'blue' }}>{key}:</span> : `${key}:`}</strong> {user[key]}
                                            </span>
                                        ))}
                                    </div>
                                }
                            />
                        </ListItem>
                    )}
                />)}
            <PaginationControls
                handlePage={handlePage}
                next={next}
                previous={previous}
            />
            
        </Container>
    );
};

export default UserAuthorization;