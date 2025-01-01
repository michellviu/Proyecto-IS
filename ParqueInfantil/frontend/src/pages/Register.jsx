import React from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import styled from 'styled-components';
import HeaderHome from '../components/headers/HeaderHome';

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

const Register = () => {
    return (
        <Container>
            <HeaderHome />
            <Icon1 />
            <Form>
                <Title>Registrarse</Title>
                <InputGroup>
                    <Icon><FaUser /></Icon>
                    <Input type="text" placeholder="Nombre" required />
                </InputGroup>
                <InputGroup>
                    <Icon><FaEnvelope /></Icon>
                    <Input type="email" placeholder="Correo Electrónico" required />
                </InputGroup>
                <InputGroup>
                    <Icon><FaLock /></Icon>
                    <Input type="password" placeholder="Contraseña" required />
                </InputGroup>
                <Button type="submit">Registrarse</Button>
            </Form>
        </Container>
    );
};

export default Register;
