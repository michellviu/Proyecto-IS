import React from 'react';
import styled from 'styled-components';
import HeaderHome from '../components/headers/HeaderHome';
import Login from './Login';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//import LoginForm from './Login';


const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f8ff;
    min-height: 100vh;
`;


const Footer = styled.footer`
    background-color: #ffcccb;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    position: absolute;
    bottom: 0;
`;

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

const Home = () => {
    return (
        <HomeContainer>
            <HeaderHome />
            {/* <img src={logo} alt="The Play Hub Logo" style={{ width: '200px', marginBottom: '20px' }} /> */}
            
            
            <Container>
            <Icon />
            <Title>Login</Title>
                <Login />
                <RegisterLink to="/register">¿No tienes una cuenta aún?</RegisterLink>
            </Container>
            <Footer>
                <p>© 2025 Parque Infantil. Todos los derechos reservados.</p>
            </Footer>
        </HomeContainer>
    );
};

export default Home;
