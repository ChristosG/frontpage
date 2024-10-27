import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import '../styles/Footer.less'; 
import FooterImg from '../assets/footerimg.webp'; 

const { Title } = Typography;

const Footer = () => {
  return (
    <div className="footer-section">
      {/* <img src={FooterImg} alt="Footer Image" className="footer-image" /> */}
      <div className="quick-links">
        <div className="quick-links-column">
          <Title level={4}>Our Services</Title>
          <ul>
            <li>
              <Link to="/services/vc">VC</Link>
            </li>
            <li>
              <Link to="/services/institutions">Institutions</Link>
            </li>
          </ul>
        </div>
        <div className="quick-links-column">
          <Title level={4}>Industries</Title>
          <ul>
            <li>
              <Link to="/industries/industry1">Industry 1</Link>
            </li>
            <li>
              <Link to="/industries/industry2">Industry 2</Link>
            </li>
          </ul>
        </div>
        <div className="quick-links-column">
          <Title level={4}>Quick Links</Title>
          <ul>
            <li>
              <Link to="/link1">Link 1</Link>
            </li>
            <li>
              <Link to="/link2">Link 2</Link>
            </li>
            <li>
              <Link to="/link3">Link 3</Link>
            </li>
          </ul>
        </div>
        <div className="quick-links-column">
          <Title level={4}>Social Media</Title>
          <div className="social-icons">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined />
            </a>
          </div>
        </div>
        <div className="quick-links-column">
          <Title level={4}>Contact Us</Title>
          <ul className="contact-info">
            <li>
              <MailOutlined /> Email: info@example.com
            </li>
            <li>
              <PhoneOutlined /> Phone: +123456789
            </li>
            <li>
              <EnvironmentOutlined /> Address: 123 Street, City
            </li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-text">
        <p>Copyright © 2022. AAK. All rights reserved.</p>
        <ul className="footer-links">
          <li>
            <Link to="/terms-of-service">Terms Of Service</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/cookies-policy">Cookies Policy</Link>
          </li>
          <li>
            <Link to="/accessibility-certificate">Accessibility Certificate</Link>
          </li>
          <li>
            <Link to="/california-privacy-policy">California Privacy Policy</Link>
          </li>
        </ul>
        <p>© 2022 AAK Tele-Science</p>
      </div>
    </div>
  );
};

export default Footer;
