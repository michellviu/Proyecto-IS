import React from 'react';
import styled from 'styled-components';


/**
 * Componente funcional que representa la vista de solicitud de estadísticas.
 * 
 * Este componente muestra un contenedor con un encabezado y un contenedor de estadísticas
 * que incluye imágenes generadas de las estadísticas de gestión del parque.
 * 
 * @returns {JSX.Element} La vista de solicitud de estadísticas.
 */
const StatisticsRequestView = () => {
    return (
        <Container>
            <Header>
                <Title>Estadísticas de Gestión del Parque</Title>
                
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