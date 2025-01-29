import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchResponsibleActivities } from '../../api/HandlersAPI';
import HeaderEducator from '../../components/HeaderEducator';
import { FaBook } from 'react-icons/fa';

const ResponsibleActivities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const getActivities = async () => {
            const response = await fetchResponsibleActivities(educatorId);
            setActivities(response);
        };

        getActivities();
    }, [educatorId]);

    return (
        <Container>
            <HeaderEducator />
            <Catalog>
                {activities.map((activity) => (
                    <ActivityCard key={activity.id}>
                        <FaBook size={50} />
                        <ActivityInfo>
                            <h3>{activity.title}</h3>
                            <p>{activity.description}</p>
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