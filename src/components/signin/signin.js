import React, { useState, useEffect} from 'react';
import { 
  Form,
  Input, 
  Button, 
  Checkbox, 
  Spin, 
  message, 
  Row, 
  Col,
  Card 
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ConfigSite from '../../configSite';
import axios from 'axios';
import esEs from './../../assets/i18n/es_ES.json';
import loginLogo from '../../assets/img/login-logo.png';

const Signin = ({ loading: propLoading, response }) => {
  const [username, setUsername] = useState(''); // Cambiado de name a username
  const [password, setPassword] = useState('');
  const [isRememberChecked, setIsRememberChecked] = useState(false);
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [form] = Form.useForm();

  useEffect(() => {
    const storedRemember = localStorage.getItem('isRemember');
    const storedUsername = localStorage.getItem('username'); 
    const storedPassword = localStorage.getItem('password');

    if (storedRemember !== 'false' && storedUsername !== '' && storedUsername) {
      setIsRememberChecked(true);
      setUsername(storedUsername); 
      setPassword(storedPassword || '');
      
      // Actualizar los valores del formulario
      form.setFieldsValue({
        username: storedUsername, 
        password: storedPassword || '',
        isRememberChecked: true
      });
    }
  }, [form]);

  useEffect(() => {
    if (response) {
      handleServiceResponse(response);
    }
  }, [response]);

  const handleReset = () => {
    setUsername('');
    setPassword('');
    form.resetFields();
  };

  const handleSubmit = (values) => {
    // Guardar en localStorage
    localStorage.setItem('username', values.username);
    localStorage.setItem('password', values.password);
    localStorage.setItem('isRemember', values.isRememberChecked || false);

    // Actualizar estado
    setUsername(values.username); 
    setPassword(values.password);
    setIsRememberChecked(values.isRememberChecked || false);
    
   // onSignin({ username: values.username, password: values.password, isRememberChecked: values.isRememberChecked });
    onSignin(values.username, values.password); 
  };

  const onSignin = async (user, pass) => {
    setLoading(true);
    try {
      const response = await axios.post(`${ConfigSite.SERVICE_URL}/login`, {
        username: user, 
        password: pass
      });
      
      handleServiceResponse(response);
    } catch (error) {
      message.error('Error de conexión');
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'username') { 
      setUsername(value); 
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onChangeRememberMe = (event) => {
    setIsRememberChecked(event.target.checked);
  };

  const redirectMainSiteDev = (response) => {
  const data = response.data;
  // Codificar correctamente los parámetros
  const userEncoded = encodeURIComponent(JSON.stringify(data.user));
  const tokenEncoded = encodeURIComponent(data.authorization.accessToken);
  
  const redirectUrl = `${ConfigSite.APP_URL}/?user=${userEncoded}&accessToken=${tokenEncoded}`;
  console.log('URL de redirección:', redirectUrl);
  
  window.location.href = redirectUrl;
};

const handleServiceResponse = (response) => {
  switch(response.status) {
    case 200:
      setDisplaySpinner(true);
       const data = response.data;
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('accessToken', data.authorization.accessToken);
        }
      setTimeout(() => {
        if (process.env.NODE_ENV !== 'production') {
          redirectMainSiteDev(response);
        } else {
          const userEncoded = encodeURIComponent(JSON.stringify(response.data.user));
          const tokenEncoded = encodeURIComponent(response.data.authorization.accessToken);
          window.location.href = `${ConfigSite.APP_URL}/?user=${userEncoded}&accessToken=${tokenEncoded}`;
        }
      }, 100);
      break;
    case 401:
      message.error('Credenciales inválidas');
      handleReset();
      break;
    default:
      message.error('Error del servidor');
      break;
  }
  setLoading(false);
};

  return (
    <div className="signin-container">
      <Spin size="large" spinning={displaySpinner}>
        <div>
          <Row gutter={[18, 18]}>
            <Col 
              xs={{ span: 24, offset: 0 }} 
              sm={{ span: 24, offset: 0 }} 
              md={{ span: 24, offset: 0 }} 
              lg={{ span: 11, offset: 2 }} 
              xl={{ span: 9, offset: 3 }} 
              xxl={{ span: 9, offset: 3 }} 
              className="container-logo-image"
            >
              <img
                className="logo-image" 
                alt="login logo" 
                src={loginLogo}
              />
              <p>
                Sistema de control y automatización farmacéutico, optimizado para
                el uso y manejo de inventarios, compras, ventas y análisis de 
                datos en tiempo real.
              </p>
            </Col>
            <Col 
              xs={{ span: 24 }} 
              sm={{ span: 24 }} 
              md={{ span: 24 }} 
              lg={{ span: 10 }} 
              xl={{ span: 7 }} 
              xxl={{ span: 7 }}
            >
              <Card title="Ingreso de Usuarios">
                <Form
                  form={form}
                  onFinish={handleSubmit}
                  layout="vertical"
                  className="login-form"
                  initialValues={{
                    username: username, // Cambiado de name a username
                    password: password,
                    isRememberChecked: isRememberChecked
                  }}
                >
                  <Form.Item
                    name="username" // Cambiado de name a username
                    rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
                  >
                    <Input 
                      prefix={<UserOutlined />} 
                      style={{ color: 'rgba(0,0,0,.25)' }} 
                      name="username" // Cambiado de name a username
                      onChange={handleInputChange} 
                      disabled={loading} 
                      placeholder="Usuario"
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                      onChange={handleInputChange} 
                      disabled={loading} 
                      placeholder="Contraseña" 
                      name="password"
                    />
                  </Form.Item>
                  
                  <Form.Item name="isRememberChecked" valuePropName="checked">
                    <Checkbox onChange={onChangeRememberMe}>{esEs.SIGNIN.BUTTONS.REMEMBER_ME}</Checkbox>
                    <Link to="/forgot">
                      <Button type="link">
                        {esEs.SIGNIN.BUTTONS.FORGOT_PASSWORD}
                      </Button>
                    </Link>
                    <Button 
                      type="primary" 
                      loading={loading || propLoading} 
                      htmlType="submit" 
                      className="login-form-button"
                    >
                      {esEs.SIGNIN.BUTTONS.LOGIN}
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default Signin;