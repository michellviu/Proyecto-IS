import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaTimesCircle } from 'react-icons/fa';
import '../styles/reservation-container.css'; 


/**
 * Componente ReservationContainer
 * 
 * Este componente se encarga de mostrar una lista de reservas para un padre dado (parentId).
 * Permite ver los detalles de una reserva seleccionada y cancelar una reserva.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.parentId - El ID del padre para el cual se obtendrán las reservas.
 * 
 * @returns {JSX.Element} El componente ReservationContainer.
 * 
 * @example
 * <ReservationContainer parentId="12345" />
 * 
 * @component
 * 
 * @typedef {Object} Reservation
 * @property {string} id - El ID de la reserva.
 * @property {string} activityName - El nombre de la actividad reservada.
 * @property {string} activityPhoto - La URL de la foto de la actividad.
 * @property {string} status - El estado de la reserva.
 * @property {string} date - La fecha de la reserva.
 * @property {string} time - La hora de la reserva.
 * @property {string} description - La descripción de la actividad reservada.
 */
const ReservationContainer = ({ parentId }) => {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        // Fetch reservations for the given parentId
        fetch(`/api/reservations?parentId=${parentId}`)
            .then(response => response.json())
            .then(data => setReservations(data))
            .catch(error => console.error('Error fetching reservations:', error));
    }, [parentId]);

    const handleCancelReservation = (reservationId) => {
        // Handle reservation cancellation logic here
        console.log(`Cancel reservation with ID: ${reservationId}`);
    };

    const handleViewDetails = (reservation) => {
        setSelectedReservation(reservation);
    };

    return (
        <div className="reservation-container">
            {reservations.map(reservation => (
                <div key={reservation.id} className="reservation-item">
                    <img src={reservation.activityPhoto} alt="Activity" className="activity-thumbnail" />
                    <div className="reservation-info">
                        <h3>{reservation.activityName}</h3>
                        <p className={`reservation-status ${reservation.status.toLowerCase()}`}>
                            {reservation.status}
                        </p>
                    </div>
                    <div className="reservation-actions">
                        <FaInfoCircle onClick={() => handleViewDetails(reservation)} className="action-icon" />
                        <FaTimesCircle onClick={() => handleCancelReservation(reservation.id)} className="action-icon" />
                    </div>
                </div>
            ))}
            {selectedReservation && (
                <div className="reservation-details">
                    <h2>Detalles de la Reserva</h2>
                    <p>Nombre de la Actividad: {selectedReservation.activityName}</p>
                    <p>Fecha: {selectedReservation.date}</p>
                    <p>Hora: {selectedReservation.time}</p>
                    <p>Estado: {selectedReservation.status}</p>
                    <p>Descripción: {selectedReservation.description}</p>
                    <button onClick={() => setSelectedReservation(null)}>Cerrar</button>
                </div>
            )}
        </div>
    );
};

export default ReservationContainer;