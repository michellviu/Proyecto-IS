import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FaSort } from 'react-icons/fa'

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    margin: 20px 0;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    background-color: #f4f4f4;
    padding: 10px;
    text-align: center;
    border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

const TableCell = styled.td`
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
`;

const OptionsCell = styled.td`
    display: flex;
    gap: 10px;
`;

/**
 * Componente Table que renderiza una tabla con encabezados y datos proporcionados.
 * 
 * @param {Object[]} headers - Array de objetos que representan los encabezados de la tabla.
 * @param {string} headers[].name - Nombre del encabezado.
 * @param {Object[]} data - Array de objetos que representan las filas de datos de la tabla.
 * @param {Function} onHeaderClick - Función que se ejecuta al hacer clic en un encabezado.
 * @param {Function} onDeleteClick - Función que se ejecuta al hacer clic en el botón de eliminar.
 * @param {Function} onEditClick - Función que se ejecuta al hacer clic en el botón de editar.
 * @param {Function} onSortClick - Función que se ejecuta al hacer clic en el botón de ordenar.
 * 
 * @returns {JSX.Element} El componente Table.
 */
const Table = ({ headers, data, onHeaderClick, onDeleteClick, onEditClick, onSortClick}) => {
    return (
        <TableContainer>
            <StyledTable>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <TableHeader key={header.name}>
                                <Button type="link" onClick={() => onHeaderClick(header)}>
                                    {header.name}
                                </Button>
                                <Button icon={<FaSort />} onClick={() => onSortClick(header)} />
                            </TableHeader>
                        ))}
                        <TableHeader>Opciones</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {headers.map((header) => (
                                <TableCell key={header.name}>{row[header.name]}</TableCell>
                            ))}
                            <OptionsCell style={{ justifyContent: 'center' }}>
                                <Button icon={<EditOutlined />} onClick={() => onEditClick(row)} />
                                <Button icon={<DeleteOutlined />} onClick={() => onDeleteClick(row)} />
                            </OptionsCell>
                        </TableRow>
                    ))}
                </tbody>
            </StyledTable>
        </TableContainer>
    );
};

export default Table;
