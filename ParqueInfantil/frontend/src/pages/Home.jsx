import React from 'react';
import styled from 'styled-components';
import HeaderHome from '../components/headers/header-home';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f8ff;
    min-height: 100vh;
`;

const CarouselContainer = styled.div`
    width: 60%;
    margin: 20px 0;
`;

const Footer = styled.footer`
    background-color: #ffcccb;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    position: absolute;
    bottom: 0;
`;

const Home = () => {
    return (
        <HomeContainer>
            <HeaderHome />
            <CarouselContainer>
                <Carousel interval={5000}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://via.placeholder.com/800x400?text=Foto+1"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://via.placeholder.com/800x400?text=Foto+2"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://via.placeholder.com/800x400?text=Foto+3"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://via.placeholder.com/800x400?text=Foto+4"
                            alt="Fourth slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://via.placeholder.com/800x400?text=Foto+5"
                            alt="Fifth slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </CarouselContainer>
            <Footer>
                <p>© 2025 Parque Infantil. Todos los derechos reservados.</p>
            </Footer>
        </HomeContainer>
    );
};

export default Home;