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

const ReserveModal = ({ isOpen, closeModal }) => (
  <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Reserve">
    <ModalContent>
      <h2>Reservar Actividad</h2>
      <p>Aquí puedes reservar la actividad.</p>
      <Button onClick={closeModal} title="Cerrar">
        <FaTimes />
      </Button>
    </ModalContent>
  </Modal>
);
export default ReserveModal;

