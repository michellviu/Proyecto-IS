import React from 'react';
import { FaHome } from 'react-icons/fa';
import styled from 'styled-components';
import HeaderHome from '../components/headers/HeaderHome';
//import logo from '../assets/logo.png'; // Asegúrate de que la ruta del logo sea correcta

const AboutUsContainer = styled.div`
    padding: 20px;
    text-align: center;
    background-color: #f9f9f9;
    color: #333;
`;

const Logo = styled.img`
    width: 150px;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 2.5em;
    margin-bottom: 20px;
`;

const Paragraph = styled.p`
    font-size: 1.2em;
    line-height: 1.6;
    margin-bottom: 20px;
`;

const AboutUs = () => {
    return (
        <AboutUsContainer>
            <HeaderHome />
            { /*<Logo src={logo} alt="Logo del Parque" />*/}
            <Title>Sobre Nosotros</Title>
            <Paragraph>¡Bienvenidos a nuestro parque infantil! Nos dedicamos a proporcionar un entorno seguro y divertido para que los niños jueguen y aprendan.</Paragraph>
            <Paragraph>Nuestra misión es crear un espacio donde los niños puedan explorar, descubrir y crecer a través del juego. Creemos que el juego es una parte esencial del desarrollo infantil y nos esforzamos por ofrecer una variedad de actividades que se adapten a diferentes intereses y grupos de edad.</Paragraph>
            <Paragraph>Contamos con áreas de juego temáticas, talleres educativos, y eventos especiales durante todo el año. Nuestro equipo está compuesto por profesionales dedicados a garantizar la seguridad y el bienestar de todos los niños.</Paragraph>
            <Paragraph>¡Gracias por visitarnos! Esperamos que usted y sus hijos tengan un tiempo maravilloso.</Paragraph>
        </AboutUsContainer>
    );
};

export default AboutUs;