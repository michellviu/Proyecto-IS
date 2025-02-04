import { message } from 'antd';

/**
 * Función para obtener las actividades responsables del educador.
 * 
 * Esta función realiza una solicitud GET a la API para obtener las actividades
 * programadas por el educador. Los resultados se almacenan en los estados proporcionados.
 * 
 * @async
 * @function fetchResponsibleActivities
 * @param {Function} setActivities - Función para actualizar el estado de las actividades.
 * @param {Function} setNext - Función para actualizar el estado de la siguiente página de resultados.
 * @param {Function} setPrevious - Función para actualizar el estado de la página anterior de resultados.
 * @throws {Error} Lanza un error si la solicitud falla.
 */
const fetchResponsibleActivities = async (setActivities,setNext,setPrevious) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/actividad_programada/poreducador/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudieron obtener las actividades: ' + data.error);
            throw new Error('Failed to fetch activities');
        }
        setActivities(data.results);
        setNext(data.next);
        setPrevious(data.previous);
    } catch (error) {
        console.error('Failed to fetch activities:', error);
    }
};


const fetchProfileData = async (setProfileData) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/profileData/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudieron obtener los datos del perfil: ' + data.error);
            throw new Error('Failed to fetch activities');
        }
        setActivities(data);
    } catch (error) {
        console.error('Failed to fetch activities:', error);
    }
};

export { fetchResponsibleActivities, fetchProfileData };