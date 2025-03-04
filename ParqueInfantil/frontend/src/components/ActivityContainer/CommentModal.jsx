import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { message, Form } from "antd";

// Definición de un botón estilizado usando styled-components
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

// Definición del contenido del modal estilizado usando styled-components
const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
  img {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

// Componente funcional que representa el modal de comentarios
/**
 * CommentModal es un componente que muestra un modal para dejar comentarios sobre una actividad.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto o cerrado.
 * @param {Function} props.closeModal - Función para cerrar el modal.
 *
 * @returns {JSX.Element} El componente Modal con su contenido.
 */
const CommentModal = ({ isOpen, closeModal, form, onFinish }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields().then((values) => {
      onFinish(values);
      message.success(values.puntuacion);
      handleClose();
    });
  };

  const handleClose = () => {
    form.resetFields();
    closeModal();
  };


  return (
    // Uso del componente Modal de react-modal
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Comment">
      <ModalContent>
        <p>Aquí puedes dejar un comentario sobre la actividad.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Puntuación:
              <input
                type="number"
                min="1"
                max="5"
                value={form.puntuacion}
                onChange={(e) => form.setFieldValue('puntuacion', e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Comentario:
              <textarea
                value={form.comentario}
                onChange={(e) => form.setFieldValue('comentario', e.target.value)}
              />
            </label>
          </div>
          <div>
            <Button type="submit">Calificar</Button>
            <Button type="button" onClick={handleClose} title="Cerrar">
              <FaTimes />
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default CommentModal;