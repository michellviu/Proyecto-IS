import React from 'react';
import styled from 'styled-components';

import SearchHeaderAdmin from './SearchHeaderAdmin';
import { Button, List } from 'antd';
import { FaTimes, FaCheck } from 'react-icons/fa';

const UserAuthorization = ({ handleSearch, handleAdd, pendingUsers,
    handleAcceptUser, handleRejectUser }) => {
    return (
        <div>
            <SearchHeaderAdmin
                handleSearch={handleSearch}
                handleAdd={handleAdd} />
            <List
                itemLayout="horizontal"
                dataSource={pendingUsers}
                renderItem={user => (
                    <List.Item
                        actions={[
                            <Button icon={<FaCheck />} onClick={() => handleAcceptUser(user)} />,
                            <Button icon={<FaTimes />} onClick={() => handleRejectUser(user)} />
                        ]}
                    >
                        <List.Item.Meta
                            title={Object.keys(user).map(key => (
                                <span key={key} style={{ display: 'block' }}>
                                    <strong>{key}:</strong> {user[key]}
                                </span>
                            ))}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};
export default UserAuthorization;