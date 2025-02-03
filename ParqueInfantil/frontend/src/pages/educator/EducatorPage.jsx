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
  margin-right: 0;
`;

const EducatorPage = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('Role') === 'educador');
  if (!isAuthenticated){
    return (
      <AlertPage />
    );
  }
  const [activities, setActivities] = useState([]);
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
    await fetchResponsibleActivities(setActivities);
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

  return (
    <Container>
      <Menu
        handleCatalogoClick={handleCatalogoClick}
        handleActivitiesClick={handleActivitiesClick}
        handlePerfilClick={handlePerfilClick}
        handleLogOutClick={handleLogOut}
        handleStatsClick={handleStatsClick}
        selectedMenu={selectedMenu}
      />
      <Content>
        {selectedMenu === "Catálogo" && <ActivityCatalog/>}

        {selectedMenu === "Actividades" && <></>
        
        // <MyActivitiesView
        // handleNext={handlePage}
        // handlePrevious={handle}
        // activities={activities}
        
        // />
        }

        {selectedMenu === "Perfil" && <> </>}

        {selectedMenu === "Estadisticas" && 
        <>
          <StatsView /> 

        </>
        
      
        }


      </Content>
    </Container>
  );
};

export default EducatorPage;
