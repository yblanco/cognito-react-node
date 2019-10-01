import React from "react";

class AppWithAuth extends React.Component {

  render() {
    if (this.props.authState === "signedIn") {
      return (
        <div>
          <h1>Internal App</h1>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default AppWithAuth;
