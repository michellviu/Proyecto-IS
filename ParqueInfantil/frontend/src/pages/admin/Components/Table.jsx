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
