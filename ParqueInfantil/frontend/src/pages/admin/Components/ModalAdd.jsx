import { Button, Input, Modal, Form } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

/**
 * Componente ModalAdd
 * 
 * Este componente representa un modal para agregar una nueva instancia. 
 * Utiliza un formulario para capturar los datos necesarios y permite guardar o cancelar la operación.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isAddModalVisible - Indica si el modal debe estar visible.
 * @param {Function} props.handleCancel - Función para manejar la cancelación del modal.
 * @param {Object} props.form - Objeto del formulario de Ant Design.
 * @param {Function} props.handleSave - Función para manejar el guardado de los datos del formulario.
 * @param {Array} props.atributes - Lista de atributos que se utilizarán para generar los campos del formulario.
 * 
 * @returns {JSX.Element} El componente ModalAdd.
 */
const ModalAdd = ({ isAddModalVisible, handleCancel, form, handleSave, atributes }) => {
  return (
    <Modal
      title="Agregar Instancia"
      open={isAddModalVisible}
      onCancel={handleCancel}
      footer={null}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} onFinish={(values) => handleSave(values)}>
        {atributes.filter(attr => attr.name !== 'id').map(attribute => (
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
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#689172', borderColor: 'hsl(135, 18.20%, 55.90%)', color: 'white' }} >
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

export default ModalAdd;
