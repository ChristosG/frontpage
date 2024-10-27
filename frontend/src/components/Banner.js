import React, { useState, useEffect } from 'react';
import { Menu, Layout, Dropdown, Input, Button, Switch } from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  ContactsOutlined,
  MenuOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from '../assets/aak.webp'; 
import '../styles/Banner.less'; 

const { Header } = Layout;

const Banner = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [countryCode, setCountryCode] = useState('us'); 
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  const [showSearch, setShowSearch] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const shouldBeVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setVisible(shouldBeVisible);
      setPrevScrollPos(currentScrollPos);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const getCountryCode = () => {
      const language = navigator.language || navigator.userLanguage;
      const country = language.split('-')[1] || 'us';
      setCountryCode(country.toLowerCase());
    };

    const applyDarkModeClass = () => {
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    getCountryCode();
    applyDarkModeClass();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [prevScrollPos, isDarkMode]);

  const handleDarkModeToggle = (checked) => {
    setIsDarkMode(checked);
    localStorage.setItem('darkMode', checked);
  };

  const menuItems = [
    {
      key: 'clients',
      label: 'Our Clients',
      children: [
        { key: 'client1', label: <Link to="/clients/client1">Client 1</Link> },
        { key: 'client2', label: <Link to="/clients/client2">Client 2</Link> },
      ],
    },
    {
      key: 'services',
      label: 'Services',
      children: [
        { key: 'service1', label: <Link to="/services/service1">Service 1</Link> },
        { key: 'service2', label: <Link to="/services/service2">Service 2</Link> },
      ],
    },
    {
      key: 'industries',
      label: <Link to="/industries">Industries</Link>,
    },
    {
      key: 'about',
      label: <Link to="/about">About Us</Link>,
    },
    {
      key: 'swagger',
      label: <Link to="/swagger">Swagger</Link>,
    },
  ];

  const menu = (
    <Menu mode={isMobile ? 'vertical' : 'horizontal'} items={menuItems} />
  );

  return (
    <>
      <Header className={`custom-banner ${visible ? 'visible' : 'hidden'}`}>
        <div className="banner-content">
          <div className="logo">
            <img src={Logo} alt="Company Logo" />
          </div>
          {!isMobile && (
            <>
              <div className="menu">{menu}</div>
              <div className="right-icons">
                <Button
                  icon={<SearchOutlined />}
                  onClick={() => setShowSearch(!showSearch)}
                  className="search-button"
                />
                <img
                  src={`https://flagcdn.com/w40/${countryCode}.png`}
                  alt="Country Flag"
                  className="country-flag"
                />
                <Switch
                  checked={isDarkMode}
                  onChange={handleDarkModeToggle}
                  checkedChildren={<BulbFilled />}
                  unCheckedChildren={<BulbOutlined />}
                  className="dark-mode-switch"
                />
                <Button icon={<UserOutlined />} style={{ marginRight: 10 }}>
                  Profile
                </Button>
                <Button icon={<ContactsOutlined />}>Contact Us</Button>
              </div>
            </>
          )}
          {isMobile && (
            <div className="mobile-icons">
              <Button
                icon={<SearchOutlined />}
                onClick={() => setShowSearch(!showSearch)}
                className="search-button"
              />
              <img
                src={`https://flagcdn.com/w40/${countryCode}.png`}
                alt="Country Flag"
                className="country-flag"
              />
              <Switch
                checked={isDarkMode}
                onChange={handleDarkModeToggle}
                checkedChildren={<BulbFilled />}
                unCheckedChildren={<BulbOutlined />}
                className="dark-mode-switch"
              />
              <Dropdown overlay={menu} trigger={['click']}>
                <Button icon={<MenuOutlined />} />
              </Dropdown>
            </div>
          )}
        </div>
      </Header>
      {showSearch && (
        <div className="search-bar">
          <Input.Search
            placeholder="Search"
            enterButton
            onSearch={(value) => console.log(value)}
          />
        </div>
      )}
    </>
  );
};

export default Banner;
