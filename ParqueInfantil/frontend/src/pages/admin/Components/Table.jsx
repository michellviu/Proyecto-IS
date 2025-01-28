import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// considerar table de antd 
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

const Table = ({ headers, data, onHeaderClick, onDeleteClick, onEditClick }) => {
    return (
        <TableContainer>
            <StyledTable>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <TableHeader key={header}>
                                <Button type="link" onClick={() => onHeaderClick(header)}>
                                    {header}
                                </Button>
                            </TableHeader>
                        ))}
                        <TableHeader>Opciones</TableHeader>
                    </tr>
                </thead>
                <tbody>
<<<<<<< HEAD:ParqueInfantil/frontend/src/pages/admin/Components/Table.jsx
                    {data.map((row) => (
                        <TableRow key={row}>
                            {headers.map((header) => (
                                <TableCell key={header}>{row[header]}</TableCell>
=======
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {headers.map((header, colIndex) => (
                                <TableCell key={colIndex}>{row[header]}</TableCell>
>>>>>>> 4200e5e11fa14df3585cffe74276052b091ceb7c:ParqueInfantil/frontend/src/pages/admin/Table.jsx
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
