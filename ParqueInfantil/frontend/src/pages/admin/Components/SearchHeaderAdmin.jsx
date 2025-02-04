import React from 'react';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

/**
 * Componente SearchHeaderAdmin
 * 
 * Este componente renderiza un contenedor con un campo de entrada para realizar búsquedas.
 * 
 * @param {Object} props - Las propiedades que se pasan al componente.
 * @param {function} props.handleSearch - Función que se ejecuta cuando el valor del campo de entrada cambia.
 * 
 * @returns {JSX.Element} Un contenedor con un campo de entrada para búsquedas.
 */
const SearchHeaderAdmin = ({handleSearch}) => {
    return (
        <Container>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                    placeholder="Buscar..."
                    onChange={handleSearch}
                    style={{ width: 500 }}
                />
            </div>
          
        </Container>
    );
};

export default SearchHeaderAdmin;
