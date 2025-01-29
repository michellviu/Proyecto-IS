import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


//Get
const fetchEntities = async (setEntities) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/metadata/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            }
        }
    ); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEntities(data.models);
    } catch (error) {
        console.error('Failed to fetch entities:', error);
        message.error('No se pudieron obtener las entidades, usando valores por defecto.');
    }
};


const fetchAtributes = async (entity, setAtributes) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/atributes/${entity.toLower()}/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAtributes(data);
    } catch (error) {
        console.error('Failed to fetch attributes:', error);
        message.error('No se pudieron obtener los atributos, usando valores por defecto.');
    }
};

const fetchInstances = async (entity, setInstances, setFilteredInstances, blockNumber = 0) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/${entity.toLower()}/?format=json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInstances(data);
        setFilteredInstances(data);
    } catch (error) {
        console.error('Failed to fetch instances:', error);
        message.error('No se pudieron cargar las instancias. Usando ejemplos por defecto.');
    } 
};

//CRUD
const handleDeleteRequest = async (entity, instance) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/${entity.toLower()}/${instance.Id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        message.success('Instancia eliminada');
    } catch (error) {
        console.error('Failed to delete instance:', error);
        message.error('No se pudo eliminar la instancia seleccionada');
    }
};

const fetchSearch = async (entity, attribute, e, setInstances, setFilteredInstances) => {
    const query = e.target.value;// acordarme de que la query la tengo que pasar por json
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/search/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            params: {
                model: entity.toLower(),
                field: attribute.name,
                query: query
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInstances(data);
        setFilteredInstances(data);
    } catch (error) {
        console.error('Failed to search instances:', error);
        message.error('No se pudieron buscar las instancias.');
    }
};

const handleEdit = async (entity, instance) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/${entity.toLower()}/${instance.Id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(instance)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        message.success('Instancia actualizada');
    } catch (error) {
        console.error('Failed to update instance:', error);
        message.error('No se pudo actualizar la instancia');
    }
};

const handleAdd = async (entity, instance) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/${entity.toLower()}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(instance)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        message.success('Instancia agregada');
        fetchInstances(selectedEntity, currentBlock);
    } catch (error) {
        console.error('Failed to add instance:', error);
        message.error('No se pudo agregar la instancia');
    }
};

//Asignacion de roles

const fetchPendingUsers = async (setPendingUsers) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/usuario/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPendingUsers(data);
        message.success('Usuarios pendientes obtenidos exitosamente');
    } catch (error) {
        console.error('Failed to fetch pending users:', error);
        message.error('No se pudieron obtener los usuarios pendientes');
    }
};

const handleAcceptUser = async (user) => {
    try {
      const token = `Bearer ${localStorage.getItem('AuthToken')}`;
      const response = await fetch(`http://127.0.0.1:8000/api/Usuario/${user.Id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      message.success('Usuario aceptado exitosamente');
    } catch (error) {
      console.error('Failed to accept user:', error);
      message.error('No se pudo aceptar al usuario');
    }
};
  
const handleRejectUser = async (user) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/Usuario/${user.Id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        message.success('Usuario rechazado exitosamente');
        handleUserAuthorizationClick();
    } catch (error) {
        console.error('Failed to reject user:', error);
        message.error('No se pudo rechazar al usuario');
    }
};

//Recursos e Instalaciones

const fetchResourcesInUse = async (setResources) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/Resource/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResources(data);
        message.success('Recursos en uso obtenidos exitosamente');
    } catch (error) {
        console.error('Failed to fetch resources in use:', error);
        message.error('No se pudieron obtener los recursos en uso, usando valores por defecto.');
      
    }
};

// Reservas

const fetchPendingReservations = async (setPendingReservations) => {
    try {
        const token = `Bearer ${localStorage.getItem('AuthToken')}`;
        const response = await fetch(`http://127.0.0.1:8000/api/Reservations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPendingReservations(data);
        message.success('Solicitudes de reserva obtenidas exitosamente');
    } catch (error) {
        console.error('Failed to fetch reservation requests:', error);
        message.error('No se pudieron obtener las solicitudes de reserva');
    }

};

const handleLogOut = async () => {
    
    try {
       
        
        // const response = await fetch(`http://127.0.0.1:8000/logout/${user.Id}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        localStorage.removeItem('AuthToken'); // Eliminar el token de localStorage
        message.success('Sesión cerrada exitosamente');    
        
    } catch (error) {
        console.error('Failed to log out:', error);
        message.error('No se pudo cerrar la sesión');
      
    }
};



export {
    fetchEntities, fetchAtributes, fetchInstances, // Metodos Get
    handleDeleteRequest, fetchSearch, handleEdit, handleAdd, // Metodos Crud
    fetchPendingUsers, handleAcceptUser, handleRejectUser, // Metodos Asignacion de Rol
    fetchResourcesInUse, // Metodos de Gestion de Recursos
    fetchPendingReservations, // Metodos de Gestion de Reservas
    handleLogOut
};