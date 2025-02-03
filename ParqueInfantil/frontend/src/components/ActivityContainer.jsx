import React, { useState } from "react";
import Modal from "react-modal";
import { FaInfoCircle } from "react-icons/fa";
import styled from "styled-components";
import ReserveModal from "./ActivityContainer/ReserveModal";
import CommentModal from "./ActivityContainer/CommentModal";
import ActivityModal from "./ActivityContainer/ActivityModal";

import { Form, Spin } from 'antd';




const ActivityImage = ({ image, name, openModal }) => (
  <Image src={image} alt={name} onClick={openModal} />
);

const ActivityInfo = ({ activity, openModal }) => (
  <Info>
    <h3>{activity.nombre}</h3>
    <p>{activity.fecha_hora}</p>
    <Button onClick={openModal} title="Más información">
      <FaInfoCircle />
    </Button>
  </Info>
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
  background: rgb(196, 120, 49);
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


Modal.setAppElement("#root");

/**
 * Componente ActivityContainer
 *
 * Este componente representa un contenedor para una actividad, mostrando su imagen, información y modales relacionados.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.key - La clave única para el componente.
 * @param {Object} props.data - Los datos de la actividad.
 * @param {string} props.data.image - La URL de la imagen de la actividad.
 * @param {string} props.data.nombre - El nombre de la actividad.
 * @param {string} props.rol - El rol del usuario.
 * @param {string} props.time - El tiempo asociado a la actividad.
 *
 * @returns {JSX.Element} El componente ActivityContainer.
 */
const ActivityContainer = ({ key, data, rol, time }) => {
  const [form] = Form.useForm();
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
      <ActivityImage
        image={data.image}
        name={data.nombre}
        openModal={openModal}
      />
      <ActivityInfo activity={data} openModal={openModal} />
      <ActivityModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        activity={data}
        openReserveModal={openReserveModal}
        openCommentModal={openCommentModal}
        rol={rol}
        time={time}
      />
     <ReserveModal
        isOpen={reserveModalIsOpen}
        closeModal={closeReserveModal}
        form={form}
        onFinish={closeReserveModal}
      /> 
      <CommentModal
        isOpen={commentModalIsOpen}
        closeModal={closeCommentModal}
      />
    </Card>
  );
};

export default ActivityContainer;
