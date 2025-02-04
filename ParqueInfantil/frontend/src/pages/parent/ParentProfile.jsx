import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPencilAlt } from 'react-icons/fa';

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px;
    background-color: #f0f8ff;
    min-height: 100vh;
`;

const AvatarSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 50px;
`;

const Avatar = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    color: white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: ${props => props.primary ? 'rgb(134, 72, 77)' : 'rgb(150, 143, 143)'};
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    font-size: 16px;
    width: 150px;

    &:hover {
        background-color: ${props => props.primary ? 'rgb(95, 53, 56)' : 'rgb(113, 109, 109)'};
    }
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const InfoItem = styled.div`
    display: flex;
    align-items: left;
    margin-bottom: 10px;
`;

const Label = styled.label`
    font-weight: bold;
    margin-right: 10px;
`;

const Input = styled.input`
    padding: 5px;
    font-size: 16px;
    width: 100%;
    margin-right: 10px;
`;

const TextArea = styled.textarea`
    padding: 5px;
    font-size: 16px;
    width: 100%;
    height: 100px;
    margin-right: 10px;
`;

const EditIcon = styled(FaPencilAlt)`
    cursor: pointer;
`;

/**
 * Componente ParentProfile
 * 
 * Este componente representa el perfil de un padre. Permite visualizar y editar la información del perfil, 
 * incluyendo nombre, nombre de usuario, email, teléfono y biografía. También permite cambiar o eliminar la foto de perfil.
 * 
 * @component
 * @example
 * return (
 *   <ParentProfile />
 * )
 * 
 * @returns {JSX.Element} El componente ParentProfile.
 * 
 * @function
 * @name ParentProfile
 * 
 * @description
 * - Utiliza el hook useState para manejar el estado del perfil y el campo que se está editando.
 * - handleChange: Maneja los cambios en los campos del formulario y actualiza el estado del perfil.
 * - handleEdit: Establece el campo que se está editando.
 * - handleSubmit: Maneja el envío del formulario, actualiza el estado y puede enviar los datos a un servidor.
 * 
 * @typedef {Object} Profile
 * @property {string} name - Nombre del padre.
 * @property {string} username - Nombre de usuario del padre.
 * @property {string} email - Email del padre.
 * @property {string} phone - Teléfono del padre.
 * @property {string} bio - Biografía del padre.
 * @property {string} [avatar] - URL de la foto de perfil del padre.
 * 
 * @typedef {Object} Event
 * @property {Object} target - El elemento objetivo del evento.
 * @property {string} target.name - Nombre del campo del formulario.
 * @property {string} target.value - Valor del campo del formulario.
 */
const ParentProfile = () => {
    const [profile, setProfile] = useState({
        name: 'Juan Pérez',
        username: 'juanperez',
        email: 'juan.perez@example.com',
        phone: '+1234567890',
        bio: 'Padre de dos niños, amante de la naturaleza y las actividades al aire libre.'
    });

    const [editingField, setEditingField] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleEdit = (field) => {
        setEditingField(field);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditingField(null);
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
        console.log('Perfil actualizado:', profile);
    };

    return (
        <ProfileContainer>
            <AvatarSection>
                {profile.avatar ? (
                    <Avatar>
                        <img src={profile.avatar} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                    </Avatar>
                ) : (
                    <Avatar>{profile.name.charAt(0)}</Avatar>
                )}
                <Button primary>Cambiar Foto</Button>
                <Button>Eliminar Foto</Button>
            </AvatarSection>
            <ProfileInfo>
                <form onSubmit={handleSubmit}>
                    <InfoItem>
                        <Label>Nombre:</Label>
                        {editingField === 'name' ? (
                            <Input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                            />
                        ) : (
                            <>
                                <span>{profile.name}</span>
                                <EditIcon onClick={() => handleEdit('name')} />
                            </>
                        )}
                    </InfoItem>
                    <InfoItem>
                        <Label>Nombre de usuario:</Label>
                        {editingField === 'username' ? (
                            <Input
                                type="text"
                                name="username"
                                value={profile.username}
                                onChange={handleChange}
                            />
                        ) : (
                            <>
                                <span>{profile.username}</span>
                                <EditIcon onClick={() => handleEdit('username')} />
                            </>
                        )}
                    </InfoItem>
                    <InfoItem>
                        <Label>Email:</Label>
                        {editingField === 'email' ? (
                            <Input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                            />
                        ) : (
                            <>
                                <span>{profile.email}</span>
                                <EditIcon onClick={() => handleEdit('email')} />
                            </>
                        )}
                    </InfoItem>
                    <InfoItem>
                        <Label>Teléfono:</Label>
                        {editingField === 'phone' ? (
                            <Input
                                type="tel"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                            />
                        ) : (
                            <>
                                <span>{profile.phone}</span>
                                <EditIcon onClick={() => handleEdit('phone')} />
                            </>
                        )}
                    </InfoItem>
                    <InfoItem>
                        <Label>Bio:</Label>
                        {editingField === 'bio' ? (
                            <TextArea
                                name="bio"
                                value={profile.bio}
                                onChange={handleChange}
                            />
                        ) : (
                            <>
                                <span>{profile.bio}</span>
                                <EditIcon onClick={() => handleEdit('bio')} />
                            </>
                        )}
                    </InfoItem>
                    {editingField && <Button type="submit">Guardar</Button>}
                </form>
            </ProfileInfo>
        </ProfileContainer>
    );
};

export default ParentProfile;