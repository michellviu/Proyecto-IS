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

/**
 * Página de administración para gestionar entidades, usuarios, recursos y reservas.
 * 
 * @component
 * @returns {JSX.Element} Componente de la página de administración.
 * 
 * @description
 * Este componente representa la página de administración donde los administradores pueden gestionar diferentes entidades,
 * usuarios pendientes de autorización, recursos en uso y solicitudes de reserva. Incluye funcionalidades para buscar, ordenar,
 * agregar, editar y eliminar instancias de entidades, así como aceptar o rechazar usuarios y reservas.
 * 
 * @example
 * <AdminPage />
 * 
 * @function
 * @name AdminPage
 * 
 * @returns {JSX.Element} Retorna el componente de la página de administración.
 * 
 * @property {boolean} isAuthenticated - Estado de autenticación del usuario.
 * @property {function} setIsAuthenticated - Función para actualizar el estado de autenticación.
 * @property {object} form - Instancia del formulario.
 * @property {boolean} loading - Estado de carga de las operaciones.
 * @property {function} setLoading - Función para actualizar el estado de carga.
 * @property {Array} entities - Lista de entidades disponibles.
 * @property {function} setEntities - Función para actualizar la lista de entidades.
 * @property {Array} atributes - Lista de atributos de la entidad seleccionada.
 * @property {function} setAtributes - Función para actualizar la lista de atributos.
 * @property {string|null} selectedEntity - Entidad seleccionada actualmente.
 * @property {function} setSelectedEntity - Función para actualizar la entidad seleccionada.
 * @property {object} selectedAttribute - Atributo seleccionado actualmente.
 * @property {function} setSelectedAttribute - Función para actualizar el atributo seleccionado.
 * @property {string|null} nextPage - URL de la siguiente página de resultados.
 * @property {function} setNextPage - Función para actualizar la URL de la siguiente página.
 * @property {string|null} previousPage - URL de la página anterior de resultados.
 * @property {function} setPreviousPage - Función para actualizar la URL de la página anterior.
 * @property {Array} instances - Lista de instancias de la entidad seleccionada.
 * @property {function} setInstances - Función para actualizar la lista de instancias.
 * @property {object|null} currentInstance - Instancia actual seleccionada para editar o eliminar.
 * @property {function} setCurrentInstance - Función para actualizar la instancia actual.
 * @property {number} currentOrder - Orden actual de los resultados (0: ascendente, 1: descendente).
 * @property {function} setCurrentOrder - Función para actualizar el orden de los resultados.
 * @property {boolean} isAddModalVisible - Estado de visibilidad del modal de agregar.
 * @property {function} setIsAddModalVisible - Función para actualizar la visibilidad del modal de agregar.
 * @property {boolean} isEditModalVisible - Estado de visibilidad del modal de edición.
 * @property {function} setIsEditModalVisible - Función para actualizar la visibilidad del modal de edición.
 * 
 * @method handleMenuClick - Maneja la selección de una entidad del menú.
 * @param {string} entity - Entidad seleccionada.
 * 
 * @method handlePage - Maneja la paginación de los resultados.
 * @param {string} url - URL de la página a cargar.
 * 
 * @method refresh - Refresca la lista de instancias de la entidad seleccionada.
 * 
 * @method handleAttributeClick - Maneja la selección de un atributo.
 * @param {object} attribute - Atributo seleccionado.
 * 
 * @method handleSearch - Maneja la búsqueda de instancias.
 * @param {Event} e - Evento de búsqueda.
 * 
 * @method handleSort - Maneja la ordenación de las instancias.
 * @param {object} attribute - Atributo por el cual ordenar.
 * 
 * @method handleEditModal - Abre el modal de edición para una instancia.
 * @param {object} instance - Instancia a editar.
 * 
 * @method handleAddModal - Abre el modal de agregar una nueva instancia.
 * 
 * @method handleDelete - Maneja la eliminación de una instancia.
 * @param {object} instance - Instancia a eliminar.
 * 
 * @method handleCancel - Maneja la cancelación de los modales de agregar y editar.
 * 
 * @method handleSave - Maneja el guardado de una instancia (agregar o editar).
 * @param {object} values - Valores del formulario.
 * 
 * @method handleUserAuthorizationClick - Maneja la selección de la entidad de autorización de usuarios.
 * 
 * @method handleAccept - Maneja la aceptación de un usuario pendiente.
 * @param {object} user - Usuario a aceptar.
 * 
 * @method handleReject - Maneja el rechazo de un usuario pendiente.
 * @param {object} user - Usuario a rechazar.
 * 
 * @method handleResourceClick - Maneja la selección de la entidad de recursos.
 * 
 * @method handleReservationRequestsClick - Maneja la selección de la entidad de solicitudes de reserva.
 * 
 * @method handleAcceptReservation - Maneja la aceptación de una solicitud de reserva.
 * @param {object} reservation - Solicitud de reserva a aceptar.
 * 
 * @method handleRejectReservation - Maneja el rechazo de una solicitud de reserva.
 * @param {object} reservation - Solicitud de reserva a rechazar.
 */
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
