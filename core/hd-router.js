/**
 * @license
 * Copyright (c) 2018 Alex Sova (alex.sova@pm.me). All rights reserved.
 * This code may only be used under the BSD style license found at
 * https://github.com/foxeyes/holiday/LICENSE.md
 */

class HdRouter {

  static _print(msg) {
    if (window['hdDevModeEnabled']) {
      console.warn(msg);
    }
  }

  /**
   * 
   * @param {String} title 
   */
  static setDefaultTitle(title) {
    this.defaultTitle = title;
  }

  /**
   * 
   * @param {Object} map 
   */
  static setRoutingMap(map) {
    Object.assign(this.appMap, map);
    for (let route in this.appMap) {
      if (!this.defaultRoute && this.appMap[route].default === true) {
        this.defaultRoute = route;
      } else if (!this.errorRoute && this.appMap[route].error === true) {
        this.errorRoute = route;
      }
    }
  }

  static readAddressBar() {
    let result = {
      route: null,
      options: {},
    };
    let paramsArr = window.location.search.split(this.separator);
    paramsArr.forEach((part) => {
      if (part.includes('?')) {
        result.route = part.replace('?', '');
      } else if (part.includes('=')) {
        let pair = part.split('=');
        result.options[pair[0]] = decodeURI(pair[1]);
      } else {
        result.options[part] = true;
      }
    });
    return result;
  }

  static notify() {
    let routeBase = this.readAddressBar();
    let routeScheme = this.appMap[routeBase.route];
    if (routeBase.route === null && this.defaultRoute) {
      this.applyRoute(this.defaultRoute);
      return;
    } else if (!routeScheme && this.errorRoute) {
      this.applyRoute(this.errorRoute);
      return;
    } else if (!routeScheme && this.defaultRoute) {
      this.applyRoute(this.defaultRoute);
      return;
    } else if (!routeScheme) {
      this._print(`Route "${routeBase.route}" not found...`);
      return;
    }
    let event = new CustomEvent('hd-on-route', {
      detail: {
        route: routeBase.route,
        options: Object.assign(routeScheme || {}, routeBase.options),
      },
    });
    window.dispatchEvent(event);
  }

  /**
   * 
   * @param {String} route 
   * @param {Object} options 
   */
  static applyRoute(route, options = {}) {
    let routeScheme = this.appMap[route];
    if (!routeScheme) {
      this._print('Wrong route: ' + route);
      return;
    }
    let routeStr = '?' + route;
    for (let prop in options) {
      if (options[prop] === true) {
        routeStr += this.separator + prop;
      } else {
        routeStr += this.separator + prop + '=' + `${options[prop]}`;
      }
    }
    window.history.pushState(null, routeScheme.title || this.defaultTitle || '', routeStr);
    this.notify();
  }

  static setSeparator(char) {
    this._separator = char;
  }

  static get separator() {
    return this._separator || '&';
  }

}

HdRouter.appMap = Object.create(null);

window.onpopstate = () => {
  HdRouter.notify();
};

export { HdRouter };