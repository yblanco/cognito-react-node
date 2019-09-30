import Home from '../containers/Home';
import NotFound from '../containers/NotFound';

const routeObject = {
  notFound: {
    title: 'Not Found',
    icon: 'broke',
    link: '*',
    component: NotFound,
    menu: false,
  },
  home: {
    title: 'Home',
    icon: 'home',
    link: '/login/:app',
    component: Home,
    menu: false,
  },
};


class routes {
  constructor(routesBase){
    this.routes = {}
    Object.keys(routesBase).forEach((item, key) => {
    const { title, icon, link, component, menu } = routesBase[item];
    this.routes[item] = {
      title: title,
      icon: icon,
      link: link,
      component: component,
      menu: menu,
      id: key,
    };
  });
  }

  getLink(name='home', params= {}){
    let { link } = this.getRoute(name);
    Object.keys(params).forEach((i) => {
      link = link.replace(`:${i}`, params[i]);
    });
    return link;
  }

  getRoutes(notFound=false) {
    return this.getKeys().map(i=>this.getRoute(i))
  }

  getRoute(name='home'){
    const route = this.routes[name];
    if(route === undefined) {
      throw new Error('CF-01');
    }
    return route;
  }

  getNotFoundKey() {
    return Object.keys(this.routes).find(i => {
      const route = this.getRoute(i);
      if(route.link === '*')
        return true;
      return false;
    })

  }

  getNotFound() {
    return this.getRoute(this.getNotFoundKey());
  }

  getKeys(notFound=false){
    return Object.keys(this.routes).filter(i => (notFound || i !== this.getNotFoundKey()));
  }

}
export default new routes(routeObject);
