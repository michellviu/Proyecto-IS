import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSort } from 'react-icons/fa';
import HeaderHome from '../components/headers/header-home';
import ActivityContainer from '../components/activity-container';

const ActivityCatalog = () => {
    const [activities, setActivities] = useState([
        // ejemplo
        { id: 1, name: 'Activity 1', date: '2023-10-01' },
        { id: 2, name: 'Activity 2', date: '2023-10-05' },
        { id: 3, name: 'Activity 3', date: '2023-10-03' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = () => {
        const sortedActivities = [...activities].sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(a.date) - new Date(b.date);
            } else {
                return new Date(b.date) - new Date(a.date);
            }
        });
        setActivities(sortedActivities);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredActivities = activities.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <HeaderHome />
            <SearchBar>
                <input
                    type="text"
                    placeholder="Buscar actividades..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <SortButton onClick={handleSort}>
                    Ordenar por fecha <FaSort />
                </SortButton>
            </SearchBar>
            <Activities>
                {filteredActivities.map(activity => (
                    <ActivityContainer key={activity.id} activity={activity} />
                ))}
            </Activities>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    background-color: #f0f8ff;
`;

const SearchBar = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    input {
        padding: 10px;
        width: 70%;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
`;

const SortButton = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        background-color: #0056b3;
    }

    svg {
        margin-left: 5px;
    }
`;

const Activities = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

export default ActivityCatalog;