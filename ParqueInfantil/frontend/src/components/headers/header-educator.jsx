import styled from 'styled-components';
import { FaSignInAlt, FaUser, FaEnvelope, FaInfoCircle, FaListAlt, FaHome } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { handleLogOut } from '../../pages/admin/HandlersRequests';

const Header = styled.header`
    background-color: rgb(172, 190, 172);
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 100vh;
    width: 10%;
    position: fixed;
    left: 0;
    top: 0;
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100%;
`;

const Li = styled.li`
    margin: 15px 0;
    width: 100%;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 18px;
    position: relative;
    width: 100%;
    justify-content: center;

    &:hover {
        color: #333;
    }

    svg {
        margin-right: 8px;
    }

    &.active {
        color: #333;
        text-decoration: underline;
    }
`;

/**
 * Componente HeaderEducator
 * 
 * Este componente representa el encabezado para la sección del educador en la aplicación.
 * Utiliza `useLocation` para determinar la ruta actual y resaltar el enlace activo.
 * 
 * @returns {JSX.Element} El componente HeaderEducator.
 * 
 * @component
 * 
 * @example
 * return (
 *   <HeaderEducator />
 * )
 * 
 * @description
 * El componente contiene una lista de enlaces de navegación:
 * - "Mis Actividades" que redirige a `/educadorPage`.
 * - "Programación" que redirige a `/activity-catalog`.
 * - "Mi Perfil" que redirige a `/educator/profile`.
 * - Un enlace para cerrar sesión que llama a la función `handleLogOut`.
 * 
 * Cada enlace tiene una clase `active` si la ruta actual coincide con la ruta del enlace.
 */
const HeaderEducator = () => {
    const location = useLocation();

    return (
        <Header>
            <Nav>
                <Ul>
                    <Li><StyledLink to="/educadorPage" className={location.pathname === '/educadorPage' ? 'active' : ''}><FaInfoCircle />Mis Actividades</StyledLink></Li> 
                    <Li><StyledLink to="/activity-catalog" className={location.pathname === '/activity-catalog' ? 'active' : ''}><FaListAlt />Programación</StyledLink></Li>
                    <Li><StyledLink to="/educator/profile" className={location.pathname === '/educator/profile' ? 'active' : ''}><FaUser />Mi Perfil</StyledLink></Li>
                    <Li><StyledLink to="/" onClick={handleLogOut}> <FiLogOut /> </StyledLink></Li>
                </Ul>
            </Nav>
        </Header>
    );
};

export default HeaderEducator;