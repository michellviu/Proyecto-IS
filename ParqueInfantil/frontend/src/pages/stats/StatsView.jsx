import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Layout, Spin } from 'antd';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, AreaChartOutlined, DotChartOutlined, RadarChartOutlined } from '@ant-design/icons';
import { FaFileExport } from 'react-icons/fa';
import { handleExport, fetchImageRoute } from './HandlersAPI';
import { Table } from 'antd';

const { Header, Content } = Layout;

const StyledLayout = styled(Layout)`
    height: 100vh;
`;

const StyledHeader = styled(Header)`
    background: #fff;
    display: flex;
    justify-content: center;
`;

const StyledContent = styled(Content)`
    padding: 24px;
    background: #fff;
`;

const ExportButton = styled.button`
    display: flex;
    align-items: center;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }

    svg {
        margin-right: 8px;
    }
`;

/**
 * Componente StatsView
 * 
 * Este componente muestra una vista de estadísticas con un menú para seleccionar diferentes tipos de gráficos y un botón para exportar la información.
 * 
 * @component
 * @example
 * return (
 *   <StatsView />
 * )
 * 
 * @returns {JSX.Element} La vista de estadísticas.
 * 
 * @description
 * - Utiliza el estado local para manejar el menú seleccionado, el estado de carga y la fuente de la imagen.
 * - Muestra un menú horizontal con diferentes opciones de gráficos.
 * - Muestra un spinner de carga mientras se están cargando los datos.
 * - Muestra una imagen con las estadísticas una vez que los datos están cargados.
 * - Incluye un botón para exportar la información.
 * 
 * @function
 * @name handleMenuClick
 * @description Maneja el evento de clic en el menú, actualizando el estado de carga y el menú seleccionado.
 * @param {Object} e - El evento de clic.
 * 
 * @function
 * @name handleExportAPI
 * @description Maneja el evento de clic en el botón de exportar, llamando a la función de exportación y actualizando el estado de carga.
 */
const StatsView = () => {
    const [selectedMenu, setSelectedMenu] = useState('1');
    const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);


    const updateColumns = () => {
       setColumns( data.length > 0 ? Object.keys(data[0]).map(key => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            dataIndex: key,
            key: key,
        })) : []);
    };

    

    const handleMenuClick = async (e) => {
        var ruta = "";
        setLoading(true);
        setSelectedMenu(e.key);
        switch (e.key) {
            case '1':
                ruta ="calificaciones";
                break;
            case '2':
                ruta = "actividades_participantes";
                break;
            case '3':
                ruta = "";
                break;
            case '4':
                ruta = "";
                break;
            case '5':
                ruta = "uso_recursos";
                break;
            default:
                ruta = "reservaciones_aceptadas";
                break;
        }
        await fetchImageRoute(ruta, setData, setImageSrc);
        updateColumns();
        setLoading(false);
    };

    const handleExportAPI = async () => {
        setLoading(true);
        await  handleExport();
        setLoading(false);
    };

    return (
        <StyledLayout>
            <StyledHeader>
                <Menu
                    mode="horizontal"
                    selectedKeys={[selectedMenu]}
                    onClick={handleMenuClick}
                >
                    <Menu.Item key="1" icon={<BarChartOutlined />}>
                        Promedio de Calificación
                    </Menu.Item>
                    <Menu.Item key="2" icon={<LineChartOutlined />}>
                        Actividades con Mayor Participación
                    </Menu.Item>
                    <Menu.Item key="3" icon={<PieChartOutlined />}>
                        Total de Reservas
                    </Menu.Item>
                    <Menu.Item key="4" icon={<AreaChartOutlined />}>
                        Disponibilidad de Recursos
                    </Menu.Item>
                    <Menu.Item key="5" icon={<DotChartOutlined />}>
                        Frecuencia de Uso de Recursos
                    </Menu.Item>
                    <Menu.Item key="6" icon={<RadarChartOutlined />}>
                        Tasa de Confirmación de Reserva
                    </Menu.Item>
                </Menu>
            </StyledHeader>

            <StyledContent>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <>
                            {selectedMenu === '1' &&
                                <>
                                <Table columns={columns} dataSource={data} pagination={false} />
                                <img src={`../../../../api/${imageSrc}`} alt="Promedio de Calificación" style={{ width: '100%' }} />
                                </>
                            }
                    
                            {selectedMenu === '2' &&
                                <>
                                    <Table columns={columns} dataSource={data} pagination={false} />
                                <img src={`../../../../api/${imageSrc}`} alt="Actividades con Mayor Participación" style={{ width: '100%' }} />
                                </>
                            }

                            {selectedMenu === '3' &&
                                <>
                                    <Table columns={columns} dataSource={data} pagination={false} />
                                
                                <img src={`../../../../api/${imageSrc}`} alt="Total de Reservas" style={{ width: '100%' }} />
                            </>
                            }
                            {selectedMenu === '4' &&
                                <>
                                    <Table columns={columns} dataSource={data} pagination={false} />

                                <img src={`../../../../api/${imageSrc}`} alt="Disponibilidad de Recursos" style={{ width: '100%' }} />
                            </>
                            }

                            {selectedMenu === '5' &&
                                <>
                                    <Table columns={columns} dataSource={data} pagination={false} />

                                <img src={`../../../../api/${imageSrc}`} alt="Frecuencia de Uso de Recursos" style={{ width: '100%' }} /> 
                            </>
                            }

                            {selectedMenu === '6' &&
                                <>
                                    <Table columns={columns} dataSource={data} pagination={false} />
                                <img src={`../../../../api/${imageSrc}`} alt="Tasa de Confirmación de Reserva" style={{ width: '100%' }} />
                            </>
                            }
                    </>
                )}
                <ExportButton onClick={handleExportAPI}>
                    <FaFileExport />
                    Exportar Información
                </ExportButton>
            </StyledContent>
        </StyledLayout>
    );
};

export default StatsView;