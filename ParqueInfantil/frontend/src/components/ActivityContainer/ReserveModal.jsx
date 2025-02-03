import React, { useState } from "react";
import Modal from "react-modal";
import {
  FaTimes,
} from "react-icons/fa";
import styled from "styled-components";

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

const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
  img {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;
/**
 * Componente ReserveModal
 * 
 * Este componente representa un modal para reservar una actividad.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto.
 * @param {Function} props.closeModal - Función para cerrar el modal.
 * @param {Object} props.form - Objeto de formulario para manejar los campos y la validación.
 * @param {Function} props.onFinish - Función que se ejecuta al enviar el formulario con éxito.
 * 
 * @returns {JSX.Element} El componente ReserveModal.
 */
const ReserveModal = ({ isOpen, closeModal
 , form, onFinish
 }) => {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   form.validateFields().then((values) => {
  //     onFinish(values);
  //     handleClose();
  //   });
  // };

  // const handleClose = () => {
  //   form.resetFields();
  //   closeModal();
  // };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Reserve">
      <ModalContent>
        <h2>Reservar Actividad</h2>
        <form onSubmit={closeModal}>
          {/* <div>
            <label>
              Número de niños:
              {form.getFieldDecorator("numChildren", {
                rules: [{ required: true, message: "Por favor ingrese el número de niños", type: "number", min: 0 }],
              })(<input type="number" min="0" />)}
            </label>
          </div>
          <div>
            <label>
              Comentarios:
              {form.getFieldDecorator("comments")(<textarea />)}
            </label>
          </div> */}
          <div>
            <Button type="submit">Reservar</Button>
            <Button type="button" onClick={closeModal} title="Cerrar">
              <FaTimes />
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ReserveModal;

