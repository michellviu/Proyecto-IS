
import styled, { css } from 'styled-components';

import { FaBook } from 'react-icons/fa';

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


const MyActivitiesView = ({ activities }) => {

    return (
        <Catalog>
            {activities.map((activity) => (
                <ActivityCard key={activity.id}>
                    <FaBook size={50} />
                    <ActivityInfo>
                        <h3>{activity.nombre}</h3>
                        <p>{activity.descripcion}</p>
                    </ActivityInfo>
                </ActivityCard>
            ))}
        </Catalog>
    );
};

export default MyActivitiesView;