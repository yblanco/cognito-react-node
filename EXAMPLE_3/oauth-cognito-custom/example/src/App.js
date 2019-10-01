import React from 'react'
import Auth from 'oauth-cognito-custom'
import config from './config.json';

const App = () => (
  <Auth config={config}>
    Bienvenido
  </Auth>
)

export default App;
