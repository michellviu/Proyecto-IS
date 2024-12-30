

import React from 'react';
import '../styles/Login.css';
const Login = () => {
    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form>
                <div>
                    <label>Correo Electrónico:</label>
                    <input type="email" required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" required />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
