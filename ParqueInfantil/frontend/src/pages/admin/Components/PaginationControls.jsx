import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from 'styled-components';

const PaginationControl = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
`;


const PaginationControls = ({handlePage, next , previous}) => {
    
    return (
        <PaginationControl>
            {previous && (
                <Button type="primary" icon={<LeftOutlined />} onClick={() => handlePage(previous)}>
                    Anterior
                </Button>
            )}
            {next && (
                <Button type="primary" icon={<RightOutlined />} onClick={() => handlePage(next)}>
                    Siguiente
                </Button>
            )}
        </PaginationControl>
    );
};
export default PaginationControls;