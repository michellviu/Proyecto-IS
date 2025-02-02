import React from 'react';
import styled from 'styled-components';

import SearchHeaderAdmin from './SearchHeaderAdmin';
import { List, Spin, Button } from 'antd';
import PaginationControls from './PaginationControls'



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