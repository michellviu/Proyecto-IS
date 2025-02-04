import { message } from 'antd';

//Get
const fetchEntities = async (setEntities) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/metadata/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        );
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudieron obtener las entidades: ' + data.error);
            throw new Error('Network response was not ok');

        }

        setEntities(data.models);
    } catch (error) {
        console.error('Failed to fetch entities:', error);

    }
};


const fetchAtributes = async (entity, setAtributes) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/atributes/${entity}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudieron obtener los atributos: ' + data.error);
            throw new Error('Network response was not ok');
        }
        setAtributes(data);
    } catch (error) {
        console.error('Failed to fetch attributes:', error);
    }
};

/**
 * Función para obtener instancias de una entidad desde una API.
 *
 * @param {string} entity - Nombre de la entidad a obtener (e.g., 'Padre', 'Educador', 'Administrador').
 * @param {function} setInstances - Función para actualizar el estado de las instancias obtenidas.
 * @param {function} setNextPage - Función para actualizar el estado de la siguiente página.
 * @param {function} setPreviousPage - Función para actualizar el estado de la página anterior.
 *
 * @throws {Error} Si la respuesta de la red no es satisfactoria.
 */
const fetchInstances = async (entity, setInstances, setNextPage, setPreviousPage) => {
    try {
        var ruta = `http://127.0.0.1:8000/api/${entity.toLowerCase()}/`;
        if (entity === 'Padre' || entity === 'Educador') {
            ruta = `http://127.0.0.1:8000/api/usuario/${entity.toLowerCase()}/`;
        }
        else if (entity === 'Administrador') {
            ruta = `http://127.0.0.1:8000/api/usuario/admin/`;
        }
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(ruta, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudieron cargar las instancias: ' + data.error);
            throw new Error('Network response was not ok');
        }   
        setNextPage(data.next);
        setPreviousPage(data.previous);
        setInstances(data.results);
    } catch (error) {
        console.error('Failed to fetch instances:', error);
    }
};


const fetchPage = async (setInstances, setNextPage, setPreviousPage, url ) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudieron cargar las instancias: ' + data.error);
            throw new Error('Network response was not ok');
        }
        setNextPage(data.next);
        setPreviousPage(data.previous);
        setInstances(data.results);
    } catch (error) {
        console.error('Failed to fetch instances:', error);
    }
};

//CRUD
const handleDeleteRequest = async (entity, instance) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/${entity.toLowerCase()}/${instance}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudo eliminar la instancia seleccionada: '+ data.error);
            throw new Error('Network response was not ok');
        }
        message.success('Instancia eliminada');
    } catch (error) {
        console.error('Failed to delete instance:', error);
    }
};

const fetchSearch = async (entity, attribute, e, setInstances, setNextPage, setPreviousPage) => {
    const query = e.target.value;
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const url = new URL('http://127.0.0.1:8000/api/search/');
        const params = {
            model: entity,
            field: attribute.name,
            query: query
        };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudo filtrar: ' + data.error);
            throw new Error('Network response was not ok');
        }
        setNextPage(data.next);
        setPreviousPage(data.previous);
        setInstances(data.results);
    } catch (error) {
        console.error('Failed to search instances:', error);
    }
};

const fetchOrder = async (entity, attribute, order, setInstances, setNextPage, setPreviousPage) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const url = new URL('http://127.0.0.1:8000/api/orderbyproperty/');
        const params = {
            model: entity,
            field: attribute.name,
            criterion: order
        };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudo ordenar: ' + data.error);
            throw new Error('Network response was not ok');
        }
        setNextPage(data.next);
        setPreviousPage(data.previous);
        setInstances(data.results);
    } catch (error) {
        console.error('Failed to order instances:', error);
    }
};

const handleEdit = async (entity, instance, values) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/${entity.toLowerCase()}/${instance}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(values)
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudo editar la instancia: ' + data.error)
            throw new Error('Network response was not ok');
        }
        message.success('Instancia actualizada');
    } catch (error) {
        console.error('Failed to update instance:', error);
    }
};

const handleAdd = async (entity, instance) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/${entity.toLowerCase()}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(instance)
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudo agregar la instancia: ' + data.error)
            throw new Error('Network response was not ok');
        }
        message.success('Instancia agregada');
    } catch (error) {
        console.error('Failed to add instance:', error);
    }
};

