import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Layout, Spin } from 'antd';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, AreaChartOutlined, DotChartOutlined, RadarChartOutlined } from '@ant-design/icons';
import { FaFileExport } from 'react-icons/fa';
import { handleExport, fetchImageRoute } from './HandlersAPI';

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
        await fetchImageRoute(ruta,setImageSrc);
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
                    <img src={`../../../../api/${imageSrc}`} alt="Estadísticas" style={{ width: '100%' }} />
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