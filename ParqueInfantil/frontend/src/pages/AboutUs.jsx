import React from 'react';
import { Link } from 'react-router-dom';
// import { FaHome } from 'react-icons/fa';
import '../styles/AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us">
{/*             <Link to="/" className="home-link">
                <FaHome /> Inicio
            </Link> */}
            <h1>Sobre Nosotros</h1>
            <p>¡Bienvenidos a nuestro parque infantil! Nos dedicamos a proporcionar un entorno seguro y divertido para que los niños jueguen y aprendan.</p>
            <p>Nuestra misión es crear un espacio donde los niños puedan explorar, descubrir y crecer a través del juego. Creemos que el juego es una parte esencial del desarrollo infantil y nos esforzamos por ofrecer una variedad de actividades que se adapten a diferentes intereses y grupos de edad.</p>
            <p>¡Gracias por visitarnos! Esperamos que usted y sus hijos tengan un tiempo maravilloso.</p>
        </div>
    );
};

export default AboutUs;