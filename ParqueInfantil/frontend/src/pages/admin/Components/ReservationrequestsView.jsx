import React from 'react';
import styled from 'styled-components';

import SearchHeaderAdmin from './SearchHeaderAdmin';
import { List, Spin } from 'antd';



const ReservationRequestsView = ({handleSearch, reservations, loading}) => {
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
          />)}
            </div >
    );
};
export default ReservationRequestsView;