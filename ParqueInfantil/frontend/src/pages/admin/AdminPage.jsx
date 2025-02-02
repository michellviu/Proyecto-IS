import React, { useState, useEffect } from 'react';
import { message, Form, Spin } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AlertPage from '../AlertPage';

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
  fetchEntities, fetchAtributes, fetchInstances, fetchPage, 
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

const AdminPage = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('Role') === 'admin');
  if (!isAuthenticated){
    return (
      <AlertPage />
    );
  }

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [entities, setEntities] = useState([]);
  useEffect(() => { fetchEntities(setEntities) }, []);

  //Metadata
  const [atributes, setAtributes] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState([null]);
  const [selectedAttribute, setSelectedAttribute] = useState(atributes[0]);

  //Paginacion
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  //Instancias
  const [instances, setInstances] = useState([]);
  const [currentInstance, setCurrentInstance] = useState(null);

  //Tipo de Orden
  const [currentOrder, setCurrentOrder] = useState(0);

  //Formularios de edición y adición
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  //Metodos GET entidades
  const handleMenuClick = async (entity) => {
    setLoading(true);
    setSelectedEntity(entity);
    message.info(`Entidad seleccionada: ${entity}`);
    await fetchAtributes(entity, setAtributes);
    await fetchInstances(entity, setInstances, setNextPage, setPreviousPage);
    setLoading(false);
  };

  const handlePage = async (url) => {
    setLoading(true);
    await fetchPage(setInstances, setNextPage, setPreviousPage, url);
    setLoading(false); 
  }

  const refresh = async () => {
    setLoading(true);
    if (selectedEntity === 'user-authorization') {
      await fetchPendingUsers(setInstances, setNextPage, setPreviousPage);
    }
    else if (selectedEntity === 'resource') {
      await fetchResourcesInUse(setInstances, setNextPage, setPreviousPage);
    }
    else if (selectedEntity === 'reservation-requests') {
      await fetchPendingReservations(setInstances, setNextPage, setPreviousPage);
    }
    else {
      await fetchInstances(selectedEntity, setInstances, setNextPage, setPreviousPage);
    }
    setLoading(false);
  }

  const handleAttributeClick = async (attribute) => {
    setSelectedAttribute(attribute);
    if (!(attribute.name === selectedAttribute.name)) {
      message.info(`Atributo seleccionado: ${attribute.name}`);
    }
  };

  const handleSearch = async (e) => {
    setLoading(true);
    await fetchSearch(selectedEntity, selectedAttribute, e, setInstances, setNextPage, setPreviousPage);
    setLoading(false);
  };

  const handleSort = async (attribute) => {
    setLoading(true);
    handleAttributeClick(attribute);
    var order = 'asc';//meter operador ternario aqui
    if (currentOrder === 1) {
      order = 'desc';
    }
    await fetchOrder(selectedEntity, attribute, order, setInstances, setNextPage, setPreviousPage);
    setCurrentOrder(1 - currentOrder);
    setLoading(false);
  }

  //Metodos CRUD 
  const handleEditModal = (instance) => {
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
    await fetchPendingUsers(setInstances, setNextPage, setPreviousPage);
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
    await fetchResourcesInUse(setInstances, setNextPage, setPreviousPage);
    setLoading(false);
  };

  //Gestion de Reservas
  const handleReservationRequestsClick = async () => {
    setLoading(true);
    setSelectedEntity('reservation-requests');
    await fetchPendingReservations(setInstances, setNextPage, setPreviousPage);
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
                pendingUsers={instances}
                handleAcceptUser={handleAccept}
                handleRejectUser={handleReject}
                loading={loading}
                handlePage={handlePage}
                previous={previousPage}
                next={nextPage}
              />
            )}
            {selectedEntity === 'resource' && (
              <ResourceView
                handleSearch={handleSearch}
                resources={instances}
                loading={loading}
                handlePage={handlePage}
                previous={previousPage}
                next={nextPage}
              />
            )}
            {selectedEntity === 'reservation-requests' && (
              <div>
                <ReservationRequestsView
                  handleSearch={handleSearch}
                  reservations={instances}
                  loading={loading}
                  handleAccept={handleAcceptReservation}
                  handleReject={handleRejectReservation}
                  handlePage={handlePage}
                  next={nextPage}
                  previous={previousPage}
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
                handlePage={handlePage}
                next={nextPage}
                previous={previousPage}
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
