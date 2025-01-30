import React from 'react';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

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
