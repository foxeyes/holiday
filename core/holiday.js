/**
 * @license
 * Copyright (c) 2018 Alex Sova (alex.sova@pm.me). All rights reserved.
 * This code may only be used under the BSD style license found at
 * https://github.com/foxeyes/holiday/LICENSE.md
 */

import {HdElement} from './hd-element.js';
import {HdRouter} from './hd-router.js';
import {HdState, HdSubscription} from './hd-state.js';

class Holiday extends HdElement {

  /**
   *
   * @param {Object} scheme
   */
  static applyGlobalStateScheme(scheme) {
    HdState.applyScheme(scheme);
  }

  /**
   *
   * @param {String} statePath
   * @param {Object} routingMap
   * @param {String} propSeparator
   */
  static connectRouter(statePath, routingMap, propSeparator = null) {
    if (propSeparator) {
      HdRouter.setSeparator(propSeparator);
    }
    HdRouter.setRoutingMap(routingMap);
    window.addEventListener('hd-on-route', (e) => {
      HdState.publish(statePath, e['detail']);
    });
    HdRouter.notify();
  }

  get globalState() {
    return HdState;
  }

  get appRouter() {
    return HdRouter;
  }

  constructor() {
    super();

    /**
     * @type {Set<HdSubscription>}
     */
    this.__globalSubscriptions = new Set();
  }

  /**
   *
   * @param  {...any} args - key and value or key-value map object can be provided
   */
  publish(...args) {
    this.globalState.publish(...args);
  }

  /**
   *
   * @param {String} path
   * @param {Function} callback
   * @param {Boolean} silent
   * @returns {HdSubscription}
   */
  subscribe(path, callback, silent = false) {
    let subscribtion = this.globalState.subscribe(path, callback, silent);
    this.__globalSubscriptions.add(subscribtion);
    return subscribtion;
  }

  /**
   *
   * @param {String} globalPath
   * @param {String} localPath
   * @param {Function} callback
   */
  reflectGlobalProperty(globalPath, localPath, callback = null) {
    this.subscribe(globalPath, (newValue) => {
      this.setStateProperty(localPath, newValue);
      if (callback) {
        callback(newValue);
      }
    });
  }

  /**
   *
   * @param {String} globalPath
   */
  readGlobalProperty(globalPath) {
    return this.globalState.read(globalPath);
  }

  disconnectedCallback() {
    this.__globalSubscriptions.forEach((subscription) => {
      subscription.remove();
      subscription.callback = null;
      this.__globalSubscriptions.delete(subscription);
    });
  }

}

export {HdElement, HdRouter, HdState, Holiday};
