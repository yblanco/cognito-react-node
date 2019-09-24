import axios from 'axios';
import constants from '../settings/constants.setting';

class RestClient {
  constructor(prefix = '') {
    this.data = {};
    this.axios = axios.create({
      baseURL: `${constants.SERVER}${prefix}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    });
  }

  send($route, method = 'get') {
    switch (method) {
      case 'post':
        return this.axios.post($route, this.data)
          .then(this.getData)
      default:
        return this.axios.get($route)
          .then(this.getData)
    }
  }

  getData(response) {
    const { data:res } = response;
    const { success, data } = res;
    if(!success){
      throw data;
    }
    return data;
  }
}

export default RestClient;
