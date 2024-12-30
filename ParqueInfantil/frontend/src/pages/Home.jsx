import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Asegúrate de crear y ajustar este archivo CSS

const Home = () => {
    return (
        <div className="home-container">
            <header className="header">
                <div className="header-inner">
                    <Link to="/" className="logo">Parque Infantil</Link>
                    <nav className="nav">
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/about">Sobre Nosotros</Link></li>
                            <li><Link to="/contact">Contáctenos</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section className="welcome-section">
                <div className="welcome-inner">
                    <h1>Bienvenidos al Parque Infantil</h1>
                    <p>Disfruta de un lugar seguro y divertido para tus hijos.</p>
                    <ul>
                        <li>Áreas verdes y espacios al aire libre</li>
                        <li>Personal capacitado y amable</li>
                        <li>Seguridad y monitoreo constante</li>
                        <li>Actividades educativas y recreativas</li>
                    </ul>
                </div>
            </section>

            <section className="carousel-section">
                <div className="carousel">
                    {/* Aquí puedes integrar un carrusel de fotos */}
                    <div className="carousel-item">Foto 1</div>
                    <div className="carousel-item">Foto 2</div>
                    <div className="carousel-item">Foto 3</div>
                </div>
            </section>

            <section className="auth-section">
                <div className="auth-inner">
                    <h2>Acceso a Usuarios</h2>
                    <Link to="/login">
                        <button className="btn">Iniciar Sesión</button>
                    </Link>
                    <Link to="/register">
                        <button className="btn">Registrarse</button>
                    </Link>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-inner">
                    <p>© 2025 Parque Infantil. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;