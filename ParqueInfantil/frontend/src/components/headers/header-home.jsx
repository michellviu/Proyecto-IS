import styled from 'styled-components';
import { FaSignInAlt, FaEnvelope, FaInfoCircle } from 'react-icons/fa';

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

    &:hover {
        color: #333;
    }

    svg {
        margin-right: 8px;
    }
`;

const HeaderHome = () => {
    return (
        <Header>
            <Nav>
                <Ul>
                    <Li><StyledLink to="/"><FaHome />Inicio</StyledLink></Li>
                    <Li><StyledLink to="/login"><FaSignInAlt />Login</StyledLink></Li>
                    <Li><StyledLink to="/contact"><FaEnvelope />Contáctenos</StyledLink></Li>
                    <Li><StyledLink to="/about"><FaInfoCircle />Sobre Nosotros</StyledLink></Li>
                  { /* <Li><StyledLink to="/activity-catalog"><FaListAlt />Actividades</StyledLink></Li>*/}
                </Ul>
            </Nav>
        </Header>
    );
};

export default HeaderHome;