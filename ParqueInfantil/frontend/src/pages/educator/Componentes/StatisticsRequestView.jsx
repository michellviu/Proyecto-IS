import React from 'react';
import styled from 'styled-components';
import { FaFileExport } from 'react-icons/fa';

const StatisticsRequestView = () => {
    return (
        <Container>
            <Header>
                <Title>Estadísticas de Gestión del Parque</Title>
                <ExportButton>
                    <FaFileExport />
                    Exportar Información
                </ExportButton>
            </Header>
            <StatisticsContainer>
                <StatisticImage src="path/to/your/generated/image1.png" alt="Estadística 1" />
                <StatisticImage src="path/to/your/generated/image2.png" alt="Estadística 2" />
                <StatisticImage src="path/to/your/generated/image3.png" alt="Estadística 3" />
            </StatisticsContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 0;
    border-bottom: 2px solid #ccc;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
`;

const ExportButton = styled.button`
    display: flex;
    align-items: center;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }

    svg {
        margin-right: 8px;
    }
`;

const StatisticsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
`;

const StatisticImage = styled.img`
    width: 300px;
    height: 200px;
    margin: 10px;
    border: 2px solid #ccc;
    border-radius: 10px;
`;

export default StatisticsRequestView;