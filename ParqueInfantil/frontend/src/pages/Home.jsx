import React from 'react';
import styled from 'styled-components';
import HeaderHome from '../components/headers/HeaderHome';
import { Carousel }  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import foto1 from '../assets/foto.jpg';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f8ff;
    min-height: 100vh;
`;

const CarouselContainer = styled.div`
    width: 38.2%; /* Golden ratio proportion */
    margin: 100px 0;
    align-self: flex-end;
    margin-right: 10%;
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
            {/* <img src={logo} alt="The Play Hub Logo" style={{ width: '200px', marginBottom: '20px' }} /> */}
            <CarouselContainer>
                <Carousel interval={5000} slide={true}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={foto1}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={foto1}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={foto1}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={foto1}
                            alt="Fourth slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={foto1}
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
