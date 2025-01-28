import React from 'react';
import styled from 'styled-components';

import SearchHeaderAdmin from './SearchHeaderAdmin';
import Table from './Table';

const EntityView = ({ handleSearch, handleAdd, atributes, instances,
    handleAttributeClick, handleEdit, handleDelete }) => {
    return (
        <>
            <SearchHeaderAdmin
                handleSearch={handleSearch}
                handleAdd={handleAdd} />

            <Table
                headers={atributes}
                data={instances}
                onHeaderClick={handleAttributeClick}
                onDeleteClick={handleDelete}
                onEditClick={handleEdit}
            />
        </>

    );
};
export default EntityView;