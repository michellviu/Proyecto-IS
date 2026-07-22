import styled, { css } from 'styled-components';
import { FaBook } from 'react-icons/fa';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

const Catalog = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    justify-content: center;
`;

const ReservationCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    width: 200px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-5px);
    }
`;

const ReservationInfo = styled.div`
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

const StatusText = styled.p`
    color: ${({ status }) => {
        switch (status) {
            case 'Pendiente':
                return 'gray';
            case 'Cancelado':
                return 'red';
            case 'Confirmado':
                return 'green';
            default:
                return 'black';
        }
    }};
`;

const PaginationControls = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
`;

const MyReservationsView = ({ reservations, next, previous, handleNext, handlePrevious, handleCancel }) => {
    const [showInfo, setShowInfo] = useState({});

    const toggleInfo = (id) => {
        setShowInfo((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <>
            <Catalog>
                {reservations.map((reservation) => (
                    <ReservationCard key={reservation.id}>
                        <FaBook size={50} />
                        <ReservationInfo>
                            <h3>{reservation.nombre_actividad}</h3>
                            <StatusText status={reservation.estado}>{reservation.estado}</StatusText>
                            <Button type="primary" onClick={() => handleCancel(reservation.id)}>
                                Cancelar
                            </Button>
                            <Button type="default" onClick={() => toggleInfo(reservation.id)}>
                                Información
                            </Button>
                            {showInfo[reservation.id] && (
                                <>
                                    <p><strong>Fecha y Hora:</strong> {dayjs(reservation.fecha_hora).locale('es').format('DD MMMM YYYY, h:mm A')}</p>
                                    <p><strong>Número de Niños:</strong> {reservation.num_ninos}</p>
                                    <p><strong>Comentarios:</strong> {reservation.comentarios}</p>
                                </>
                            )}
                        </ReservationInfo>
                    </ReservationCard>
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

export default MyReservationsView;