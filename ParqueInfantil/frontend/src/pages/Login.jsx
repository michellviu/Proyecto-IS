import React, { useState } from 'react';
import styled from 'styled-components';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate();
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const login = async (username, password) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.access;
                const rol = data.rol;
                localStorage.clear();
                localStorage.setItem('AuthToken',token);
                localStorage.setItem('Role',rol);
                message.success('Inicio de sesión exitoso');
                navigate(`/${rol}Page`);
            } else {
                message.error('Error en el inicio de sesión: '+ data.error);
            }
        } catch (error) {
            message.error(rol);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Por favor, complete todos los campos.');
        } else {
            setError('');
            login(username, password);
        }
    };
    return ( 
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Nombre de Usuario"
                value={username}
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
