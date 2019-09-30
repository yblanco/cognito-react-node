module.exports = {
  environment: {
    env: process.env.NODE_ENV || 'local',
    debug: process.env.DEBUG || true,
    aws: {
      cognito: {
        UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        SecretId: process.env.AWS_COGNITO_SECRET,
        DomainName: process.env.AWS_COGNITO_DOMAIN_NAME,
        jwksUri: process.env.AWS_COGNITO_JWKS,
      }
    }
  }
};
