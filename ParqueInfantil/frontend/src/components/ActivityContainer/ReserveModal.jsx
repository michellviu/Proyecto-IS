import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

const Button = styled.button`
  background: #c47831;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background 0.3s ease;
  &:hover {
    background: #a65d2d;
  }
`;

const CloseButton = styled(Button)`
  background: transparent;
  color: #c47831;
  padding: 10px;
  border-radius: 50%;
  &:hover {
    background: rgba(196, 120, 49, 0.1);
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
  position: relative;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  textarea {
    resize: vertical;
  }
`;

const ReserveModal = ({ isOpen, closeModal, form, onFinish }) => {
  const [numChildren, setNumChildren] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      num_ninos: numChildren,
      comentarios: comments,
    };
    onFinish(values);
    handleClose();
  };

  const handleClose = () => {
    setNumChildren("");
    setComments("");
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} contentLabel="Reserve">
      <ModalContent>
        <CloseButton onClick={handleClose} title="Cerrar">
          <FaTimes />
        </CloseButton>
        <h2>Reservar Actividad</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Número de niños:</label>
            <input
              type="number"
              min="0"
              value={numChildren}
              onChange={(e) => setNumChildren(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Comentarios:</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </FormGroup>
          <div>
            <Button type="submit">Reservar</Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ReserveModal;

