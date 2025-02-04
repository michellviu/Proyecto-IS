import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import styled from "styled-components";
import HeaderHome from "../components/headers/HeaderHome";
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Icon1 = styled(FaUser)`
  color: #333;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
`;

const Icon = styled.div`
  margin-right: 0.5rem;
  color: #888;
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;



/**
 * Componente de registro de usuario.
 *
 * Este componente permite a los usuarios registrarse proporcionando un nombre de usuario, correo electrónico, contraseña y rol.
 * Dependiendo del rol seleccionado, el usuario será redirigido a una página específica o se le notificará que debe esperar la aprobación.
 *
 * @component
 * @returns {JSX.Element} El formulario de registro.
 *
 * @example
 * return <Register />
 *
 * @function
 * @name Register
 *
 * @description
 * El componente utiliza el hook `useState` para manejar el estado del formulario y los errores, y el hook `useNavigate` para la navegación.
 * Al enviar el formulario, se realiza una solicitud POST a la API para registrar al usuario. Si la solicitud es exitosa, se guarda el token de autenticación en el localStorage y se redirige al usuario según su rol.
 * Si hay errores en la solicitud, se muestran los mensajes de error correspondientes.
 *
 * @property {Object} formData - Estado que contiene los datos del formulario.
 * @property {string} formData.username - Nombre de usuario.
 * @property {string} formData.email - Correo electrónico.
 * @property {string} formData.password - Contraseña.
 * @property {string} formData.rol - Rol del usuario (padre, educador, administrador).
 *
 * @property {Object} errors - Estado que contiene los errores del formulario.
 * @property {string} apiError - Estado que contiene el error de la API.
 *
 * @function handleChange
 * Maneja los cambios en los campos del formulario y actualiza el estado `formData`.
 *
 * @function handleSubmit
 * Maneja el envío del formulario, realiza la solicitud a la API y maneja las respuestas y errores.
 *
 * @requires useNavigate - Hook de React Router para la navegación.
 * @requires useState - Hook de React para manejar el estado.
 * @requires fetch - Función para realizar solicitudes HTTP.
 * @requires message - Componente para mostrar mensajes de éxito o error.
 */
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rol: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        message.error('Falló el registro: ' + result.error );
        setErrors(result.errors || {});
      } else {
        localStorage.setItem("AuthToken", result.access);
        message.success("Registro exitoso");
        if (formData.rol === 'padre') {
          navigate(`/padrePage`);
        } else {
          message.warning('Debe esperar a que sea aceptada su aplicación');
        }
     
      }
    } catch (error) {
      message.error("No se pudo realizar el registro");
    }
  };

  return (
    <Container>
      <HeaderHome />
      <Icon1 />
      <Form onSubmit={handleSubmit}>
        <Title>Registrarse</Title>
        <InputGroup>
          <Icon>
            <FaUser />
          </Icon>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ borderColor: errors.username ? "red" : "#ccc" }}
          />
        </InputGroup>
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
        <InputGroup>
          <Icon>
            <FaEnvelope />
          </Icon>
          <Input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ borderColor: errors.correo ? "red" : "#ccc" }}
          />
        </InputGroup>
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <InputGroup>
          <Icon>
            <FaLock />
          </Icon>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ borderColor: errors.password ? "red" : "#ccc" }}
          />
        </InputGroup>
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <InputGroup>
          <Icon>
            <FaUser />
          </Icon>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            required
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              borderColor: errors.rol ? "red" : "#ccc",
            }}
          >
            <option value="" disabled>
              Selecciona tu rol
            </option>
            <option value='padre'>Padre</option>
            <option value='educador'>Educador</option>
            <option value='admin'>Administrador</option>
          </select>
        </InputGroup>
        {errors.rol && <p style={{ color: "red" }}>{errors.rol}</p>}
        <Button type="submit">Registrarse</Button>
        {apiError && <p style={{ color: "red" }}>{apiError}</p>}
      </Form>
    </Container>
  );
};

export default Register;
