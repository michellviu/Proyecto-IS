import { Button, Input, Modal, Form } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

/**
 * Componente ModalEdit
 * 
 * Este componente representa un modal para editar una instancia. 
 * Utiliza un formulario para capturar y guardar los datos de la instancia.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isEditModalVisible - Indica si el modal de edición está visible.
 * @param {Function} props.handleCancel - Función para manejar la cancelación del modal.
 * @param {Function} props.setCurrentInstance - Función para establecer la instancia actual.
 * @param {Object} props.currentInstance - La instancia actual que se está editando.
 * @param {Function} props.handleSave - Función para manejar el guardado de la instancia.
 * @param {Array} props.atributes - Lista de atributos de la instancia.
 * @param {Object} props.form - El formulario de Ant Design utilizado en el modal.
 * 
 * @returns {JSX.Element} El componente ModalEdit.
 */
const ModalEdit = ({ isEditModalVisible, handleCancel, setCurrentInstance, currentInstance, handleSave, atributes, form }) => {
    return (
        <Modal
            title="Editar Instancia"
            open={isEditModalVisible}
            onCancel={() => {
                handleCancel();
                form.resetFields();
            }
            }
            footer={null}
            afterClose={() => {
                form.resetFields();
                setCurrentInstance(null);
            }}
        >
            <Form
                key={currentInstance ? currentInstance.id : 'new'}
                initialValues={currentInstance}
                onFinish={(values) => handleSave(values)}
            >
                {atributes.map(attribute => (
                    <Form.Item
                        key={attribute.name}
                        name={attribute.name}
                        label={attribute.name}
                        rules={[{ required: !attribute.null, message: `Por favor ingrese ${attribute.name.toLowerCase()}` }]}
                    >
                        <Input />
                    </Form.Item>
                ))}
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: '#689172', borderColor: 'hsl(135, 18.20%, 55.90%)', color: 'white' }}>
                        Guardar
                    </Button>
                    <Button onClick={handleCancel} style={{ backgroundColor: '#8d3636', borderColor: 'lightcoral', marginLeft: '10px', color: 'white' }} icon={<CloseOutlined />}>
                        Cancelar
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalEdit;
