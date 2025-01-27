import React from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import styled from 'styled-components';
import HeaderHome from '../components/headers/HeaderHome';
import { message} from 'antd';

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


import { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        contraseña: '',
        rol: ''
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        try {
            const response = await fetch('https://api.example.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                setErrors(result.errors || {});
            } else {
                // Handle successful registration
                message.success('Registro exitoso');
            }
        } catch (error) {
            message.error('No se pudo establecer contacto con la API');
        }
    };

    return (
        <Container>
            <HeaderHome />
            <Icon1 />
            <Form onSubmit={handleSubmit}>
                <Title>Registrarse</Title>
                <InputGroup>
                    <Icon><FaUser /></Icon>
                    <Input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        style={{ borderColor: errors.nombre ? 'red' : '#ccc' }}
                    />
                </InputGroup>
                {errors.nombre && <p style={{ color: 'red' }}>{errors.nombre}</p>}
                <InputGroup>
                    <Icon><FaEnvelope /></Icon>
                    <Input
                        type="email"
                        name="correo"
                        placeholder="Correo Electrónico"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                        style={{ borderColor: errors.correo ? 'red' : '#ccc' }}
                    />
                </InputGroup>
                {errors.correo && <p style={{ color: 'red' }}>{errors.correo}</p>}
                <InputGroup>
                    <Icon><FaLock /></Icon>
                    <Input
                        type="password"
                        name="contraseña"
                        placeholder="Contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                        required
                        style={{ borderColor: errors.contraseña ? 'red' : '#ccc' }}
                    />
                </InputGroup>
                {errors.contraseña && <p style={{ color: 'red' }}>{errors.contraseña}</p>}
                <InputGroup>
                    <Icon><FaUser /></Icon>
                    <select
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                        required
                        style={{ flex: 1, border: 'none', outline: 'none', padding: '0.5rem', borderRadius: '4px', borderColor: errors.rol ? 'red' : '#ccc' }}
                    >
                        <option value="" disabled>Selecciona tu rol</option>
                        <option value="Padre">Padre</option>
                        <option value="Educador">Educador</option>
                        <option value="Admin">Administrador</option>
                    </select>
                </InputGroup>
                {errors.rol && <p style={{ color: 'red' }}>{errors.rol}</p>}
                <Button type="submit">Registrarse</Button>
                {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
            </Form>
        </Container>
    );
};

export default Register;