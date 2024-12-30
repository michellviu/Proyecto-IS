import React from 'react';
import '../styles/Login.css';

const Register = () => {
    return (
        <div>
            <h2>Registrarse</h2>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" required />
                </div>
                <div>
                    <label>Correo Electrónico:</label>
                    <input type="email" required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" required />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
