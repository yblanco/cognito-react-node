import React from 'react';
import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import config from "./aws-exports";

Amplify.configure(config);


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Esta es una página
      </header>
    </div>
  );
}

export default withAuthenticator(App, true);
