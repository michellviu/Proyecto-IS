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