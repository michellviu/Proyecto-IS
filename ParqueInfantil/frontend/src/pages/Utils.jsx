import { useNavigate } from 'react-router-dom';
import {message} from 'antd';

const Redirect = ( role ) => {
    const navigate = useNavigate();
    message.success('entraste al metodo')
    switch (role) {
        case 'admin':
            navigate('/adminPage');
            break;
        case 'educador':
            navigate('/EducatorPage');
            break;
        case 'padre':
            navigate('/ParentPage');
            break;
        default:
            console.error('Invalid role');
    }
};

export default Redirect;