# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



 import { useState } from 'react';
        import { useEffect } from 'react';

        const [welcomeMessage, setWelcomeMessage] = useState(`Bienvenido ${admin}`);

        useEffect(() => {
          const timer = setTimeout(() => {
            setWelcomeMessage('');
          }, 5000);

          return () => clearTimeout(timer);
        }, [admin]);

        <h2>{welcomeMessage}</h2>


import { BsThreeDots } from 'react-icons/bs';

              const [isDropdownVisible, setIsDropdownVisible] = useState(false);

              const handleDropdownClick = () => {
                setIsDropdownVisible(!isDropdownVisible);
              };

              const handleAttributeClick = (attribute) => {
                message.info(`Selected attribute: ${attribute}`);
                setIsDropdownVisible(false);
              };

              <ListHeader>
                <Search
                  placeholder="Buscar..."
                  onChange={handleSearch}
                  style={{ width: 500 }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                  Agregar
                </Button>
                <Button icon={<BsThreeDots />} onClick={handleDropdownClick} />
                {isDropdownVisible && (
                  <div style={{ position: 'absolute', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 1 }}>
                    {atributes.map(attribute => (
                      <div key={attribute} onClick={() => handleAttributeClick(attribute)} style={{ padding: '10px', cursor: 'pointer' }}>
                        {attribute}
                      </div>
                    ))}
                  </div>
                )}
              </ListHeader>
