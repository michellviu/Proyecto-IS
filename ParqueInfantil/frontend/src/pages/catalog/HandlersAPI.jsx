import { message } from "antd";


/**
 * Función para obtener actividades desde la API.
 *
 * @param {Function} setActivities - Función para actualizar el estado de las actividades.
 * @param {Function} setNext - Función para actualizar el estado del siguiente conjunto de actividades.
 * @param {Function} setPrevious - Función para actualizar el estado del conjunto de actividades anterior.
 * @param {string} ruta - Ruta específica para obtener las actividades.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la operación de fetch se completa.
 * @throws {Error} - Lanza un error si la respuesta de la red no es correcta.
 */
const fetchActivities = async ( setActivities, setNext, setPrevious, ruta ) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/actividad_programada/${ruta}/`,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudieron obtener las actividades: '+ data.error);
            throw new Error('Network response was not ok');
        }
        setActivities(data.results);
        setNext(data.next);
        setPrevious(data.previous);
    } catch (error) {
        
        console.error('Failed to fetch activities:', error);
    }
};


const fetchPage = async ({setActivities, setNext, setPrevious, page }) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(page , {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudieron obtener las actividades: '+ data.error);
            throw new Error('Network response was not ok');
        }
        setActivities(data.results);
        setNext(data.next);
        setPrevious(data.previous);
    } catch (error) {
        console.error('Failed to fetch page:', error);
    }
};
export {fetchActivities, fetchPage};