import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import esEs from './../../assets/i18n/es_ES.json';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [form] = Form.useForm();

  const handleReset = () => {
    setEmail('');
    form.resetFields();
  };

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    // Aquí iría la lógica de envío
    handleReset();
  };

  const handleSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="forgot-container">
      <h1>{esEs.RE_ESTABLISH_PASSWORD.TITLE}</h1>
      <p>{esEs.RE_ESTABLISH_PASSWORD.CONTENT}</p>
      
      <Form
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
        layout="vertical"
        initialValues={{ email: email }}
      >
        <Form.Item
          name="email"
          rules={[
            { 
              required: true, 
              message: esEs.RE_ESTABLISH_PASSWORD.INPUTS.VALIDATION_EMAIL 
            },
            {
              type: 'email',
              message: 'Por favor ingrese un email válido'
            }
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            name="email"
            onChange={handleInputChange}
            placeholder={esEs.RE_ESTABLISH_PASSWORD.INPUTS.EMAIL}
            value={email}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {esEs.RE_ESTABLISH_PASSWORD.BUTTONS.SEND}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Forgot;