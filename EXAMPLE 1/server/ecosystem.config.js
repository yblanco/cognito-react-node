const NODE_ENV = process.env.NODE_ENV || 'local';
const DEBUG = process.env.DEBUG || true;

module.exports = {
  apps: [{
    name: 'cognito-server',
    script: 'bin/www',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: DEBUG,
    max_memory_restart: '10G',
    node_args: ['--max-old-space-size=10240'],
    env: {
      NODE_ENV,
      DEBUG: DEBUG === true ? 'server:server' : false,
      PORT: '8000',
      AWS_COGNITO_USER_POOL_ID: 'us-east-1_8KoRuqoih',
      AWS_COGNITO_CLIENT_ID: '2rvu08r9ci4fob4l43silnr564',
      AWS_COGNITO_SECRET: 'hnko4phaa10tvqcsmoa8ldpi2frr1h7em5q19pqctsh82oqgoi8',
      AWS_COGNITO_DOMAIN_NAME: 'https://spike-tst-bot.auth.us-east-1.amazoncognito.com/',
      AWS_COGNITO_JWKS: 'https://cognito-idp.us-east-1.amazonaws.com/'
    },
  }]
};
