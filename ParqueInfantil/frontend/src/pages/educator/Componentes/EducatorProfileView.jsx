import React from 'react';
import styled from 'styled-components';
import { Card, Avatar, Typography } from 'antd';

const { Title, Text } = Typography;

const ProfileCard = styled(Card)`
    width: 80%;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileAvatar = styled(Avatar)`
    width: 20%;
    height: auto;
    margin: 0 auto;
    display: block;
`;

const ProfileDetails = styled.div`
    text-align: center;
    margin-top: 20px;
`;

/**
 * Componente EducatorProfileView
 * 
 * Este componente muestra el perfil de un educador en una tarjeta de perfil.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.educator - Objeto que contiene la información del educador.
 * @param {string} props.educator.name - Nombre del educador.
 * @param {string} props.educator.email - Correo electrónico del educador.
 * @param {string} props.educator.phone - Número de teléfono del educador.
 * 
 * @returns {JSX.Element} Un componente JSX que representa la vista del perfil del educador.
 */
const EducatorProfileView = ({ educator }) => {
    return (
        <ProfileCard>
            <ProfileAvatar src="https://www.w3schools.com/w3images/avatar2.png" />
            <ProfileDetails>
                <Title level={2}>{educator.name}</Title>
                <Text>{educator.email}</Text>
                <br />
                <Text>{educator.phone}</Text>
                <br />
                {/* <Text>{educator}</Text> */}
            </ProfileDetails>
        </ProfileCard>
    );
};

export default EducatorProfileView;