import React from "react";
import { Link } from "react-router-dom";
//import { FaHome } from "react-icons/fa";
import "../styles/AboutUs.css";

const ContactUs = () => {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {/* Área para poner el logo del parque */}
        <img
          src="/path/to/logo.png"
          alt="Logo del Parque"
          style={{ width: "150px" }}
        />
      </div>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
       {/*  <Link to="/" className="home-link">
          <FaHome /> Inicio
        </Link> */}
      </div>
      <h1>Contáctanos</h1>
      <form>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="message">Mensaje:</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ContactUs;
