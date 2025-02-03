
import Modal from "react-modal";
import { FaRegCalendarAlt,
  FaRegCommentDots,
  FaTimes,FaHome 
} from "react-icons/fa";
import styled from "styled-components";
import Link from "antd/es/typography/Link";





const Button = styled.button`
  background: rgb(196, 120, 49);
  border: none;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  margin: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  position: relative;
  &:hover {
    background: #rgba(196, 132, 49, 0.77);
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
  img {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;


/**
 * Componente ActivityModal
 * 
 * Este componente representa un modal que muestra los detalles de una actividad.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto.
 * @param {Function} props.closeModal - Función para cerrar el modal.
 * @param {Object} props.activity - Objeto que contiene los detalles de la actividad.
 * @param {Function} props.openReserveModal - Función para abrir el modal de reserva.
 * @param {Function} props.openCommentModal - Función para abrir el modal de comentarios.
 * @param {string} props.rol - Rol del usuario (padre, educador, admin).
 * @param {string} props.time - Estado temporal de la actividad (Realizadas, En curso, Programadas).
 * 
 * @returns {JSX.Element} El componente ActivityModal.
 */
const ActivityModal = ({ isOpen, closeModal, activity, openReserveModal, openCommentModal, rol, time }) => {
    

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString(undefined, options);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<span key={i} className={i < rating ? "star filled" : "star"}>★</span>);
        }
        return stars;
    };

    const renderButtons = () => {
        if (rol === 'padre') {
            if (time === 'Realizadas' || time === 'En curso') {
                return <Button onClick={openCommentModal} title="Comentar"><FaRegCommentDots /></Button>;
            } else if (time === 'Programadas') {
                return <Button onClick={openReserveModal} title="Reservar"><FaRegCalendarAlt /></Button>;
            }
        } else if (rol === 'educador' || rol === 'admin') {
            if (time === 'Realizadas' || time === 'En curso') {
                return <Button onClick={openCommentModal} title="Comentar"><FaRegCommentDots /></Button>;
            }
        } else {
            return (
                <div>
                   <Link to="/"><FaHome /></Link>
                    <p>Para más opciones ingrese al sistema</p>
                </div>
            );
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Activity Details">
            <ModalContent>
                <h2>{activity.nombre}</h2>
                <img src={activity.image} alt={activity.nombre} className="modal-image" />
                <p><strong>Fecha:</strong> {formatDate(activity.fecha_hora)}</p>
                <p><strong>Hora:</strong> {formatTime(activity.fecha_hora)}</p>
                <p><strong>Descripción:</strong> {activity.descripcion}</p>
                <p><strong>Educador:</strong> {activity.educador}</p>
                <p><strong>Instalación:</strong> {activity.instalacion}</p>
                <p><strong>Duración:</strong> {activity.duracion}</p>
                <p><strong>Puntuación:</strong> {renderStars(activity.puntuacion)}</p>
                {renderButtons()}
                <Button onClick={closeModal} title="Cerrar"><FaTimes /></Button>
            </ModalContent>
        </Modal>
    );
};

export default ActivityModal;
