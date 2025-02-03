import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Layout, Spin } from 'antd';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, AreaChartOutlined, DotChartOutlined, RadarChartOutlined } from '@ant-design/icons';


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

const StatsView = () => {
    const [selectedMenu, setSelectedMenu] = useState('1');
    const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    

    const handleMenuClick = (e) => {
        setSelectedMenu(e.key);
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
                    <img src={imageSrc} alt="Estadísticas" style={{ width: '100%' }} />
                )}
            </StyledContent>
        </StyledLayout>
    );
};

export default StatsView;