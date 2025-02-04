import React, { useState, useEffect  } from 'react';
import styled from 'styled-components';
import Tarjeta from './Tarjeta';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:  #f5f5dc; ;
    height: 100vh;
    flex-direction: column;
`;


/**
 * Componente Reservations que muestra una lista de reservas.
 * 
 * @component
 * @example
 * return (
 *   <Reservations />
 * )
 * 
 * @returns {JSX.Element} Un contenedor que incluye una lista de componentes Tarjeta, cada uno representando una reserva.
 * 
 * @description
 * Este componente define una lista de reservas con propiedades como id, nombre, fecha, estado y capacidad.
 * Luego, mapea sobre esta lista y renderiza un componente Tarjeta para cada reserva, pasando las propiedades correspondientes.
 */
const Reservations = () => {
    const reservations = [
        { id: 1, name: 'Reservation 1', date: '2023-10-01', estado: 'cancelada', capacidad: '10' },
        { id: 2, name: 'Reservation 2', date: '2023-10-02', estado: 'confirmada', capacidad: '20'},
        { id: 3, name: 'Reservation 3', date: '2023-10-03', estado: 'en espera', capacidad: '50'}
    ];

        return (
        <Container>
            {reservations.map(reservation => (
            <Tarjeta 
            nombreAct={reservation.name} 
            fecha={reservation.date} 
            estado={reservation.estado} 
            capacidad={reservation.capacidad} 
            />
            ))}
        </Container>
        );
    };
export default Reservations