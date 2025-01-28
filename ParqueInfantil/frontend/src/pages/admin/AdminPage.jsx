import React, { useState, useEffect } from 'react';
import { message, Form } from 'antd';
import styled from 'styled-components';

//Componentes externas
import MenuAdmin from './Components/MenuAdmin';
import HeaderAdminPage from './Components/HeaderAdminPage';
import ModalEdit from './Components/ModalEdit';
import ModalAdd from './Components/ModalAdd';
import UserAuthorization from './Components/UserAuthorization'
import ResourceView from './Components/ResourceView';
import ReservationRequestsView from './Components/ReservationrequestsView';
import EntityView from './Components/EntityView';

//Handlers API
import {
  fetchEntities, fetchAtributes, fetchInstances,
  handleDeleteRequest, fetchSearch, handleEdit, handleAdd,
  fetchPendingUsers, handleAcceptUser, handleRejectUser,
  fetchResourcesInUse,
  fetchPendingReservations
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
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [entities, setEntities] = useState([
    'INSTALACIONES', 'ACTIVIDAD', 'RECURSOS', 'USUARIO', 'PADRE',
    'EDUCADOR', 'ADMINISTRADOR', 'ACTIVIDAD_PROGRAMADA', 'RESERVACIÓN', 'CALIFICACIÓN'
  ]);
  useEffect(() => { fetchEntities(setEntities) }, []);
  
  const [atributes, setAtributes] = useState(['Id', 'Nombre', 'Descripción']);
  const [selectedEntity, setSelectedEntity] = useState([null]);
  const [selectedAttribute, setSelectedAttribute] = useState(atributes[0]);

  const currentBlock = 0;
  const [instances, setInstances] = useState([
    { Id: 1, Nombre: 'Ejemplo 1', Descripción: 'Des 1' },
    { Id: 2, Nombre: 'Ejemplo 2', Descripción: 'Des 2' },
    { Id: 3, Nombre: 'Ejemplo 3', Descripción: 'Des 3' }]);
  const [filteredInstances, setFilteredInstances] = useState([]);
  const [currentInstance, setCurrentInstance] = useState(null);

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
    message.info(`Entidad seleccionada: ${entity}`);
    setSelectedEntity(entity);
    fetchAtributes(selectedEntity, setAtributes);
    fetchInstances(selectedEntity, setInstances, setFilteredInstances, currentBlock);
  };

  const refresh = async () => {
    fetchInstances(selectedEntity, setInstances, setFilteredInstances, currentBlock);
  }

  const handleAttributeClick = async (attribute) => {
    setSelectedAttribute(attribute);
    message.info(`Atributo seleccionado: ${attribute}`);
  };

  const handleSearch = async (e) => {//Chequear que el parametro se pase bien
    fetchSearch(selectedEntity, selectedAttribute, e, setInstances, setFilteredInstances);
  };

  //Metodos CRUD 
  const handleEditModal = async (instance) => {
    setCurrentInstance(instance);
    setIsEditModalVisible(true);
  };

  const handleAddModal = () => {
    setCurrentInstance(null);
    setIsAddModalVisible(true);
  };

  const handleDelete = (instance) => {
    setCurrentInstance(instance);
    handleDeleteRequest(selectedEntity, currentInstance);
    setCurrentInstance(null);
    refresh();
  }

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentInstance(null);
  };

  const handleSave = (values) => {
    if (currentInstance) {
      handleEdit(selectedEntity, values);
    } else {
      handleAdd(selectedEntity, values);
    }
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentInstance(null);
    refresh();
  };

  //Asignación de roles
  const handleUserAuthorizationClick = async () => {
    setSelectedEntity('user-authorization');
    fetchPendingUsers(setPendingUsers);
  };

  //Gestion de Recursos
  const handleResourceClick = () => {
    setSelectedEntity('resource');
    fetchResourcesInUse(setResources);
  };

  //Gestion de Reservas
  const handleReservationRequestsClick = async () => {
    setSelectedEntity('reservation-requests');
    fetchPendingReservations(setPendingReservations);
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
          {selectedEntity === 'user-authorization' && (
            <UserAuthorization
              handleSearch={handleSearch}
              handleAdd={handleAddModal}
              pendingUsers={pendingUsers}
              handleAcceptUser={handleAcceptUser}
              handleRejectUser={handleRejectUser}
            />
          )}
          {selectedEntity === 'resource' && (
            <ResourceView
              handleSearch={handleSearch}
              handleAdd={handleAddModal}
              resources={resources}
            />
          )}
          {selectedEntity === 'reservation-requests' && (
            <div>
              <ReservationRequestsView 
              handleSearch={handleSearch}
              handleAdd={handleAddModal}
              reservations={pendingReservations}
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
            />
          )}
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
