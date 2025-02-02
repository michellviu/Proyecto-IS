import { message } from 'antd';

const fetchResponsibleActivities = async (setActivities) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/responsibleActivities/`, {
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
        setActivities(data);
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