import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { message, Spin } from "antd";

import { handleLogOut } from "../admin/HandlersRequests";
import { fetchResponsibleActivities, fetchProfileData } from "./HandlersAPI";

import Menu from "./Componentes/Menu";


const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
    width: 80%;
    background-color: #f5f5dc; /* beige */
    display: flex;
`;

const EducatorPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("Role") === "educador"
  );
  if (!isAuthenticated) {
    return <AlertPage />;
  }
  const [activities, setActivities] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Actividades");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResponsibleActivities(setActivities);
  });

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

  const handleStatsClick = async () => {
    setLoading(true);
    setSelectedMenu("Estadísticas");
    //  await fetchStats();
    setLoading(false);
  };

  return (
    <Container>
      <Menu
        handleActivitiesClick={handleActivitiesClick}
        handlePerfilClick={handlePerfilClick}
        handleLogOutClick={handleLogOut}
        handleStatsClick={handleStatsClick}
        selectedMenu={selectedMenu}
      />
      <Content>
        {selectedMenu === "Actividades" && <></>}

        {selectedMenu === "Perfil" && <></>}

        {selectedMenu === "Estadísticas " && <></>}

        {selectedMenu === "Catálogo" && <></>}
      </Content>
    </Container>
  );
};

export default EducatorPage;
