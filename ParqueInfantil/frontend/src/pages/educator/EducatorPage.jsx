import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { message, Spin } from "antd";

import { handleLogOut } from "../admin/HandlersRequests";
import { fetchResponsibleActivities, fetchProfileData } from "./HandlersAPI";

import Menu from "./Componentes/Menu";
import ActivityCatalog from "../catalog/ActivityCatalog"
import MyActivitiesView from "./Componentes/MyActivitiesView"
import StatsView from "../stats/StatsView";
import AlertPage from '../AlertPage';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
    width: 80%;
    background-color: #f5f5dc; /* beige */
    display: flex;
`;

/**
 * Componente EducatorPage.
 * 
 * Este componente representa la página principal para los educadores. 
 * Verifica si el usuario está autenticado como educador y muestra diferentes 
 * vistas basadas en el menú seleccionado.
 * 
 * @component
 * @returns {JSX.Element} La página del educador.
 * 
 * @example
 * return (
 *   <EducatorPage />
 * )
 * 
 * @description
 * - Si el usuario no está autenticado como educador, se muestra la página de alerta.
 * - Contiene varios estados para manejar la autenticación, actividades, datos del perfil, 
 *   menú seleccionado y estado de carga.
 * - Proporciona funciones para manejar los clics en diferentes elementos del menú.
 * - Renderiza diferentes componentes basados en el menú seleccionado.
 * 
 * @state {boolean} isAuthenticated - Indica si el usuario está autenticado como educador.
 * @state {Array} activities - Lista de actividades del educador.
 * @state {string} next - URL para la siguiente página de actividades.
 * @state {string} previous - URL para la página anterior de actividades.
 * @state {Array} profileData - Datos del perfil del educador.
 * @state {string} selectedMenu - Elemento del menú actualmente seleccionado.
 * @state {boolean} loading - Indica si la página está en estado de carga.
 * 
 * @function handleCatalogoClick - Maneja el clic en el menú "Catálogo".
 * @function handleActivitiesClick - Maneja el clic en el menú "Actividades".
 * @function handlePerfilClick - Maneja el clic en el menú "Perfil".
 * @function handleStatsClick - Maneja el clic en el menú "Estadisticas".
 * @function handlePage - Maneja la paginación de actividades.
 */
const EducatorPage = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('Role') === 'educador');
  if (!isAuthenticated){
    return (
      <AlertPage />
    );
  }
  const [activities, setActivities] = useState([]);
  const [next,setNext] = useState("");
  const [previous,setPrevious] = useState("");
  const [profileData, setProfileData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Catálogo");
  const [loading, setLoading] = useState(false);


  const handleCatalogoClick = async () => {
    setLoading(true);
    setSelectedMenu("Catálogo");
    setLoading(false);
  };


  const handleActivitiesClick = async () => {
    setLoading(true);
    setSelectedMenu("Actividades");
    await fetchResponsibleActivities(setActivities,setNext,setPrevious);
    setLoading(false);
  };

  const handlePerfilClick = async () => {
    setLoading(true);
    setSelectedMenu("Perfil");
    await fetchProfileData(setProfileData);
    setLoading(false);
  };

  const handleStatsClick =  async () => {
    setLoading(true);
    setSelectedMenu("Estadisticas");
    await fetchProfileData(setProfileData);
    setLoading(false);
  };

  const handlePage = async () => {
    setLoading(true);
  
    setLoading(false);

  };

  return (
    <Container>
      <Menu
        handleCatalogoClick={handleCatalogoClick}
        handleActivitiesClick={handleActivitiesClick}
        handlePerfilClick={handlePerfilClick}
        handleLogOutClick={handleLogOut}
        handleStatsClick={handleStatsClick}
        selectedMenu={selectedMenu}
        style={{ width: '20%', marginLeft: '0' }}
      />
      <Content>
        {selectedMenu === "Catálogo" && (<ActivityCatalog />)}

        {selectedMenu === "Actividades" && (
          <MyActivitiesView
          next={next}
          previous={previous}
          handleNext={handlePage}
          handlePrevious={handlePage}
          activities={activities}
          />
          
        )}

        {selectedMenu === "Perfil" && <></>}

        {selectedMenu === "Estadisticas" && (<StatsView />  )}
      </Content>
    </Container>
  );
};

export default EducatorPage;
