import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSort, FaSearch } from 'react-icons/fa';
import HeaderHome from '../components/headers/HeaderHome';
import ActivityContainer from '../components/ActivityContainer';


const Container = styled.div`
    padding: 20px;
    background-color: #f0f8ff;
`;

const SearchBar = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 20px;

    input {
        padding: 10px;
        width: 60%;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        padding: 10px;
        background-color:hsl(135, 18.20%, 55.90%);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background-color:#66a072;
        }

        svg {
            margin-right: 5px;
        }
    }
`;

const SortButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #0056b3;
        transform: scale(1.05);
    }

    svg {
        margin-left: 10px;
    }
`;

const Activities = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 20px;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
        padding: 10px;
        margin: 0 5px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }
`;

const ActivityCatalog = () => {
    const [activities, setActivities] = useState([
        // ejemplo
        { id: 1, name: 'Activity 1', date: '2023-10-01' },
        { id: 2, name: 'Activity 2', date: '2023-10-05' },
        { id: 3, name: 'Activity 3', date: '2023-10-03' },
        { id: 4, name: 'Activity 1', date: '2023-10-01' },
        { id: 5, name: 'Activity 2', date: '2023-10-05' },
        { id: 6, name: 'Activity 3', date: '2023-10-03' },
        { id: 7, name: 'Activity 1', date: '2023-10-01' },
        { id: 8, name: 'Activity 2', date: '2023-10-05' },
        { id: 9, name: 'Activity 3', date: '2023-10-03' },
        { id: 10, name: 'Activity 1', date: '2023-10-01' },
        { id: 11, name: 'Activity 2', date: '2023-10-05' },
        { id: 12, name: 'Activity 3', date: '2023-10-03' },
        { id: 13, name: 'Activity 1', date: '2023-10-01' },
        { id: 14, name: 'Activity 2', date: '2023-10-05' },
        { id: 15, name: 'Activity 3', date: '2023-10-03' },
        { id: 16, name: 'Activity 1', date: '2023-10-01' },
        { id: 17, name: 'Activity 2', date: '2023-10-05' },
        { id: 18, name: 'Activity 3', date: '2023-10-03' },
    ]);






    const fetchActivities = async () => {
        try {
            const response = await fetch('https://api.example.com/activities');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setActivities(data);
        } catch (error) {
            console.error('Failed to fetch activities:', error);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const activitiesPerPage = 4;

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
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

    const indexOfLastActivity = currentPage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
    const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);

    const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

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
                <button>
                    <FaSearch /> Buscar
                </button>
                <SortButton onClick={handleSort}>
                    Ordenar por fecha <FaSort />
                </SortButton>
            </SearchBar>
            <Activities>
                {currentActivities.map(activity => (
                    <ActivityContainer key={activity.id} activity={activity} />
                ))}
            </Activities>
            <Pagination>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Siguiente
                </button>
            </Pagination>
        </Container>
    );
};

export default ActivityCatalog;