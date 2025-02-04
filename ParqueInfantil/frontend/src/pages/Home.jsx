import React from 'react';
import styled from 'styled-components';
import HeaderHome from '../components/headers/HeaderHome';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './Login';
import fondo from '../assets/fondo.jpeg'


const HomeContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-image: url(${fondo});
    background-size: cover;
    background-position: center;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0);
        backdrop-filter: blur(5px);
        z-index: 1;
    }
    > * {
        position: relative;
        z-index: 2;
    }
`;


const Footer = styled.footer`
    background-color:rgba(161, 134, 133, 0.42);
    width: 100%;
    text-align: center;
    padding: 10px 0;
    position: absolute;
    bottom: 0;
`;

const Container = styled.div`
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-top: 10;
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
    color #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;



/**
 * Componente Home.
 * 
 * Este componente representa la página de inicio de la aplicación. 
 * Verifica si hay un token de autenticación almacenado en el localStorage 
 * y muestra diferentes contenidos basados en la autenticación del usuario.
 * 
 * @returns {JSX.Element} El componente Home.
 */
const Home = () => {

    const authToken = localStorage.getItem('authToken');

    return (
        <HomeContainer>
            <HeaderHome style={{ marginTop: 0 }} />
            {/* <img src={logo} alt="The Play Hub Logo" style={{ width: '200px', marginBottom: '20px' }} /> */}
            
            {!authToken ? (
                <Container>
                    <Icon />
                    <Title>Login</Title>
                    <LoginForm />
                    <RegisterLink to="/register">¿No tienes una cuenta aún?</RegisterLink>
                </Container>
            ) : (
                <Container>
                    <Title>Bienvenido de nuevo</Title>
                </Container>
            )}
            <Footer>
                <p>© 2025 Parque Infantil. Todos los derechos reservados.</p>
            </Footer>
        </HomeContainer>
    );
};

export default Home;
