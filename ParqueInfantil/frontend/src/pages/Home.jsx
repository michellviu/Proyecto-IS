import React from 'react';
import styled from 'styled-components';
import HeaderHome from '../components/headers/HeaderHome';
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
                            src={require('../assets/foto.jpg').default}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={require('../assets/foto.jpg').default}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={require('../assets/foto.jpg').default}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={require('../assets/foto.jpg').default}
                            alt="Fourth slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={require('../assets/foto.jpg').default}
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