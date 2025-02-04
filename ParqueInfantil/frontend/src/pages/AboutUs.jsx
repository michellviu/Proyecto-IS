import React from 'react';
import { FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import HeaderHome from '../components/headers/HeaderHome';
import { Carousel }  from 'react-bootstrap';
import foto1 from '../assets/area1.jpg';
import foto2 from '../assets/act1.jpg';
import foto3 from '../assets/act2.jpg';
import foto4 from '../assets/act3.jpg';
import foto5 from '../assets/act4.jpg';
import foto6 from '../assets/act5.jpg';
import foto7 from '../assets/area2.jpg';
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
    text-align: left;
    width: 40%;
    margin-left: 55%;
`;

const CarouselContainer = styled.div`
    width: 45.2%; /* Golden ratio proportion */
    margin: 40px 0; /* Margin on top and bottom */
    position: absolute;
    top: 18%;
    left: 3%;
`;

/**
 * Componente AboutUs
 * 
 * Este componente representa la página "Sobre Nosotros" de un parque infantil.
 * Proporciona información sobre el parque, su misión y las actividades que ofrece.
 * También incluye un carrusel de imágenes que muestra diferentes áreas y eventos del parque.
 * 
 * @returns {JSX.Element} El componente AboutUs.
 */
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

            <CarouselContainer>
                <Carousel interval={3000} slide={true}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={foto1}
                            alt="First slide"
                            width="800"
                            height="400"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={foto2}
                            alt="Second slide"
                            width="800"
                            height="400"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={foto3}
                            alt="Third slide"
                            width="800"
                            height="400"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={foto4}
                            alt="Fourth slide"
                            width="800"
                            height="400"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={foto5}
                            alt="Fifth slide"
                            width="800"
                            height="400"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={foto6}
                            alt="Sixth slide"
                            width="800"
                            height="400"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={foto7}
                            alt="Seventh slide"
                            width="800"
                            height="400"
                        />
                    </Carousel.Item>
                </Carousel>
            </CarouselContainer> 
        </AboutUsContainer>
    );
};

export default AboutUs;