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
                <Text>{educator.bio}</Text>
            </ProfileDetails>
        </ProfileCard>
    );
};

export default EducatorProfileView;