import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
`;

const AlertPage = () => {
    return (
        <Container>
            <h1 style={{ color: 'black', fontSize: '2em' }}>Lo sentimos, no tiene acceso a esta página</h1>
            <img src="../assets/alerta.jpg"  />
        </Container>
    )
}

export default AlertPage;