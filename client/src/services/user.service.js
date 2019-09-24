import RestClient from '.';

class UserService extends RestClient {
  constructor() {
    super('user');
  }

  getUser() {
    return this.send('/');
  }

  verifyToken(code, app, uri) {
    this.data = { code, app, uri };
    return this.send('/', 'post');
  }

}

export default new UserService();
