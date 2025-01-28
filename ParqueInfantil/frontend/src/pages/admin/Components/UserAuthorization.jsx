import React from 'react';
import styled from 'styled-components';
import { Button, List } from 'antd';
import { FaTimes, FaCheck } from 'react-icons/fa';
import SearchHeaderAdmin from './SearchHeaderAdmin';

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

const UserAuthorization = ({ handleSearch, handleAdd, pendingUsers, handleAcceptUser, handleRejectUser }) => {
    return (
        <Container>
            <SearchHeaderAdmin handleSearch={handleSearch} handleAdd={handleAdd} />
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
                                            <strong>{key === 'Nombre' || key === 'Rol' ? <span style={{ color: 'blue' }}>{key}:</span> : `${key}:`}</strong> {user[key]}
                                        </span>
                                    ))}
                                </div>
                            }
                        />
                    </ListItem>
                )}
            />
        </Container>
    );
};

export default UserAuthorization;