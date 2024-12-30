import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaInfoCircle, FaRegCalendarAlt, FaRegCommentDots } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const ActivityContainer = ({ activity }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const history = useHistory();

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleReserve = () => {
        history.push('/reserve');
    };

    const handleComment = () => {
        history.push('/comment');
    };

    return (
        <div className="activity-container">
            <ActivityImage image={activity.image} name={activity.name} openModal={openModal} />
            <ActivityInfo activity={activity} openModal={openModal} />
            <ActivityModal 
                isOpen={modalIsOpen} 
                closeModal={closeModal} 
                activity={activity} 
                handleReserve={handleReserve} 
                handleComment={handleComment} 
            />
        </div>
    );
};

const ActivityImage = ({ image, name, openModal }) => (
    <img 
        src={image} 
        alt={name} 
        className="activity-image" 
        onClick={openModal} 
    />
);

const ActivityInfo = ({ activity, openModal }) => (
    <div className="activity-info">
        <h3>{activity.name}</h3>
        <p>{activity.date}</p>
        <button onClick={openModal} className="details-button">
            <FaInfoCircle /> Ver más detalles
        </button>
    </div>
);

const ActivityModal = ({ isOpen, closeModal, activity, handleReserve, handleComment }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Activity Details"
    >
        <h2>{activity.name}</h2>
        <img src={activity.image} alt={activity.name} className="modal-image" />
        <p><strong>Fecha:</strong> {activity.date}</p>
        <p><strong>Descripción:</strong> {activity.description}</p>
        <p><strong>Ubicación:</strong> {activity.location}</p>
        <p><strong>Duración:</strong> {activity.duration}</p>
        <button onClick={handleReserve} className="reserve-button">
            <FaRegCalendarAlt /> Reservar
        </button>
        <button onClick={handleComment} className="comment-button">
            <FaRegCommentDots /> Comentar
        </button>
        <button onClick={closeModal}>Cerrar</button>
    </Modal>
);

export default ActivityContainer;

