import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { handleLogOut } from '../HandlersRequests';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  background-color: rgb(148, 157, 165);
  color: white;
  box-shadow: 0 2px 8px #f0f1f2;
  border-radius: 10px;
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-right: 20px;
  }

  a {
    color: white;
    font-size: 1.5em;
    transition: color 0.3s;

    &:hover {
      color:rgb(80, 90, 100); /* Cambia el color al pasar el cursor */
    }
  }
`;

const HeaderAdminPage = () => {

  return (
    <Header>
      <h2>Bienvenido</h2>
      <Nav>
        <ul>
          <li>
            <Link to="/"><FaHome /></Link>
          </li>
          <li>
            <Link to="/adminPage"><AiOutlineReload /></Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogOut}>
              <FiLogOut />
            </Link>

          </li>
        </ul>
      </Nav>
    </Header>
  );
};

export default HeaderAdminPage;