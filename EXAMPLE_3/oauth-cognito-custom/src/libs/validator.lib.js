export const validateConfig = (config) => {
  const expected = {
    aws_cognito_region: 'string',
    aws_user_pools_id: 'string',
    aws_user_pools_web_client_id: 'string',
    oauth: 'object'
  }
  let valid = true;
  let type = '';
  Object.keys(expected).every(key => {
    type = typeof config[key];
    if(type === expected[key]){
      return true;
    } else {
      valid = key;
      return false;
    }
  })
  if(valid !== true){
    throw new Error(`Invalid prop config sent to Auth from oauth-cognito-custom - '${valid}' is '${type}' and '${expected[valid]}' was expected`);
  }
  return valid;
}
