const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const jwkToPem = require('jwk-to-pem');
const qs = require('qs');

const RestClient = require('./rest-client.lib');

class awsCognito {
  constructor({ UserPoolId, ClientId, SecretId, DomainName, jwksUri}) {
    this.UserPoolId = UserPoolId
    this.ClientId = ClientId;
    this.SecretId = SecretId;
    this.DomainName = DomainName;
    this.jwksUri = jwksUri;
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: this.ClientId,
        password: this.SecretId,
      }
    }
    this.rest = new RestClient(this.DomainName, 'Aws-Cognito', config);
    this.errors = {
      tryAgain: 'Intente de nuevo, si el problema persiste contacte a soporte.',
      noRetry: 'Contacte a soporte.',
      invalid_request: {
        error: 'Ocurrió un error al hacer la validación.',
        retry: true,
        code: 'AWS-COG-001.1',
      },
      invalid_client: {
        error: 'Ocurrió un error con la autorización.',
        code: 'AWS-COG-001.2',
      },
      invalid_grant: {
        error: 'Está usando un enlace caducado.',
        retry: true,
        code: 'AWS-COG-001.3',
      },
      unauthorized_client: {
        error: 'No tiene permiso para realizar esta acción.',
        code: 'AWS-COG-001.4',
      },
      unsupported_grant_type: {
        error: 'Ocurrió un error, contacte a soporte.',
        code: 'AWS-COG-001.5',
      },
    }
  }

  getToken(code, uri) {
    const data = {
      grant_type: 'authorization_code',
      client_id: this.ClientId,
      redirect_uri: uri,
      code,
    };
    this.rest.setData(qs.stringify(data))
    return this.rest.send('/oauth2/token', 'post')
      .then(this.getDataFromToken.bind(this))
      .catch(err => {
        const { response = {} } = err;
        const { data = {} } = response;
        const { error = false } = data;
        const errorObj = this.errors[error];
        let errorTxt = '';
        if(error === false || errorObj === undefined){
          throw (err);
        } else {
          errorTxt = `${errorObj.error} ${errorObj.retry ? this.errors.tryAgain : this.errors.noRetry} (${errorObj.code})`;
          throw new Error(errorTxt)
        }
      })
  }

  getDataFromToken(token) {
    const {
      id_token: id,
      access_token: access,
      refresh_token: refresh,
      expires_in:expires,
      token_type:type
    } = token;
    const unverifiedId = jwt.decode(id, { complete: true });
    const unverifiedAccess = jwt.decode(access, { complete: true });
    const unverifiedRefresh = jwt.decode(refresh, { complete: true });
    const { kid } = unverifiedId.header;
    return this.getSigningKey(kid)
      .then((jwk) => (jwt.verify(id, jwkToPem(jwk), { algorithms: ['RS256'] })));
  }

  getSigningKey(kid) {
    const jwksUri = `${this.jwksUri}${this.UserPoolId }/.well-known/jwks.json`;
    return new Promise(((resolve, reject) => {
      jwksClient({ cache: true, jwksUri }).getKeys((err, keys) => {
        try{
          if(err){
            throw err;
          }
          resolve(keys.find(k => k.kid === kid));
        }catch(err) {
          reject(err)
        }
      });
    }));
  }
};

module.exports = awsCognito;
