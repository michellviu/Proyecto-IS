import React from 'react';
import './reservation-container.css';

const ReservationContainer = ({ reservation }) => {
    const { activityImage, reservationName, status } = reservation;

    const getStatusColor = (status) => {
        switch (status) {
            case 'denied':
                return 'red';
            case 'confirmed':
                return 'green';
            case 'pending':
                return 'gray';
            default:
                return 'black';
        }
    };

    const handleMoreDetails = () => {
        // Implement the logic to show more details
    };

    const handleCancelReservation = () => {
        // Implement the logic to cancel the reservation
    };

    return (
        <div className="reservation-container">
            <img src={activityImage} alt="Activity" className="activity-thumbnail" />
            <div className="reservation-details">
                <h3>{reservationName}</h3>
                <p style={{ color: getStatusColor(status) }}>{status}</p>
            </div>
            <div className="reservation-actions">
                <button onClick={handleMoreDetails}>Ver más detalles</button>
                <button onClick={handleCancelReservation}>✖</button>
            </div>
        </div>
    );
};

export default ReservationContainer;