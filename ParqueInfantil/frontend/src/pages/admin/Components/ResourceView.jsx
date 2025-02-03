import React from 'react';
import styled from 'styled-components';

import SearchHeaderAdmin from './SearchHeaderAdmin';
import { List, Spin, Button } from 'antd';
import PaginationControls from './PaginationControls'



/**
 * Componente ResourceView
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.handleSearch - Función para manejar la búsqueda
 * @param {Array} props.resources - Lista de recursos a mostrar
 * @param {boolean} props.loading - Indicador de carga
 * @param {Function} props.previous - Función para manejar la paginación anterior
 * @param {Function} props.next - Función para manejar la paginación siguiente
 * @param {Function} props.handlePage - Función para manejar el cambio de página
 * 
 * @returns {JSX.Element} - Retorna el componente ResourceView
 */
const ResourceView = ({ handleSearch, resources, loading, previous, next , handlePage }) => {
  return (
    <div>
      <SearchHeaderAdmin
        handleSearch={handleSearch} />
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={resources}
          renderItem={resource => (
            <List.Item
            >
              <List.Item.Meta
                title={Object.keys(resource).map(key => (
                  <span key={key} style={{ display: 'block' }}>
                    <strong>{key}:</strong> {resource[key]}
                  </span>
                ))}
              />
            </List.Item>
          )}
        />)}
      <PaginationControls
        handlePage={handlePage}
        next={next}
        previous={previous}
      />
     
    </div >
  );
};
export default ResourceView;