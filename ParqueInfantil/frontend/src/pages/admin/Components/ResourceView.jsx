import React from 'react';
import styled from 'styled-components';

import SearchHeaderAdmin from './SearchHeaderAdmin';
import { List, Spin } from 'antd';


const ResourceView = ({handleSearch, resources, loading}) => {
    return (
        <div> 
           <SearchHeaderAdmin
              handleSearch={handleSearch}/>
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
            </div >
    );
};
export default ResourceView;