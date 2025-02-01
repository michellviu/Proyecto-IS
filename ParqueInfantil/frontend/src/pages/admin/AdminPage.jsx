import React, { useState, useEffect } from 'react';
import { message, Form, Spin } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

//Componentes externas
import MenuAdmin from './Components/MenuAdmin';
import HeaderAdminPage from './Components/HeaderAdminPage';
import ModalEdit from './Components/ModalEdit';
import ModalAdd from './Components/ModalAdd';
import UserAuthorization from './Components/UserAuthorization'
import ResourceView from './Components/ResourceView';
import ReservationRequestsView from './Components/ReservationrequestsView';
import EntityView from './Components/EntityView';
// import AlertPage from '../AlertPage';

//Handlers API
import {
  fetchEntities, fetchAtributes, fetchInstances,
  handleDeleteRequest, fetchSearch, fetchOrder, handleEdit, handleAdd,
  fetchPendingUsers, handleAcceptUser, handleRejectUser,
  fetchResourcesInUse,
  fetchPendingReservations, handleAcceptRev, handleRejectRev
} from './HandlersRequests'

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

const InstancesList = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const AdminPage = (admin = 'Eveliz') => {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      const userRole = localStorage.getItem('Role');
      if (userRole !== 'admin') {
          navigate('/alertPage');
      } else {
          setIsAuthenticated(true);
      }
  }, [navigate]);

  // if (!isAuthenticated) {
  //     return;
  // }


  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [entities, setEntities] = useState([
    'INSTALACIONES', 'ACTIVIDAD', 'RECURSOS', 'USUARIO', 'PADRE',
    'EDUCADOR', 'ADMINISTRADOR', 'ACTIVIDAD_PROGRAMADA', 'RESERVACIÓN', 'CALIFICACIÓN'
  ]);
  useEffect(() => { fetchEntities(setEntities) }, []);

  const [atributes, setAtributes] = useState([
    { name: 'Id', null: false },
    { name: 'Nombre', null: false },
    { name: 'Descripción', null: false }]);
  const [selectedEntity, setSelectedEntity] = useState([null]);
  const [selectedAttribute, setSelectedAttribute] = useState(atributes[0]);

  const currentBlock = 0;
  const [instances, setInstances] = useState([
    { Id: 1, Nombre: 'Ejemplo 1', Descripción: 'Des 1' },
    { Id: 2, Nombre: 'Ejemplo 2', Descripción: 'Des 2' },
    { Id: 3, Nombre: 'Ejemplo 3', Descripción: 'Des 3' }]);
  const [filteredInstances, setFilteredInstances] = useState([]);
  const [currentInstance, setCurrentInstance] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(0);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);


  const [pendingUsers, setPendingUsers] = useState([
    { id: 1, nombre: 'Juan Perez', descripcion: 'Usuario pendiente 1' },
    { id: 2, nombre: 'Maria Lopez', descripcion: 'Usuario pendiente 2' },
    { id: 3, nombre: 'Carlos Sanchez', descripcion: 'Usuario pendiente 3' }]);

  const [resources, setResources] = useState([
    { id: 1, nombre: 'Recurso 1', descripcion: 'Descripción del recurso 1' },
    { id: 2, nombre: 'Recurso 2', descripcion: 'Descripción del recurso 2' },
    { id: 3, nombre: 'Recurso 3', descripcion: 'Descripción del recurso 3' }]);

  const [pendingReservations, setPendingReservations] = useState([]);


  //Metodos GET entidades
  const handleMenuClick = async (entity) => {
    setLoading(true);
    message.info(`Entidad seleccionada: ${entity}`);
    setSelectedEntity(entity);
    await fetchAtributes(entity, setAtributes);
    await fetchInstances(entity, setInstances, setFilteredInstances, currentBlock);
    setLoading(false);
  };

  const refresh = async () => {
    setLoading(true);
    if (selectedEntity === 'user-authorization') {
      await fetchPendingUsers(setPendingUsers);
    } else {
      await fetchInstances(selectedEntity, setInstances, setFilteredInstances, currentBlock);
    }
    setLoading(false);
  }

  const handleAttributeClick = async (attribute) => {
    if (!(attribute.name === selectedAttribute.name)) {
      setSelectedAttribute(attribute);
      message.info(`Atributo seleccionado: ${attribute.name}`);
    }
  };

  const handleSearch = async (e) => {
    setLoading(true);
    await fetchSearch(selectedEntity, selectedAttribute, e, setInstances, setFilteredInstances);
    setLoading(false);
  };

  const handleSort = async (attribute) => {
    setLoading(true);
    handleAttributeClick(attribute);
    var order = 'asc'
    if (currentOrder === 1) {
      order = 'desc';
    }
    await fetchOrder(selectedEntity, attribute, order, setInstances, setFilteredInstances);
    setCurrentOrder(1 - currentOrder);
    setLoading(false);
  }

  //Metodos CRUD 
  const handleEditModal = async (instance) => {
    setCurrentInstance(instance);
    setIsEditModalVisible(true);
  };

  const handleAddModal = () => {
    setCurrentInstance(null);
    setIsAddModalVisible(true);
  };

  const handleDelete = async (instance) => {
    setLoading(true);
    setCurrentInstance(instance);
    await handleDeleteRequest(selectedEntity, instance.id);
    setCurrentInstance(null);
    await refresh();
    setLoading(false);
  }

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentInstance(null);
  };

  const handleSave = async (values) => {
    setLoading(true);
    if (isEditModalVisible) {
      await handleEdit(selectedEntity, values.id, values);
    } else {
      await handleAdd(selectedEntity, values);
    }
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentInstance(null);
    await refresh();
    setLoading(false);
  };

  //Asignación de roles
  const handleUserAuthorizationClick = async () => {
    setLoading(true);
    setSelectedEntity('user-authorization');
    await fetchPendingUsers(setPendingUsers);
    setLoading(false);
  };

  const handleAccept = async (user) => {
    setLoading(true);
    await handleAcceptUser(user);
    await refresh();
    setLoading(false);

  };

  const handleReject = async (user) => {
    setLoading(true);
    await handleRejectUser(user);
    await refresh();
    setLoading(false);

  };

  //Gestion de Recursos
  const handleResourceClick = async () => {
    setLoading(true);
    setSelectedEntity('resource');
    await fetchResourcesInUse(setResources);
    setLoading(false);
  };

  //Gestion de Reservas
  const handleReservationRequestsClick = async () => {
    setLoading(true);
    setSelectedEntity('reservation-requests');
    await fetchPendingReservations(setPendingReservations);
    setLoading(false);
  };


  const handleAcceptReservation = async (reservation) => {
    setLoading(true);
    await handleAcceptRev(reservation);
    await refresh();
    setLoading(false);

  };

  const handleRejectReservation = async (reservation) => {
    setLoading(true);
    await handleRejectRev(reservation);
    await refresh();
    setLoading(false);

  };
  return (

    <Container>
      <HeaderAdminPage />
      <Content>
        <MenuAdmin entities={entities}
          handleMenuClick={handleMenuClick}
          handleReservationRequestsClick={handleReservationRequestsClick}
          handleUserAuthorizationClick={handleUserAuthorizationClick}
          handleResourceClick={handleResourceClick}
        />
        <InstancesList>
          <>
            {selectedEntity === 'user-authorization' && (
              <UserAuthorization
                handleSearch={handleSearch}
                handleAdd={handleAddModal}
                pendingUsers={pendingUsers}
                handleAcceptUser={handleAccept}
                handleRejectUser={handleReject}
                loading={loading}
              />
            )}
            {selectedEntity === 'resource' && (
              <ResourceView
                handleSearch={handleSearch}
                handleAdd={handleAddModal}
                resources={resources}
                loading={loading}
              />
            )}
            {selectedEntity === 'reservation-requests' && (
              <div>
                <ReservationRequestsView
                  handleSearch={handleSearch}
                  handleAdd={handleAddModal}
                  reservations={pendingReservations}
                  loading={loading}
                  handleAccept={handleAcceptReservation}
                  handleReject={handleRejectReservation}
                />
              </div>
            )}
            {entities.includes(selectedEntity) && (
              <EntityView
                handleSearch={handleSearch}
                handleAdd={handleAddModal}
                atributes={atributes}
                instances={instances}
                handleAttributeClick={handleAttributeClick}
                handleEdit={handleEditModal}
                handleDelete={handleDelete}
                handleSort={handleSort}
                loading={loading}
              />
            )}
          </>
        </InstancesList>
      </Content>

      <ModalAdd
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
        handleSave={handleSave}
        form={form}
        atributes={atributes}
      />
      <ModalEdit
        handleCancel={handleCancel}
        handleSave={handleSave}
        atributes={atributes}
        currentInstance={currentInstance}
        setCurrentInstance={setCurrentInstance}
        isEditModalVisible={isEditModalVisible}
        form={form}
      />
    </Container>
  );
};
export default AdminPage;
