import styled from 'styled-components';
import { FaSignInAlt, FaEnvelope, FaInfoCircle, FaListAlt, FaHome } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Header = styled.header`
    background-color:rgb(172, 190, 172);
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
`;

const Ul = styled.ul`
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
`;

const Li = styled.li`
    margin: 0 15px;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 18px;
    position: relative;

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
 * Componente HeaderHome
 * 
 * Este componente representa el encabezado de la página principal. 
 * Utiliza `useLocation` para determinar la ruta actual y resaltar 
 * el enlace activo en la barra de navegación.
 * 
 * @returns {JSX.Element} El componente HeaderHome.
 */
const HeaderHome = () => {
    const location = useLocation();

    return (
        <Header>
            <Nav>
                <Ul>
                    <Li><StyledLink to="/" className={location.pathname === '/' ? 'active' : ''}><FaHome />Inicio</StyledLink></Li>
                    {/* <Li><StyledLink to="/login" className={location.pathname === '/login' ? 'active' : ''}><FaSignInAlt />Login</StyledLink></Li> */}
                    <Li><StyledLink to="/activity-catalog" className={location.pathname === '/activity-catalog' ? 'active' : ''}><FaListAlt />Actividades</StyledLink></Li> 
                    <Li><StyledLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}><FaEnvelope />Contáctenos</StyledLink></Li>
                    <Li><StyledLink to="/about" className={location.pathname === '/about' ? 'active' : ''}><FaInfoCircle />Sobre Nosotros</StyledLink></Li>
                </Ul>
            </Nav>
        </Header>
    );
};

export default HeaderHome;