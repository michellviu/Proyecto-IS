# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes, FaStar, FaCommentDots } from "react-icons/fa";
import styled from "styled-components";
import { Form } from "antd";

// Definición de un botón estilizado usando styled-components
const Button = styled.button`
  background: rgb(196, 120, 49);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  margin: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  position: relative;
  transition: background 0.3s ease;
  &:hover {
    background: rgba(196, 132, 49, 0.77);
  }
`;

// Definición del contenido del modal estilizado usando styled-components
const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
  img {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

// Estilo para el contenedor del formulario
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

// Estilo para los campos del formulario
const FormField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    font-weight: bold;
    margin-bottom: 5px;
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

// Componente funcional que representa el modal de comentarios
const CommentModal = ({ isOpen, closeModal, form, onFinish }) => {
  const [puntuacion, setPuntuacion] = useState("");
  const [comentario, setComentario] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      puntuacion: puntuacion,
      comentario: comentario,
    };
    onFinish(values);
    handleClose();
  };

  const handleClose = () => {
    form.resetFields();
    setPuntuacion("");
    setComentario("");
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Comment">
      <ModalContent>
        <h2>Deja tu comentario</h2>
        <p>Aquí puedes dejar un comentario sobre la actividad.</p>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <FormField>
              <label>
                <FaStar /> Puntuación:
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={puntuacion}
                onChange={(e) => setPuntuacion(e.target.value)}
                required
              />
            </FormField>
            <FormField>
              <label>
                <FaCommentDots /> Comentario:
              </label>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </FormField>
            <div>
              <Button type="submit">Calificar</Button>
              <Button type="button" onClick={handleClose} title="Cerrar">
                <FaTimes />
              </Button>
            </div>
          </FormContainer>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;