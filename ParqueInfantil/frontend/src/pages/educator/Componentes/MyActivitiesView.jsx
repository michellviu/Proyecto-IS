
import styled, { css } from 'styled-components';
import { FaBook } from 'react-icons/fa';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const Catalog = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    justify-content: center;
`;

const ActivityCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    width: 200px;
    text-align: center;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2ba475f (feat: Add educator profile and statistics views with pagination controls)
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-5px);
    }
<<<<<<< HEAD
=======
>>>>>>> b36630d (Minor changes)
=======
>>>>>>> 2ba475f (feat: Add educator profile and statistics views with pagination controls)
`;

const ActivityInfo = styled.div`
    margin-top: 10px;

    h3 {
        margin: 0;
        font-size: 1.2em;
    }

    p {
        margin: 5px 0 0;
        font-size: 0.9em;
        color: #666;
    }
`;

const PaginationControls = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
`;

/**
 * Componente MyActivitiesView
 * 
 * Este componente muestra una lista de actividades en forma de tarjetas y controles de paginación.
 * 
 * @param {Object[]} activities - Array de objetos que representan las actividades.
 * @param {boolean} next - Indica si hay una página siguiente de actividades.
 * @param {boolean} previous - Indica si hay una página anterior de actividades.
 * @param {Function} handleNext - Función que se ejecuta al hacer clic en el botón "Siguiente".
 * @param {Function} handlePrevious - Función que se ejecuta al hacer clic en el botón "Anterior".
 * 
 * @returns {JSX.Element} - Retorna un componente que muestra las actividades y los controles de paginación.
 */
const MyActivitiesView = ({ activities, next, previous, handleNext, handlePrevious }) => {
    return (
        <>
            <Catalog>
                {activities.map((activity) => (
                    <ActivityCard key={activity.id}>
                        <FaBook size={50} />
                        <ActivityInfo>
                            <h3>{activity.nombre}</h3>
                            <p>{activity.descripcion}</p>
                            {Object.entries(activity).map(([key, value]) => (
                                key !== 'id' && key !== 'nombre' && key !== 'descripcion' && (
                                    <p key={key}><strong>{key}:</strong> {value}</p>
                                )
                            ))}
                        </ActivityInfo>
                    </ActivityCard>
                ))}
            </Catalog>
            <PaginationControls>
                {previous && (
                    <Button type="primary" icon={<LeftOutlined />} onClick={handlePrevious}>
                        Anterior
                    </Button>
                )}
                {next && (
                    <Button type="primary" icon={<RightOutlined />} onClick={handleNext}>
                        Siguiente
                    </Button>
                )}
            </PaginationControls>
        </>
    );
};

export default MyActivitiesView;