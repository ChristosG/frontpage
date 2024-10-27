import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Select, Typography, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import API from '../services/api';
import { countryList } from '../utils/countryList';
import Banner from '../components/Banner';
import '../styles/Signup.less';
import FooterImg from '../assets/footerimg.webp';
import Footer from '../components/Footer';

const { Option } = Select;
const { Title, Text } = Typography;

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    user_type: Yup.string().required('User type is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    country: Yup.string().required('Country is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values) => {
    API.post('users/register/', values)
      .then(() => {
        message.success(
          'Registration successful! Please check your email to verify your account.'
        );
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data) {
          const errorMessages = Object.values(error.response.data).flat();
          errorMessages.forEach((msg) => {
            message.error(msg);
          });
        } else {
          message.error('An error occurred. Please try again.');
        }
      });
  };

  return (
    <>
      <Banner />
      <div className="signup-container">
        <div className="form-section">
          <Title level={2} className="signup-title">
            Register an Account
          </Title>
          <Title className='please-enter' level={5} > Please enter your details below. </Title>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            
            <Form.Item
              label="User Type"
              validateStatus={errors.user_type ? 'error' : ''}
              help={errors.user_type?.message}
            >
              <Controller
                name="user_type"
                control={control}
                render={({ field }) => (
                  <Select {...field} placeholder="Select your user type">
                    <Option value="researcher">Researcher</Option>
                    <Option value="investor">Investor</Option>
                    <Option value="institution_staff">Institution Staff</Option>
                    <Option value="service_provider">Service Provider</Option>
                  </Select>
                )}
              />
            </Form.Item>

            
            <Form.Item
              label="First Name"
              validateStatus={errors.first_name ? 'error' : ''}
              help={errors.first_name?.message}
            >
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => <Input {...field} placeholder="First Name" />}
              />
            </Form.Item>

            
            <Form.Item
              label="Last Name"
              validateStatus={errors.last_name ? 'error' : ''}
              help={errors.last_name?.message}
            >
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Last Name" />}
              />
            </Form.Item>

           
            <Form.Item
              label="Username"
              validateStatus={errors.username ? 'error' : ''}
              help={errors.username?.message}
            >
              <Controller
                name="username"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Username" />}
              />
            </Form.Item>

            
            <Form.Item
              label="Email"
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Email" />}
              />
            </Form.Item>

            
            <Form.Item
              label="Country"
              validateStatus={errors.country ? 'error' : ''}
              help={errors.country?.message}
            >
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select {...field} showSearch placeholder="Select your country">
                    {countryList.map((country) => (
                      <Option key={country.code} value={country.name}>
                        {country.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </Form.Item>

           
            <Form.Item
              label="Password"
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password?.message}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password {...field} placeholder="Password" />
                )}
              />
            </Form.Item>

            
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <div className="login-text">
            <Text className="signup-text-message">Already have an account? </Text>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
        </div>
        <div>
        

        <div className="image-section" >
          <img
            src={FooterImg} 
            alt="Promotional"
            className="promo-image"
            style={{width:'100%', height:'600px'}}
          />
        
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Signup;
