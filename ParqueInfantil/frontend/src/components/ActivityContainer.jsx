import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaInfoCircle, FaRegCalendarAlt, FaRegCommentDots, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

Modal.setAppElement('#root');

const ActivityContainer = ({ activity }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [reserveModalIsOpen, setReserveModalIsOpen] = useState(false);
    const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openReserveModal = () => {
        setReserveModalIsOpen(true);
    };

    const closeReserveModal = () => {
        setReserveModalIsOpen(false);
    };

    const openCommentModal = () => {
        setCommentModalIsOpen(true);
    };

    const closeCommentModal = () => {
        setCommentModalIsOpen(false);
    };

    return (
        <Card>
            <ActivityImage image={activity.image} name={activity.name} openModal={openModal} /> 
            <ActivityInfo activity={activity} openModal={openModal} />
            <ActivityModal 
                isOpen={modalIsOpen} 
                closeModal={closeModal} 
                activity={activity} 
                openReserveModal={openReserveModal} 
                openCommentModal={openCommentModal} 
            />
            <ReserveModal 
                isOpen={reserveModalIsOpen} 
                closeModal={closeReserveModal} 
            />
            <CommentModal 
                isOpen={commentModalIsOpen} 
                closeModal={closeCommentModal} 
            />
        </Card>
    );
};

const ActivityImage = ({ image, name, openModal }) => (
    <Image 
        src={image} 
        alt={name} 
        onClick={openModal} 
    />
);

const ActivityInfo = ({ activity, openModal }) => (
    <Info>
        <h3>{activity.name}</h3>
        <p>{activity.date}</p>
        <Button onClick={openModal} title="Más información">
            <FaInfoCircle />
        </Button>
    </Info>
);

const ActivityModal = ({ isOpen, closeModal, activity, openReserveModal, openCommentModal }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Activity Details"
    >
        <ModalContent>
            <h2>{activity.name}</h2>
            <img src={activity.image} alt={activity.name} className="modal-image" />
            <p><strong>Fecha:</strong> {activity.date}</p>
            <p><strong>Descripción:</strong> {activity.description}</p>
            <p><strong>Ubicación:</strong> {activity.location}</p>
            <p><strong>Duración:</strong> {activity.duration}</p>
            <Button onClick={openReserveModal} title="Reservar">
                <FaRegCalendarAlt />
            </Button>
            <Button onClick={openCommentModal} title="Comentar">
                <FaRegCommentDots />
            </Button>
            <Button onClick={closeModal} title="Cerrar">
                <FaTimes />
            </Button>
        </ModalContent>
    </Modal>
);

const ReserveModal = ({ isOpen, closeModal }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Reserve"
    >
        <ModalContent>
            <h2>Reservar Actividad</h2>
            <p>Aquí puedes reservar la actividad.</p>
            <Button onClick={closeModal} title="Cerrar">
                <FaTimes />
            </Button>
        </ModalContent>
    </Modal>
);

const CommentModal = ({ isOpen, closeModal }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Comment"
    >
        <ModalContent>
            <h2>Comentar Actividad</h2>
            <p>Aquí puedes dejar un comentario sobre la actividad.</p>
            <Button onClick={closeModal} title="Cerrar">
                <FaTimes />
            </Button>
        </ModalContent>
    </Modal>
);

const Card = styled.div`
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background: #fff;
    margin: 20px;
    transition: transform 0.2s;
    width: 300px; /* Aumenta el tamaño de la tarjeta */
    &:hover {
        transform: scale(1.05);
    }
`;

const Image = styled.img`
    width: 100%;
    height: 250px; /* Aumenta la altura de la imagen */
    object-fit: cover;
    cursor: pointer;
`;

const Info = styled.div`
    padding: 20px;
    text-align: center;
`;

const Button = styled.button`
    background:rgb(196, 120, 49);
    border: none;
    color: white;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    margin: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    position: relative;
    &:hover {
        background: #rgba(196, 132, 49, 0.77);
    }
`;

const ModalContent = styled.div`
    padding: 20px;
    text-align: center;
    img {
        width: 100%;
        height: auto;
        margin-bottom: 20px;
    }
`;

export default ActivityContainer;

