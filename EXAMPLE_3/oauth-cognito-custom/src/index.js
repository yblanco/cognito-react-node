import React from 'react'
import PropTypes from 'prop-types'
import {
  Greetings,
  SignIn,
  RequireNewPassword,
  ForgotPassword,
  Loading,
  Authenticator
} from "aws-amplify-react";

import Authorization from './components/Authorization';
import { validateConfig } from './libs/validator.lib';

const AuthWrapper = ({ config, children }) => (
  validateConfig(config) &&
  <Authenticator
    amplifyConfig={config}
    hideDefault={true}
  >
    <Greetings />
    <SignIn />
    <RequireNewPassword />
    <ForgotPassword />
    <Loading />
    <Authorization>
      {children}
    </Authorization>
  </Authenticator>
);

AuthWrapper.propTypes = {
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

export default AuthWrapper;
