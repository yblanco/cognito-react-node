const axios = require('axios');

class RestClient {
  constructor(host, name, config = {}) {
    this.host = host;
    this.data = {};
    this.axios = axios.create({
      baseURL: this.host,
      timeout: 5000,
      ...config,
    });
  }

  setData(data) {
    this.data = data;
  }

  send($route, method = 'get') {
    switch (method) {
      case 'post':
        return this.axios.post($route, this.data)
          .then(this.getData)
      case 'put':
        return this.axios.put($route, this.data)
          .then(this.getData)
      default:
        return this.axios.get($route)
          .then(this.getData)
    }
  }

  getData(response) {
    const { data:res } = response;
    return res;
  }
}

module.exports = RestClient;
