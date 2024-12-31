import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HeaderHome from '../components/headers/HeaderHome';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #333;
`;

const Icon = styled(FaHome)`
    color: #333;
    font-size: 3rem;
    margin-bottom: 1rem;
`;

const RegisterLink = styled(Link)`
    margin-top: 1rem;
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Por favor, complete todos los campos.');
        } else {
            setError('');
            // login crud
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Iniciar sesión</Button>
        </Form>
    );
};

const Login = () => {
    return (
        <Container>
            <HeaderHome />
            <Icon />
            <Title>Login</Title>
            <LoginForm />
            <RegisterLink to="/register">¿No tienes una cuenta aún?</RegisterLink>
        </Container>
    );
};

export default Login;
