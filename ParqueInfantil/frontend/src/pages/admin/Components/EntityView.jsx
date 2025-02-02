import React from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Spin } from 'antd';

import SearchHeaderAdmin from './SearchHeaderAdmin';
import Table from './Table';
import PaginationControls from './PaginationControls'


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