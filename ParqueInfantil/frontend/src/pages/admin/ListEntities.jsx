import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button, Input, List, Spin, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Search } = Input;

const ListEntities = () => {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch entities from the database
    axios.get('/api/entities')
      .then(response => setEntities(response.data))
      .catch(error => message.error('Error fetching entities'));
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
        message.error('Error fetching instances');
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/instances/${id}`)
      .then(() => {
        setInstances(instances.filter(instance => instance.id !== id));
        message.success('Instance deleted');
      })
      .catch(error => message.error('Error deleting instance'));
  };

  const handleSearch = (value) => {
    // Implement search functionality
  };

  const handleSort = (attribute) => {
    // Implement sort functionality
  };

  return (
    <div className="admin-dashboard-container">
      <header className="header">
        <h2>Bienvenido</h2>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin/list-entities">Reload</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="content">
        <Menu
          mode="inline"
          style={{ width: 256 }}
          onClick={({ key }) => handleMenuClick(key)}
        >
          {entities.map(entity => (
            <Menu.Item key={entity}>
              {entity}
            </Menu.Item>
          ))}
        </Menu>

        <div className="instances-list">
          {selectedEntity && (
            <>
              <div className="list-header">
                <Search
                  placeholder="Buscar..."
                  onSearch={handleSearch}
                  style={{ width: 200 }}
                />
                <Button type="primary" icon={<PlusOutlined />}>
                  Agregar
                </Button>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default ListEntities;