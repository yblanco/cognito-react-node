import React from 'react'
import PropTypes from 'prop-types'
import { SignIn, Authenticator } from "aws-amplify-react";

import Authorization from './components/Authorization';
import { validateConfig } from './libs/validator.lib';

const Auth = ({ config, children }) => (
  validateConfig(config) &&
  <Authenticator
    amplifyConfig={config}
  >
    <Authorization>
      {children}
    </Authorization>
  </Authenticator>
)

Auth.propTypes = {
  config: PropTypes.shape({
    aws_project_region: PropTypes.string,
    aws_cognito_region: PropTypes.string.isRequired,
    aws_user_pools_id: PropTypes.string.isRequired,
    aws_user_pools_web_client_id: PropTypes.string.isRequired,
    oauth: PropTypes.shape({}),
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
}

export default Auth;
