import React, { useState } from "react";
import styled from "styled-components";
import { FaSort, FaSearch } from "react-icons/fa";
import ActivityContainer from "../../components/ActivityContainer";
import { message, Spin } from "antd";
import { fetchActivities, fetchPage } from "./HandlersAPI";
import MenuCatalogo from "./MenuCatalogo";
import PaginationControls from "../admin/Components/PaginationControls";

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5dc;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;

  input {
    padding: 10px;
    width: 60%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    padding: 10px;
    background-color: hsl(135, 18.2%, 55.9%);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #66a072;
    }

    svg {
      margin-right: 5px;
    }
  }
`;

const SortButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  svg {
    margin-left: 10px;
  }
`;

const Activities = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    padding: 10px;
    margin: 0 5px;
    background-color: rgb(215, 148, 86);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const ActivityCatalog = () => {
  const [loading, setLoading] = useState(false);
  const [rol, setRol] = useState(localStorage.getItem('Role'));
  const [activities, setActivities] = useState([
    // ejemplo
    { id: 1, name: "Activity 1", date: "2023-10-01" },
    { id: 2, name: "Activity 2", date: "2023-10-05" },
    { id: 3, name: "Activity 3", date: "2023-10-03" }
 
  ]);

  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const [kindActivity, setKindActivity] = useState('Programadas');
  

  const handleSearch = () => {};

  const handleSort = () => {};

  const filteredActivities = () => {};

  const handlePage = async (page) => {
    setLoading(true);
    await fetchPage(setActivities, setNext, setPrevious, page);
    setLoading(false);
  };

  const handlerFetching = async (kind) => {
    var ruta = "";
    switch (kind) {
      case 'En curso':
        ruta = "tiemporeal";
        break;
      case 'Programadas':
        ruta = "futura";
        break;
      default:
        ruta = "realizada";
        break;
    }
    await fetchActivities(setActivities, setNext, setPrevious, ruta );
  };

  const handleEnCurso = async () => {
    setLoading(true);
    setKindActivity('En curso');
    await handlerFetching('En curso');
    setLoading(false);
  };

  const handleProgramadas = async () => {
    setLoading(true);
    setKindActivity('Programadas');
    await handlerFetching('Programadas');
    setLoading(false);
  };

  const handleRealizadas = async () => {
    setLoading(true);
    setKindActivity('Realizadas');
    await handlerFetching('Realizadas');
    setLoading(false);
  };

  return (
    <Container>
      <MenuCatalogo
        onEnCursoClick={handleEnCurso}
        onProgramadasClick={handleProgramadas}
        onRealizadasClick={handleRealizadas}
        actual={kindActivity}
      />

      <SearchBar>
        <input
          type="text"
          placeholder="Buscar actividades..."
          onChange={handleSearch}
        />
        <button>
          <FaSearch /> Buscar
        </button>
        <SortButton onClick={handleSort}>
          Ordenar por fecha <FaSort />
        </SortButton>
      </SearchBar>

      {loading ? (
                <Spin size="large" />
            ) : (
      <Activities>
    {activities.map((activity) => (
      <ActivityContainer
        key={activity.id}
        data={activity}
        rol={rol}
        time={kindActivity}
      />
    ))}
      </Activities>
    
    )}

      <PaginationControls
        handlePage={handlePage}
        next={next}
        previous={previous}
      />
    </Container>
  );
};

export default ActivityCatalog;
