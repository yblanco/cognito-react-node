const SERVER_PROTOCOL = process.env.REACT_APP_HOST_PROTOCOL || 'http';
const SERVER_HOST = process.env.REACT_APP_HOST_SERVER || 'localhost';
const SERVER_PORT = process.env.REACT_APP_PORT_SERVER || '8000';
const SERVER_PREFIX = 'v1';

export default {
  SERVER: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/${SERVER_PREFIX}/`,
  HOME: process.env.REACT_APP_HOME || '/home',
  APPS: {
    appName: 'Aplicación',
  }
};
