import { message } from "antd";



const handleReservationRequest = async (request) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/reservacion/porpadre/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(request)
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudo crear la solicitud de reservación: ' + data.error)
            throw new Error('Network response was not ok');
        }
        message.success('Se efectuó exitosamente la solicitud de reservación.');
    } catch (error) {
        console.error('Failed to reserve:', error);
    }
};


const handleCalificationRequest = async (request) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/calificacion/porusuario/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(request)
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudo efectuar la calificación: ' + data.error)
            throw new Error('Network response was not ok');
        }
        message.success('Calificación exitosa.');
    } catch (error) {
        console.error('Failed to add calification:', error);
       
    }
};

export {handleReservationRequest, handleCalificationRequest} 


