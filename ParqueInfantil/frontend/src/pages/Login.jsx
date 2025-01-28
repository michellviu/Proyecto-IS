import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';


const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    margin-bottom: 1rem;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
`;

const Button = styled.button`
    padding: 0.75rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.875rem;
    margin-bottom: 1rem;
`;

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const { token, role } = data;
                message.success('Inicio de sesión exitoso');
                if (role === 'admin') {
                    history(`/admin?token=${token}`);
                } else if (role === 'user') {
                    history(`/user?token=${token}`);
                }
            } else {
                message.error(data.message || 'Error en el inicio de sesión');
            }
        } catch (error) {
            message.error('Error al contactar con la API');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Por favor, complete todos los campos.');
        } else {
            setError('');
            login(email, password);
        }
    };
    return ( 
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Correo electrónico o Nombre de Usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit">Iniciar sesión</Button>
        </Form>
    );
};

export default LoginForm;