//Asignacion de roles

const fetchPendingUsers = async (setPendingUsers, setNextPage , setPreviousPage) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/usuario/noconfirmado/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudieron obtener los usuarios pendientes: ' + data.error);
            throw new Error('Network response was not ok');
        }
        setNextPage(data.next);
        setPreviousPage(data.previous);
        setPendingUsers(data.results);
        message.success('Usuarios pendientes obtenidos exitosamente');
    } catch (error) {
        console.error('Failed to fetch pending users:', error);
    }
};

const handleAcceptUser = async (user) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/usuario/confirmarrol/${user.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudo aceptar al usuario: ' + data.error);
            throw new Error('Network response was not ok');
        }
        message.success('Usuario aceptado exitosamente');
    } catch (error) {
        console.error('Failed to accept user:', error);
    }
};

const handleRejectUser = async (user) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/usuario/${user.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudo rechazar al usuario: ' + data.error);
            throw new Error('Network response was not ok');
        }
        message.success('Usuario rechazado exitosamente');
    } catch (error) {
        console.error('Failed to reject user:', error);

    }
};

//Recursos e Instalaciones

const fetchResourcesInUse = async (setResources, setNextPage ,setPreviousPage) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/recurso/enuso/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudieron obtener los recursos en uso: ' + data.error);
            throw new Error('Network response was not ok');
        }
        setNextPage(data.next);
        setPreviousPage(data.previous);
        setResources(data.results);
        message.success('Recursos en uso obtenidos exitosamente');
    } catch (error) {
        console.error('Failed to fetch resources in use:', error);
    }
};

// Reservas

const fetchPendingReservations = async (setPendingReservations, setNextPage, setPreviousPage) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/reservacion/noconfirmado/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudieron obtener las solicitudes de reserva: ' + data.error);
            throw new Error('Network response was not ok');
        }
        setNextPage(data.next);
        setPreviousPage(data.previous);
        setPendingReservations(data.results);
        message.success('Solicitudes de reserva obtenidas exitosamente');
    } catch (error) {
        console.error('Failed to fetch reservation requests:', error);
    }

};

const handleAcceptRev = async (reservation) => {
    try {
        const updatedReservation = {id: reservation.id,idP:reservation.idP, idAP: reservation.idAP  ,
             fecha_hora: reservation.fecha_hora, num_ninos: reservation.num_ninos ,
             comentarios: reservation.comentarios, 
            estado: 'Confirmado' };
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/reservacion/${reservation.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(updatedReservation)
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudo aceptar la solicitud de reserva: ' + data.error);
            throw new Error('Network response was not ok');
        }
        message.success('Solicitud de reserva aceptada exitosamente');
    } catch (error) {
        console.error('Failed to accept reservation:', error);
    }
};

const handleRejectRev = async (reservation) => {
    try {
        const updatedReservation = {id: reservation.id,idP:reservation.idP, idAP: reservation.idAP  ,
            fecha_hora: reservation.fecha_hora, num_ninos: reservation.num_ninos ,
            comentarios: reservation.comentarios, 
           estado: 'Cancelado' };
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/reservacion/${reservation.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(updatedReservation)
        });
        const data = await response.json();
        if (!response.ok) {
            message.error('No se pudo rechazar la solicitud de reserva: ' + data.error);
            throw new Error('Network response was not ok');
        }
        message.success('Solicitud de reserva rechazada exitosamente');
    } catch (error) {
        console.error('Failed to reject reservation:', error);
    }
};

const handleLogOut = async () => {
    try {
        localStorage.removeItem('Role');
        localStorage.removeItem('AuthToken'); // Eliminar el token de localStorage
        message.success('Sesión cerrada exitosamente');

    } catch (error) {
        console.error('Failed to log out:', error);
        message.error('No se pudo cerrar la sesión');
    }
};
export {
    fetchEntities, fetchAtributes, fetchInstances, fetchPage,  // Metodos Get
    handleDeleteRequest, fetchSearch, fetchOrder, handleEdit, handleAdd, // Metodos Crud
    fetchPendingUsers, handleAcceptUser, handleRejectUser, // Metodos Asignacion de Rol
    fetchResourcesInUse, // Metodos de Gestion de Recursos
    fetchPendingReservations, handleAcceptRev, handleRejectRev, // Metodos de Gestion de Reservas
    handleLogOut // Log Out 
};