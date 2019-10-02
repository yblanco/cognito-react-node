import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import AuthWrapper from 'oauth-cognito-custom'
import config from './config.json';

const App = () => {

  const [name, setName] = useState("Cargando Usuario...");
  const [user, setUser] = useState(false);
  const [error, setError] = useState(false);

  const getUser = () => {
    Auth.currentAuthenticatedUser()
    .then(user => {
      const { attributes = {}, username } = user;
      const { name:firstName = false, family_name:lastName = false } = attributes;
      if(firstName === false || lastName === false){
        throw new Error("Name or lastName not found");
      }
      setName(`${firstName} ${lastName}`);
      setUser(username)
    })
    .catch(err => {
      setName("Error Obteniendo el usuario");
      setError(err.toString());
    });
  }


  useEffect(() => {
    getUser();
  }, [])

  return (
    <AuthWrapper config={config}>
      Bienvenido,
      {' '}
      <span
        style={
          error === false
          ? { color: "green" }
          : { color: "red" }
        }
      >
        {name}
        {user !== false && (
          <span style={{ color: "blue" }}>{' '}({user})</span>
        )}
      </span>
      {error !== false && (
        <div>
        <div style={{ color: "grey", fontSize: "0.6em"}}>{error}</div>
        <button onClick={getUser}>Reintentar</button>
        </div>
      )}
    </AuthWrapper>
  )
}

export default App;
