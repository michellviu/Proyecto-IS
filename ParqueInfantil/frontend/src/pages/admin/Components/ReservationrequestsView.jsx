import React from 'react';
import styled from 'styled-components';

import SearchHeaderAdmin from './SearchHeaderAdmin';
import { List, Spin, Button } from 'antd';
import { FaTimes, FaCheck } from 'react-icons/fa';
import PaginationControls from './PaginationControls'

const ActionButton = styled(Button)`
    margin: 0 5px;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

/**
 * Componente ReservationRequestsView
 * 
 * Este componente muestra una lista de solicitudes de reserva con opciones para aceptar o rechazar cada solicitud.
 * También incluye un componente de búsqueda y controles de paginación.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} props.handleSearch - Función para manejar la búsqueda.
 * @param {Array} props.reservations - Lista de solicitudes de reserva.
 * @param {boolean} props.loading - Indicador de carga.
 * @param {Function} props.handleAccept - Función para manejar la aceptación de una solicitud.
 * @param {Function} props.handleReject - Función para manejar el rechazo de una solicitud.
 * @param {Function} props.handlePage - Función para manejar el cambio de página.
 * @param {boolean} props.next - Indicador de si hay una página siguiente.
 * @param {boolean} props.previous - Indicador de si hay una página anterior.
 * 
 * @returns {JSX.Element} - El componente ReservationRequestsView.
 */
const ReservationRequestsView = ({ handleSearch, reservations, loading, handleAccept, handleReject, handlePage , next , previous }) => {
  return (
    <div>
      <SearchHeaderAdmin
        handleSearch={handleSearch} />

      {loading ? (
        <Spin size="large" />
      ) : (

        <List
          itemLayout="horizontal"
          dataSource={reservations}
          renderItem={reservation => (
            <List.Item
              actions={[
                <ActionButton icon={<FaCheck />} onClick={() => handleAccept(reservation)} />,
                <ActionButton icon={<FaTimes />} onClick={() => handleReject(reservation)} />
              ]}
            >
              <List.Item.Meta
                title={Object.keys(reservation).map(key => (
                  <span key={key} style={{ display: 'block' }}>
                    <strong>{key}:</strong> {reservation[key]}
                  </span>
                ))}
              />
            </List.Item>
          )}
        />
      )}

      <PaginationControls
        handlePage={handlePage}
        next={next}
        previous={previous}
      />
    </div >
  );
};
export default ReservationRequestsView;