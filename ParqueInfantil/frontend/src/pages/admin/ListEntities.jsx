import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button, Input, List, Spin, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import styled from 'styled-components';

const { Search } = Input;

// Estilos personalizados usando styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  background-color: #f0f2f5;
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
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

const Sidebar = styled(Menu)`
  width: 256px;
`;

const InstancesList = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ListEntities = () => {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Obtener entidades de la base de datos
    axios.get('/api/entities')
      .then(response => setEntities(response.data))
      .catch(error => message.error('Error al obtener entidades'));
  }, []);

  const handleMenuClick = (entity) => {
    setSelectedEntity(entity);
    fetchInstances(entity);
  };

  const fetchInstances = (entity) => {
    setLoading(true);
    axios.get(`/api/entities/${entity}/instances`)
      .then(response => {
        setInstances(response.data);
        setLoading(false);
      })
      .catch(error => {
        message.error('Error al obtener instancias');
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/instances/${id}`)
      .then(() => {
        setInstances(instances.filter(instance => instance.id !== id));
        message.success('Instancia eliminada');
      })
      .catch(error => message.error('Error al eliminar instancia'));
  };

  const handleSearch = (value) => {
    const filteredInstances = instances.filter(instance =>
      Object.values(instance).some(val =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setInstances(filteredInstances);
  };

  const handleSort = (attribute) => {
    const sortedInstances = [...instances].sort((a, b) => {
      if (a[attribute] < b[attribute]) return -1;
      if (a[attribute] > b[attribute]) return 1;
      return 0;
    });
    setInstances(sortedInstances);
  };

  return (
    <Container>
      <Header>
        <h2>Bienvenido</h2>
        <Nav>
          <ul>
            <li>
              <Link to="/"><FaHome /></Link>
            </li>
            <li>
              <Link to="/admin/list-entities">Recargar</Link>
            </li>
          </ul>
        </Nav>
      </Header>

      <Content>
        <Sidebar
          mode="inline"
          onClick={({ key }) => handleMenuClick(key)}
        >
          {entities.map(entity => (
            <Menu.Item key={entity}>
              {entity}
            </Menu.Item>
          ))}
        </Sidebar>

        <InstancesList>
          {selectedEntity && (
            <>
              <ListHeader>
                <Search
                  placeholder="Buscar..."
                  onSearch={handleSearch}
                  style={{ width: 200 }}
                />
                <Button type="primary" icon={<PlusOutlined />}>
                  Agregar
                </Button>
              </ListHeader>
              {loading ? (
                <Spin />
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={instances}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Button icon={<EditOutlined />} />,
                        <Button icon={<DeleteOutlined />} onClick={() => handleDelete(item.id)} />
                      ]}
                    >
                      <List.Item.Meta
                        title={item.id}
                        description={Object.values(item).join(', ')}
                      />
                    </List.Item>
                  )}
                />
              )}
            </>
          )}
        </InstancesList>
      </Content>
    </Container>
  );
};

export default ListEntities;