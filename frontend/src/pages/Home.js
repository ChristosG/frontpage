import React, { useContext, useState } from 'react';
import {
  Layout,
  Menu,
  Typography,
  Avatar,
  Button,
  Card,
  Row,
  Col,
  message,
  Drawer,
} from 'antd';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  LogoutOutlined,
  UserOutlined,
  IdcardOutlined,
  MailOutlined,
  GlobalOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Grid } from 'antd';


const { useBreakpoint } = Grid;

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLogout = () => {
    API.post('users/logout/')
      .then(() => {
        setUser(null);
        navigate('/login');
        message.success('Logged out successfully');
      })
      .catch((error) => {
        console.error(error);
        message.error('Logout failed. Please try again.');
      });
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSomething = () => {
    message.success('Clicked!');
  };

  const menuItems = [
    {
      key: 'action_1',
      icon: <GlobalOutlined />,
      label: 'Do something 1',
      onClick: handleSomething,
    },
    {
      key: 'action_2',
      icon: <UserOutlined />,
      label: 'Do something 2',
      onClick: handleSomething,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const isSmallScreen = !screens.sm;

  const avatarColStyle = {
    textAlign: 'center',
    borderRight: isSmallScreen ? 'none' : '1px solid #f0f0f0',
    marginBottom: isSmallScreen ? '20px' : '0',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={styles.header}>
        <div style={styles.logo}>AAK Portal</div>
        {screens.md ? (
          <Menu
            theme="dark"
            mode="horizontal"
            items={menuItems}
            style={styles.menu}
          />
        ) : (
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: '#fff', fontSize: '24px' }} />}
            onClick={showDrawer}
            style={styles.mobileMenuButton}
          />
        )}
      </Header>

      <Drawer
        title="Menu"
        placement="right"
        onClose={onCloseDrawer}
        open={drawerVisible}
      >
        <Menu mode="inline" items={menuItems} />
      </Drawer>

      <Content style={styles.content}>
        <Card style={styles.card}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8} style={avatarColStyle}>
              <Avatar size={120} icon={<UserOutlined />} />
              <Title level={3} style={styles.userName}>
                {user.first_name} {user.last_name}
              </Title>
              <Text type="secondary">
                {user.user_type.replace('_', ' ').toUpperCase()}
              </Text>
            </Col>
            <Col xs={24} sm={16}>
              <Title level={4}>Profile Information</Title>
              <div style={styles.infoItem}>
                <IdcardOutlined style={styles.icon} />
                <Text strong>Username:</Text> <Text>{user.username}</Text>
              </div>
              <div style={styles.infoItem}>
                <MailOutlined style={styles.icon} />
                <Text strong>Email:</Text> <Text>{user.email}</Text>
              </div>
              <div style={styles.infoItem}>
                <GlobalOutlined style={styles.icon} />
                <Text strong>Country:</Text> <Text>{user.country}</Text>
              </div>
            </Col>
          </Row>
        </Card>
      </Content>
      <Footer style={styles.footer}>
        © {new Date().getFullYear()} AAK Portal. All rights reserved.
      </Footer>
    </Layout>
  );
};

const styles = {
  header: {
    backgroundColor: '#001529',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '64px',
    marginRight: 'auto',
  },
  menu: {
    lineHeight: '64px',
  },
  mobileMenuButton: {
    marginLeft: 'auto',
  },
  content: {
    padding: '50px',
    backgroundColor: '#f0f2f5',
  },
  card: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '30px',
  },
  userName: {
    marginTop: '20px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  icon: {
    fontSize: '18px',
    color: '#1890ff',
    marginRight: '10px',
  },
  footer: {
    textAlign: 'center',
  },
};

export default Home;



