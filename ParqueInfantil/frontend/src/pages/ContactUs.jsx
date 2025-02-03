import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import styled from "styled-components";
import HeaderHome from '../components/headers/HeaderHome';


const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 150px;
`;

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 1.2em;

  &:hover {
    color: #007bff;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
  width: 100%;
  max-width: 400px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

/**
 * Componente ContactUs
 * 
 * Este componente representa una página de contacto donde los usuarios pueden enviar sus consultas o mensajes.
 * 
 * @returns {JSX.Element} Un formulario de contacto con campos para nombre, correo electrónico y mensaje.
 * 
 * Estructura del componente:
 * - Container: Contenedor principal del formulario de contacto.
 * - HeaderHome: Componente de encabezado de la página.
 * - Logo: Imagen del logo del parque.
 * - Title: Título de la página de contacto.
 * - Form: Formulario que contiene los campos de entrada.
 * - FormGroup: Agrupación de cada campo del formulario.
 * - Label: Etiqueta para cada campo del formulario.
 * - Input: Campo de entrada para nombre y correo electrónico.
 * - Textarea: Campo de texto para el mensaje.
 * - Button: Botón para enviar el formulario.
 */
const ContactUs = () => {
  return (
    <Container>
      <HeaderHome />
      <Logo src="/path/to/logo.png" alt="Logo del Parque" />
      <Title>Contáctanos</Title>
      <Form>
        <FormGroup>
          <Label htmlFor="name">Nombre:</Label>
          <Input type="text" id="name" name="name" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Correo Electrónico:</Label>
          <Input type="email" id="email" name="email" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message">Mensaje:</Label>
          <Textarea id="message" name="message" rows="4" required></Textarea>
        </FormGroup>
        <Button type="submit">Enviar</Button>
      </Form>
    </Container>
  );
};

export default ContactUs;
