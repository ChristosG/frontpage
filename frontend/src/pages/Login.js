import React, { useContext } from 'react';
import { Form, Input, Button, Typography, Checkbox } from 'antd';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Banner from '../components/Banner';
import '../styles/Login.less';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

const Login = () => {
  const { checkAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { rememberMe, keepLoggedIn, ...credentials } = values;

    API.post('users/login/', { ...credentials, keep_logged_in: keepLoggedIn })
      .then(() => {
        checkAuthStatus();

        if (rememberMe) {
          localStorage.setItem('rememberedUsername', credentials.username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }

        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Banner />
      <div className="page-container">
        <div className="login-container">
          <Title level={2} className="login-title">
            Welcome Back
          </Title>
          <Title className="please-enter" level={5} style={{ marginBottom:'4%', marginTop:'-2%'}}> Please enter your details below. </Title>
          <Form
            name="login_form"
            layout="vertical"
            onFinish={onFinish}
            className="login-form"
            initialValues={{
              rememberMe: localStorage.getItem('rememberedUsername') ? true : false,
              username: localStorage.getItem('rememberedUsername') || '',
            }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item className="checkbox-group">
              <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                <Checkbox>Remember Me</Checkbox>
              </Form.Item>
              <Form.Item name="keepLoggedIn" valuePropName="checked" noStyle>
                <Checkbox className="keep-logged-in-checkbox">Keep Me Logged In</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Log In
              </Button>
            </Form.Item>
          </Form>

          <div className="signup-text">
            <Text className="signup-text-message">Don't have an account? </Text>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
