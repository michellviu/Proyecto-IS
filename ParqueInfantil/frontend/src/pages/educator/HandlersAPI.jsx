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
        if (!response.ok) {
            throw new Error('Failed to fetch activities');
        }
        const data = await response.json();
        setActivities(data);
    } catch (error) {
        message.error('Error fetching activities: ' + error.message);
    }
};

export default fetchResponsibleActivities;