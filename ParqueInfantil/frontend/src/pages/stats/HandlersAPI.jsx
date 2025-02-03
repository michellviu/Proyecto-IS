import { message } from 'antd';

/**
 * Maneja la exportación de datos en formato PDF desde el servidor.
 * 
 * Este método realiza una solicitud GET a la API para obtener un archivo PDF.
 * Utiliza el token de autenticación almacenado en el localStorage para autorizar la solicitud.
 * Si la solicitud es exitosa, se obtiene la respuesta en formato JSON.
 * Si la solicitud falla, se muestra un mensaje de error y se lanza una excepción.
 * 
 * @async
 * @function handleExport
 * @throws {Error} Si la exportación falla.
 */
const handleExport = async () => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/pdf/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudo exportar la información: ' + data.error);
            throw new Error('Failed to export');
        }
    } catch (error) {
        console.error('Failed to export', error);
    }
};

 export {handleExport};