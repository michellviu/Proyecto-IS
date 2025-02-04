import React from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Spin } from 'antd';

import SearchHeaderAdmin from './SearchHeaderAdmin';
import Table from './Table';
import PaginationControls from './PaginationControls'


/**
 * Componente EntityView
 * 
 * Este componente representa una vista de entidad que incluye funcionalidades de búsqueda, 
 * adición, edición, eliminación, ordenamiento y paginación de instancias de una entidad.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} props.handleSearch - Función para manejar la búsqueda.
 * @param {Function} props.handleAdd - Función para manejar la adición de una nueva instancia.
 * @param {Array} props.atributes - Lista de atributos de la entidad.
 * @param {Array} props.instances - Lista de instancias de la entidad.
 * @param {Function} props.handleAttributeClick - Función para manejar el clic en un atributo.
 * @param {Function} props.handleEdit - Función para manejar la edición de una instancia.
 * @param {Function} props.handleDelete - Función para manejar la eliminación de una instancia.
 * @param {Function} props.handleSort - Función para manejar el ordenamiento de las instancias.
 * @param {Boolean} props.loading - Indica si los datos están cargando.
 * @param {Function} props.handlePage - Función para manejar el cambio de página.
 * @param {Boolean} props.next - Indica si hay una página siguiente.
 * @param {Boolean} props.previous - Indica si hay una página anterior.
 * 
 * @returns {JSX.Element} El componente EntityView.
 */
const EntityView = ({ handleSearch, handleAdd, atributes, instances,
    handleAttributeClick, handleEdit, handleDelete, handleSort, loading,
    handlePage, next , previous}) => {
    return (
        <>
            <SearchHeaderAdmin
                handleSearch={handleSearch} />
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                Agregar
            </Button>
            {loading ? (
                <Spin size="large" />
            ) : (

                <Table
                    headers={atributes}
                    data={instances}
                    onHeaderClick={handleAttributeClick}
                    onDeleteClick={handleDelete}
                    onEditClick={handleEdit}
                    onSortClick={handleSort}
                    />

            )}
            <PaginationControls
                handlePage={handlePage}
                next={next}
                previous={previous}
            />
            
            
        </>


    );
};
export default EntityView;