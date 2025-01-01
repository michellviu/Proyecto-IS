import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button, Input, List, Spin, message, Modal, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, CloseOutlined } from '@ant-design/icons';
import { FaHome } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';
import styled from 'styled-components';

const { Search } = Input;

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

const ListEntities = () => {
  const [form] = Form.useForm();
  const [entities, setEntities] = useState([
    'INSTALACIONES', 'ACTIVIDAD', 'RECURSOS', 'USUARIO', 'PADRE', 'EDUCADOR', 'ADMINISTRADOR', 'ACTIVIDAD_PROGRAMADA', 'RESERVACIÓN', 'CALIFICACIÓN'
  ]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [instances, setInstances] = useState([]);
  const [filteredInstances, setFilteredInstances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentInstance, setCurrentInstance] = useState(null);

  const handleMenuClick = (entity) => {
    setSelectedEntity(entity);
    fetchInstances(entity);
  };

  const fetchInstances = (entity) => {
    setLoading(true);
    // Simulate fetching data
    setTimeout(() => {
      const exampleData = [
        { id: 1, name: 'Example 1', description: 'This is an example instance' },
        { id: 2, name: 'Example 2', description: 'This is another example instance' }
      ];
      setInstances(exampleData);
      setFilteredInstances(exampleData);
      setLoading(false);
    }, 1000);
  };

  const handleDelete = (id) => {
    const updatedInstances = instances.filter(instance => instance.id !== id);
    setInstances(updatedInstances);
    setFilteredInstances(updatedInstances);
    message.success('Instancia eliminada');
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    const filtered = instances.filter(instance =>
      Object.values(instance).some(val =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredInstances(filtered);
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

  const handleSave = (values) => {
    if (currentInstance) {
      const updatedInstances = instances.map(instance =>
        instance.id === currentInstance.id ? { ...instance, ...values } : instance
      );
      setInstances(updatedInstances);
      setFilteredInstances(updatedInstances);
      message.success('Instancia actualizada');
    } else {
      const newInstance = { id: instances.length + 1, ...values };
      const updatedInstances = [...instances, newInstance];
      setInstances(updatedInstances);
      setFilteredInstances(updatedInstances);
      message.success('Instancia agregada');
    }
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentInstance(null);
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
                  onChange={handleSearch}
                  style={{ width: 200 }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                  Agregar
                </Button>
              </ListHeader>
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
                      <List.Item.Meta
                        title={item.name}
                        description={item.description}
                      />
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
        <Form
          form={form}
          onFinish={handleSave}
        >
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descripción"
            rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#689172', borderColor: 'hsl(135, 18.20%, 55.90%)', color: 'white' }}>
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
          onFinish={handleSave}
        >
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descripción"
            rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#689172', borderColor: 'hsl(135, 18.20%, 55.90%)', color: 'white' }}>
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
