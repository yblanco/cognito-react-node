import React from "react";
import { SignIn } from "aws-amplify-react";
import config from "./aws-exports";
import { CustomSignIn } from "./components/CustomSignIn";
import AppWithAuth from "./AppWithAuth";
import { Authenticator } from "aws-amplify-react/dist/Auth";

class App extends React.Component {

  render() {
    return (
      <div>
        <Authenticator hide={[SignIn]} amplifyConfig={config}>
          <CustomSignIn />
          <AppWithAuth />
        </Authenticator>
      </div>
    );
  }
}

export default App;
