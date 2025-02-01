import React from "react";
import styled from "styled-components";
import alerta from '../assets/alerta.jpg';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
`;

const AlertPage = () => {
    const Img = styled.img`
        width: 30%;
        max-width: 300px;
        height: auto;
        margin: 20px 0;
    `;

    return (
        <Container>
            <Img src={alerta} />
            <h1 style={{ color: 'black', fontSize: '2em' }}>Error 404: Lo sentimos, no tiene acceso a esta página</h1>
        </Container>
    )
}

export default AlertPage;