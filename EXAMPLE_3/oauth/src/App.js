import React from 'react';

import AuthWrapper from 'oauth-cognito-custom'

import logo from './logo.svg';
import './App.css';

function App() {

  return (
    <AuthWrapper config={{
      "aws_cognito_region": "us-east-1",
      "aws_user_pools_id": "us-east-1_8KoRuqoih",
      "aws_user_pools_web_client_id": "6mta4gpk3vm7rluq84rr6ji2il",
      "oauth": {}
    }}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </AuthWrapper>
  );
}

export default App;
