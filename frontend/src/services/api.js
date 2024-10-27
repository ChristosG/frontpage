import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: 'https://finsmart.duckdns.org/api/', //,process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

API.interceptors.request.use((
  config) => {
    const csrfToken = Cookies.get('csrftoken');
    //console.log('CSRF from Cookies:', csrfToken);
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


API.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response) {
      console.error('Backend returned status code', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
