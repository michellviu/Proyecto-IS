import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchResponsibleActivities } from './HandlersAPI';
import HeaderEducator from '../../components/headers/header-educator';
import { FaBook } from 'react-icons/fa';

const ResponsibleActivities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchResponsibleActivities(setActivities);
    });

    return (
        <Container>
            <HeaderEducator />
            <Catalog>
                {activities.map((activity) => (
                    <ActivityCard key={activity.Id}>
                        <FaBook size={50} />
                        <ActivityInfo>
                            <h3>{activity.Nombre}</h3>
                            <p>{activity.Descripcion}</p>
                        </ActivityInfo>
                    </ActivityCard>
                ))}
            </Catalog>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Catalog = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
`;

const ActivityCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    width: 200px;
    text-align: center;
`;

const ActivityInfo = styled.div`
    margin-top: 10px;

    h3 {
        margin: 0;
        font-size: 1.2em;
    }

    p {
        margin: 5px 0 0;
        font-size: 0.9em;
        color: #666;
    }
`;

export default ResponsibleActivities;