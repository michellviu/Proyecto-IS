import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from 'styled-components';

const PaginationControl = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
`;


/**
 * Componente de controles de paginación.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.handlePage - Función para manejar el cambio de página.
 * @param {string} [props.next] - Identificador de la página siguiente.
 * @param {string} [props.previous] - Identificador de la página anterior.
 * 
 * @returns {JSX.Element} Elemento JSX que representa los controles de paginación.
 */
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