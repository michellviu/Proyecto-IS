import { useNavigate } from 'react-router-dom';
import {message} from 'antd';

/**
 * Redirige al usuario a una página específica según su rol.
 *
 * @param {string} role - El rol del usuario que determina la página de redirección.
 * @returns {void}
 *
 * @example
 * // Redirige a la página de administrador
 * Redirect('admin');
 *
 * @example
 * // Redirige a la página de educador
 * Redirect('educador');
 *
 * @example
 * // Redirige a la página de padre
 * Redirect('padre');
 *
 * @example
 * // Muestra un error en la consola para un rol no válido
 * Redirect('invitado');
 */
const Redirect = ( role ) => {
    const navigate = useNavigate();
    message.success('entraste al metodo')
    switch (role) {
        case 'admin':
            navigate('/adminPage');
            break;
        case 'educador':
            navigate('/EducatorPage');
            break;
        case 'padre':
            navigate('/ParentPage');
            break;
        default:
            console.error('Invalid role');
    }
};

export default Redirect;