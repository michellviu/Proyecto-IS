import { Button, Input, Modal, Form } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

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
        {atributes.filter(attr => attr.name !== 'Id').map(attribute => (
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
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#689172', borderColor: 'hsl(135, 18.20%, 55.90%)', color: 'white' }} onClick={() => form.submit()}>
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
