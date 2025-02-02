import React, { useState, useEffect  } from 'react';
import styled from 'styled-components';
import tarjeta from '../../assets/tarjeta.png';
import poster from '../../assets/actividad.jpg';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    max-width: 600px;
    max-height: 220px;
    margin: auto;
    background-color: white;

`;

const FullImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); // Added shadow for 3D effect
    transition: 0.3s; // Smooth transition for the shadow
`;
const Image = styled.img`
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    width: 42%;
    height: auto;
    max-height: 70%;
    object-fit: contain;
    z-index: 2;
`;

const Info = styled.h1`
    color: black;
    font-size: 2em;
    margin-left: 10%;
`;

const Tarjeta = (nombreAct, fecha, estado, capacidad, foto = poster) => {

    const getColorByEstado = (estado) => {
        switch (estado.toLowerCase()) {
            case 'cancelado':
                return 'red';
            case 'aceptada':
                return 'green';
            case 'en espera':
                return 'blue';
            default:
                return 'black';
        }
    };

    return (
        <Container>
            {/* <Info > {nombreAct} </Info>
            <Info > {fecha} </Info>
            <Info > {capacidad} </Info> */}
            {/* <h1 style={{ color: getColorByEstado(estado), fontSize: '2em' }}> {estado} </h1> */}

            <FullImage src={tarjeta} alt="Full Screen" />
            <Image src={poster} alt="Poster" />
        </Container>
    );
};

export default Tarjeta;