import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button, Input, List, Spin, message, Modal, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, CloseOutlined } from '@ant-design/icons';
import { FaHome } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import styled from 'styled-components';

const { Search } = Input;
const { SubMenu } = Menu;

const DropdownMenu = styled.div`
    
    right: 0;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 5px;
  `;

const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
      background: rgba(32, 64, 133, 0.05);
    }
  `;

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

const ListEntities = (admin = 'Eveliz') => {
  const [form] = Form.useForm();
  const [entities, setEntities] = useState([
    'INSTALACIONES', 'ACTIVIDAD', 'RECURSOS', 'USUARIO', 'PADRE', 'EDUCADOR', 'ADMINISTRADOR', 'ACTIVIDAD_PROGRAMADA', 'RESERVACIÓN', 'CALIFICACIÓN'
  ]);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch('/api/getEntities'); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEntities(data);
      } catch (error) {
        console.error('Failed to fetch entities:', error);
        message.error('No se pudieron obtener las entidades, usando valores por defecto.');
      }
    };

    fetchEntities();
  }, []);

  const [atributes, setAtributes] = useState([
    'Id', 'Nombre', 'Descripción']);

  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  
  const currentBlock = 0;
  const [instances, setInstances] = useState([]);
  const [filteredInstances, setFilteredInstances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentInstance, setCurrentInstance] = useState(null);

  const fetchAtributes = async (entity) => {
    try {
      const response = await fetch(`/api/getAttributes?entity=${entity}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAtributes(data);
    } catch (error) {
      console.error('Failed to fetch attributes:', error);
      message.error('No se pudieron obtener los atributos, usando valores por defecto.');
    }
  };

  const fetchInstances = async (entity, blockNumber = currentBlock) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/getInstances?entity=${entity}&block=${blockNumber}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setInstances(data);
      setFilteredInstances(data);
    } catch (error) {
      console.error('Failed to fetch instances:', error);
      message.error('No se pudieron cargar las instancias.');
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (entity) => {
    setSelectedEntity(entity);
    fetchAtributes(entity);
    fetchInstances(entity);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/deleteInstance?entity=${selectedEntity}&id=${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchInstances(selectedEntity, currentBlock);
      message.success('Instancia eliminada');
    } catch (error) {
      console.error('Failed to delete instance:', error);
      message.error('No se pudo eliminar la instancia seleccionada');
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setLoading(true);
    try {
      const response = await fetch(`/api/searchInstances?entity=${selectedEntity}&attribute=${selectedAttribute}&block=${currentBlock}&query=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setInstances(data);
      setFilteredInstances(data);
    } catch (error) {
      console.error('Failed to search instances:', error);
      message.error('No se pudieron buscar las instancias.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (instance) => {
    setCurrentInstance(instance);
    setIsEditModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentInstance(null);
    setIsAddModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentInstance(null);
  };

  const handleSave = async (values) => {
    if (currentInstance) {
      try {
        const response = await fetch(`/api/updateInstance?entity=${selectedEntity}&id=${currentInstance.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        message.success('Instancia actualizada');
        fetchInstances(selectedEntity, currentBlock);
      } catch (error) {
        console.error('Failed to update instance:', error);
        message.error('No se pudo actualizar la instancia');
      }
    } else {
      try {
        const response = await fetch(`/api/addInstance?entity=${selectedEntity}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        message.success('Instancia agregada');
        fetchInstances(selectedEntity, currentBlock);
      } catch (error) {
        console.error('Failed to add instance:', error);
        message.error('No se pudo agregar la instancia');
      }
    }
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentInstance(null);
  };
  const [pendingUsers, setPendingUsers] = useState([]);

  const handleUserAuthorizationClick = async () => {
    setSelectedEntity('user-authorization');
    try {
      const response = await fetch('/api/getPendingUsers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPendingUsers(data);
      message.success('Usuarios pendientes obtenidos exitosamente');
    } catch (error) {
      console.error('Failed to fetch pending users:', error);
      message.error('No se pudieron obtener los usuarios pendientes');
    }
  };

  const [pendingReservations, setPendingReservations] = useState([]);
  const handleReservationRequestsClick = async () => {
    setSelectedEntity('reservation-requests');
    try {
      const response = await fetch('/api/getPendingReservations');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPendingReservations(data);
      message.success('Solicitudes de reserva obtenidas exitosamente');
    } catch (error) {
      console.error('Failed to fetch reservation requests:', error);
      message.error('No se pudieron obtener las solicitudes de reserva');
    }
  };



  

  const handleAttributeClick = (attribute) => {
    setSelectedAttribute(attribute);
    message.info(`Atributo seleccionado: ${attribute}`);
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
          <Link to="/admin/list-entities"><AiOutlineReload /></Link>
          </li>
        </ul>
        </Nav>
      </Header>

      <Content>
        <Sidebar mode="inline">
        <Menu.Item key="user-authorization" onClick={() => handleUserAuthorizationClick()}>
          Autorización de Usuarios
        </Menu.Item>
        <Menu.Item key="reservation-requests" onClick={() => handleReservationRequestsClick()}>
          Solicitudes de Reserva
        </Menu.Item>
        <SubMenu key="entities" title="Entidades">
          {entities.map(entity => (
          <Menu.Item key={entity} onClick={() => handleMenuClick(entity)}>
            {entity}
          </Menu.Item>
          ))}
        </SubMenu>
        </Sidebar>

        <InstancesList>
        {selectedEntity === 'user-authorization' && (
          <div>
          {/* Render pending users */}
          </div>
        )}
        {selectedEntity === 'reservation-requests' && (
          <div>
          {/* Render pending reservations */}
          </div>
        )}
        {entities.includes(selectedEntity) && (
          <>
          <ListHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <Search
              placeholder="Buscar..."
              onChange={handleSearch}
              style={{ width: 500 }}
            />
            <Button className="dropdown-button" icon={<BsThreeDots />} onClick={handleDropdownClick} />
            </div>
            {isDropdownVisible && (
            <DropdownMenu>
              {atributes.map(attribute => (
              <DropdownItem key={attribute} onClick={() => handleAttributeClick(attribute)}>
                {attribute}
              </DropdownItem>
              ))}
            </DropdownMenu>
            )}
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Agregar
            </Button>
          </ListHeader>

                <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid #d9d9d9', flex: 1 }}>
            {atributes.map(attribute => (
            <div
              key={attribute}
              style={{
              padding: '10px',
              cursor: 'pointer',
              borderRight: '1px solid #d9d9d9',
              color: selectedAttribute === attribute ? '#1890ff' : 'black',
              textDecoration: selectedAttribute === attribute ? 'underline' : 'none',
              transition: 'color 0.3s'
              }}
              onClick={() => handleAttributeClick(attribute)}
              onMouseEnter={(e) => e.target.style.color = '#1890ff'}
              onMouseLeave={(e) => e.target.style.color = selectedAttribute === attribute ? '#1890ff' : 'black'}
            >
              {attribute}
            </div>
            ))}
          </div>

          {loading ? (
            <Spin />
          ) : (
            <List
            itemLayout="horizontal"
            dataSource={filteredInstances}
            renderItem={item => (
              <List.Item
              actions={[
                <Button icon={<EditOutlined />} onClick={() => handleEdit(item)} />,
                <Button icon={<DeleteOutlined />} onClick={() => handleDelete(item.id)} />
              ]}
              >
              </List.Item>
            )}
            />
          )}
          </>
        )}
        </InstancesList>
      </Content>

      <Modal
        title="Agregar Instancia"
        open={isAddModalVisible}
        onCancel={handleCancel}
        footer={null}
        afterClose={() => form.resetFields()}
      >
        <Form form={form} onFinish={(values) => handleSave(values)}>
        {atributes.filter(attr => attr !== 'Id').map(attribute => (
          <Form.Item
          key={attribute}
          name={attribute.toLowerCase()}
          label={attribute}
          rules={[{ required: true, message: `Por favor ingrese ${attribute.toLowerCase()}` }]}
          >
          <Input />
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#689172', borderColor: 'hsl(135, 18.20%, 55.90%)', color: 'white' }} onClick={() => form.submit()}>
          Guardar
          </Button>
          <Button onClick={handleCancel} style={{ backgroundColor: '#8d3636', borderColor: 'lightcoral', marginLeft: '10px', color: 'white' }} icon={<CloseOutlined />}>
          Cancelar
          </Button>
        </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Editar Instancia"
        open={isEditModalVisible}
        onCancel={handleCancel}
        footer={null}
        afterClose={() => setCurrentInstance(null)}
      >
        <Form
        key={currentInstance ? currentInstance.id : 'new'}
        initialValues={currentInstance}
        onFinish={(values) => handleSave(values)}
        >
        {atributes.map(attribute => (
          <Form.Item
          key={attribute}
          name={attribute.toLowerCase()}
          label={attribute}
          rules={[{ required: true, message: `Por favor ingrese ${attribute.toLowerCase()}` }]}
          >
          <Input />
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#689172', borderColor: 'hsl(135, 18.20%, 55.90%)', color: 'white' }} onClick={() => form.submit()}>
          Guardar
          </Button>
          <Button onClick={handleCancel} style={{ backgroundColor: '#8d3636', borderColor: 'lightcoral', marginLeft: '10px', color: 'white' }} icon={<CloseOutlined />}>
          Cancelar
          </Button>
        </Form.Item>
        </Form>
      </Modal>
      </Container>
    );
  };
export default ListEntities;
