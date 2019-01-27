/**
 * @license
 * Copyright (c) 2018 Alex Sova (alex.sova@pm.me). All rights reserved.
 * This code may only be used under the BSD style license found at
 * https://github.com/foxeyes/holiday/LICENSE.md
 */

class PropDescriptor {
  constructor(src) {
    /**
     * @type {Function}
     */
    this.type = src.type || null;

    /**
     * @type { any }
     */
    this.value = src.value || null;

    /**
     * @type { Boolean }
     */
    this.cache = src.cache || false;
  }
}

class HdState {

  /**
   *
   * @param  {...any} args - key and value or key-value map object can be provided
   */
  static publish(...args) {
    let path, value;
    if (args.length === 1 && typeof args[ 0 ] === 'object') {
      let map = args[ 0 ];
      for (let key in map) {
        this.publish(key, map[ key ]);
      }
      return;
    } else if (args.length === 2 && typeof args[ 0 ] === 'string') {
      path = args[ 0 ];
      value = args[ 1 ];
    } else {
      console.warn('(HdState) Wrong properties: ' + args);
    }

    if (this.read(path) === value) {
      return;
    }
    let desc = this._getPropDesc(path);
    if (!desc) {
      return;
    }
    if (!(value.constructor === desc.type)) {
      console.warn('(HdState) Wrong value type for path: ' + path);
      return;
    }
    HdState.store[ path ] = value;
    if (HdState.subscriptionsMap[ path ]) {
      HdState.subscriptionsMap[ path ].forEach((handler, idx) => {
        if (handler) {
          handler(value);
        } else {
          HdState.subscriptionsMap[ path ].splice(idx, 1);
          if (!HdState.subscriptionsMap[ path ].length) {
            delete HdState.subscriptionsMap[ path ];
          }
        }
      });
    }
    if (desc.cache) {
      let cachedStr = window.localStorage.getItem('hd-cache');
      let cacheObj;
      if (!cachedStr) {
        cacheObj = {};
      } else {
        cacheObj = JSON.parse(window.atob(cachedStr));
      }
      cacheObj[ path ] = value;
      cachedStr = window.btoa(JSON.stringify(cacheObj));
      window.localStorage.setItem('hd-cache', cachedStr);
    }
  }

  /**
   * 
   * @param {String} path 
   */
  static read(path) {
    let desc = this._getPropDesc(path);
    if (desc) {
      return HdState.store[ path ] !== undefined ? HdState.store[ path ] : desc.value;
    } else {
      console.warn('(HdState) Wrong state path: ' + path);
    }
  }

  /**
   * 
   * @param {String} path 
   * @param {Function} handler 
   */
  static subscribe(path, handler) {
    let desc = this._getPropDesc(path);
    if (!desc) {
      return;
    }
    if (!this.subscriptionsMap[ path ]) {
      this.subscriptionsMap[ path ] = [];
    }
    HdState.subscriptionsMap[ path ].push(handler);
    if (this.read(path) !== null) {
      handler(this.read(path));
    }
  }

  /**
   * 
   * @param {any} hdEl
   * @param {String} localPath 
   * @param {String} globalPath 
   */
  static syncProps(hdEl, localPath, globalPath) {
    hdEl.setStateProperty(localPath, this.read(globalPath));
    this.subscribe(globalPath, () => {
      hdEl.setStateProperty(localPath, this.read(globalPath));
    });
  }

  /**
   * 
   * @param {any} scheme 
   */
  static applyScheme(scheme) {
    Object.assign(this.scheme, scheme);
    this._restoreCached();
  }

  static getCurrentScheme() {
    return this.scheme;
  }

  /**
   * 
   * @param {String} path 
   * @returns {PropDescriptor}
   */
  static _getPropDesc(path) {
    let steps = path.split('.');
    let result = this.scheme;
    steps.forEach((stepName) => {
      if (typeof result === 'object') {
        result = result[ stepName ];
      }
    });
    if (result && result.type) {
      return new PropDescriptor({
        type: result.type,
        value: result.value,
        cache: result.cache,
      });
    } else {
      console.warn('(HdState) Wrong state path: ' + path);
      return null;
    }
  }

  static _restoreCached() {
    let cachedStr = window.localStorage.getItem('hd-cache');
    if (cachedStr) {
      let cacheObj = JSON.parse(window.atob(cachedStr));
      for (let path in cacheObj) {
        if (this._getPropDesc(path)) {
          this.publish(path, cacheObj[ path ]);
        } else {
          console.warn('(HdState) Wrong path cached: ' + path);
        }
      }
    }
  }

}

HdState.scheme = Object.create(null);
HdState.subscriptionsMap = Object.create(null);
HdState.store = Object.create(null);

export { HdState };