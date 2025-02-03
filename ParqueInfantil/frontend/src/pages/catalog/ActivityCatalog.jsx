import React, { useEffect, useState } from "react";
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

/**
 * Componente ActivityCatalog
 * 
 * Este componente muestra un catálogo de actividades, permitiendo al usuario
 * buscar, ordenar y filtrar actividades en curso, programadas y realizadas.
 * 
 * @component
 * @example
 * return (
 *   <ActivityCatalog />
 * )
 * 
 * @returns {JSX.Element} El componente ActivityCatalog.
 * 
 * @function
 * @name ActivityCatalog
 * 
 * @description
 * - Utiliza varios estados para manejar la carga de datos, el rol del usuario,
 *   las actividades, la paginación y el tipo de actividad.
 * - Incluye funciones para manejar la búsqueda, el ordenamiento, el filtrado
 *   y la paginación de actividades.
 * - Realiza peticiones asíncronas para obtener las actividades según el tipo
 *   seleccionado (en curso, programadas, realizadas).
 * 
 * @property {boolean} loading - Estado que indica si los datos están cargando.
 * @property {string} rol - Rol del usuario obtenido del localStorage.
 * @property {Array} activities - Lista de actividades.
 * @property {string} next - URL de la siguiente página de actividades.
 * @property {string} previous - URL de la página anterior de actividades.
 * @property {string} kindActivity - Tipo de actividad seleccionada.
 * 
 * @function handleSearch - Maneja la búsqueda de actividades.
 * @function handleSort - Maneja el ordenamiento de actividades.
 * @function filteredActivities - Filtra las actividades según ciertos criterios.
 * @function handlePage - Maneja la paginación de actividades.
 * @function handlerFetching - Realiza la petición para obtener actividades según el tipo.
 * @function handleEnCurso - Maneja la selección de actividades en curso.
 * @function handleProgramadas - Maneja la selección de actividades programadas.
 * @function handleRealizadas - Maneja la selección de actividades realizadas.
 * 
 * @requires fetchPage - Función para obtener una página de actividades.
 * @requires fetchActivities - Función para obtener actividades según el tipo.
 * @requires Container - Componente contenedor.
 * @requires MenuCatalogo - Componente del menú de catálogo.
 * @requires SearchBar - Componente de la barra de búsqueda.
 * @requires FaSearch - Icono de búsqueda.
 * @requires FaSort - Icono de ordenamiento.
 * @requires SortButton - Botón de ordenamiento.
 * @requires Spin - Componente de carga.
 * @requires Activities - Componente contenedor de actividades.
 * @requires ActivityContainer - Componente contenedor de una actividad.
 * @requires PaginationControls - Componente de controles de paginación.
 */
const ActivityCatalog = () => {
  const [loading, setLoading] = useState(false);
  const [rol, setRol] = useState(localStorage.getItem('Role'));
  const [activities, setActivities] = useState([]);
  

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
