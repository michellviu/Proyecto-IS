import React from 'react';
import styled from 'styled-components';

import SearchHeaderAdmin from './SearchHeaderAdmin';
import { List } from 'antd';


const ResourceView = ({handleSearch, resources}) => {
    return (
        <div> 
           <SearchHeaderAdmin
              handleSearch={handleSearch}/>
    
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
              />
            </div >
    );
};
export default ResourceView;