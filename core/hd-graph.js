/**
 * @license
 * Copyright (c) 2018 Alex Sova (alex.sova@pm.me). All rights reserved.
 * This code may only be used under the BSD style license found at
 * https://github.com/foxeyes/holiday/LICENSE.md
 */

import {UID} from '../utils/uid.js';

export class HdGraphNode {
  constructor(src = {}) {
    this.guid = null;
    this.type = src.type || null;
    this.subType = src.subType || null;
    this.connections = src.connections || [];
    this.value = src.value || Object.create(null);
    this.timestamp = Date.now();
  }
}

export class HdGraph {

  static _print(msg) {
    if (window['hdDevModeEnabled']) {
      console.warn(msg);
    }
  }

  /**
   *
   * @param {HdGraphNode} data
   * @param {string} id
   * @returns {string}
   */
  static create(data, id = null) {
    let guid;
    if (!id) {
      guid = UID.generate();
      while (this.store[guid]) {
        guid = UID.generate();
      }
    } else {
      if (this.store[id]) {
        this._print(`HdGraph: ${id} - already exist`);
        return;
      } else {
        guid = id;
      }
    }
    data.guid = guid;

    this.store[guid] = data;
    return guid;
  }


  /**
   *
   * @param {string} id
   * @returns {HdGraphNode}
   */
  static read(id) {
    return this.store[id];
  }

  /**
   *
   * @param {string} id
   * @param {any} data
   * @param {any} dispatcher
   */
  static update(id, data, dispatcher = null) {
    let node = this.read(id);
    if (!node) {
      this._print('HdGraph: unable to update node: ' + id);
      return;
    }
    node.timestamp = Date.now();
    Object.assign(node.value, data);
    node.connections.forEach((guid) => {
      let connection = this.read(guid);
      if (connection.value !== dispatcher) {
        connection.value.update && connection.value.update(data);
      }
    });
  }

  /**
   *
   * @param {string} id
   * @param {string} propertyName
   * @param {any} propertyValue
   * @param {any} dispatcher
   */
  static setProperty(id, propertyName, propertyValue, dispatcher = null) {
    let node = this.read(id);
    if (!node) {
      this._print('HdGraph: unable to update node: ' + id);
      return;
    }
    node.timestamp = Date.now();
    node.value[propertyName] = propertyValue;
    node.connections.forEach((guid) => {
      let connection = this.read(guid);
      if (connection.value !== dispatcher) {
        let callbackName = propertyName + 'Changed';
        connection.value[callbackName] && connection.value[callbackName](propertyValue);
      }
    });
  }

  /**
   *
   * @param {string} id
   */
  static delete(id) {
    let node = this.read(id);
    node.connections.forEach((con) => {
      this.disconnect(con.guid, id);
    });
    delete this.store[id];
  }

  /**
   *
   * @param {string} id
   * @param {string} hardId
   */
  static clone(id, hardId = null) {
    let node = this.read(id);
    if (!node) {
      this._print('HdGraph: unable to clone node: ' + id);
      return;
    }
    node.timestamp = Date.now();
    let newId = this.create(node, hardId);
    return newId;
  }

  /**
   *
   * @param {string} id
   * @param {string} conId
   */
  static connect(id, conId) {
    let node = this.read(id);
    let conNode = this.read(conId);
    if (node && conNode) {
      let concatArr = [...node.connections, conId];
      let uniqsSet = new Set(concatArr);
      node.connections = [...uniqsSet];
      conNode.value.update && conNode.value.update(node.value);
    } else {
      this._print(`HdGraph: Could not connect ${id} & ${conId}`);
    }
  }

  /**
   *
   * @param {string} id
   * @param {string} conId
   */
  static connectDuplex(id, conId) {
    let node = this.read(id);
    let conNode = this.read(conId);
    if (node && conNode) {
      let concatArr = [...node.connections, conId];
      let uniqsSet = new Set(concatArr);
      node.connections = [...uniqsSet];

      let conConcatArr = [...conNode.connections, id];
      let conUniqSet = new Set(conConcatArr);
      conNode.connections = [...conUniqSet];
      conNode.value.update && conNode.value.update(node.value);
      node.value.update && node.value.update(conNode.value);
    } else {
      this._print(`GraphStorage: Could not connect ${id} & ${conId}`);
    }
  }

  /**
   *
   * @param {string} nodeId
   * @param {string} connectionId
   */
  static disconnect(nodeId, connectionId) {
    let node = this.read(nodeId);
    if (node) {
      let set = new Set(node.connections);
      set.delete(connectionId);
      node.connections = [...set];
    }
  }

  /**
   * @returns {Array<string>}
   */
  static get keys() {
    return Object.keys(this.store);
  }

  /**
   *
   * @param {string} query
   * @param {string} fieldName
   * @returns {Array<string>}
   */
  static find(query, fieldName = null) {
    let result = [];
    this.keys.forEach((id) => {
      let str = '';
      let node = this.read(id);
      if (fieldName && node.value[fieldName]) {
        str = JSON.stringify(node.value[fieldName]);
      } else if (node.type !== 'html-element') {
        str = JSON.stringify(node.value);
      }
      if (str.includes(query)) {
        result.push(id);
      }
    });
    return result;
  }

  /**
   *
   * @param {string} type
   * @param {string} query
   * @param {string} fieldName
   * @returns {Array<string>}
   */
  static findInType(type, query, fieldName = null) {
    let result = [];
    let byTypeIdArr = this.getByType(type);
    byTypeIdArr.forEach((id) => {
      let str = '';
      let node = this.read(id);
      if (fieldName && node.value[fieldName]) {
        str = JSON.stringify(node.value[fieldName]);
      } else if (type === 'html-element') {
        let cleanObj = {};
        for (let prop in node.value) {
          if (typeof node.value[prop] === 'string') {
            cleanObj[prop] = node.value[prop];
          }
        }
        str = JSON.stringify(cleanObj);
      } else {
        str = JSON.stringify(node.value);
      }
      if (str.includes(query)) {
        result.push(id);
      }
    });
    return result;
  }

  /**
   *
   * @param {string} id
   * @returns {Object}
   */
  static getConnectionsByType(id) {
    let node = this.read(id);
    let result = Object.create(null);
    node.connections.forEach((guid) => {
      let connectedNode = this.read(guid);
      if (result[connectedNode.type]) {
        result[connectedNode.type].push(guid);
      } else {
        result[connectedNode.type] = [guid];
      }
    });
    return result;
  }

  /**
   *
   * @param {string} id
   * @returns {Object}
   */
  static getConnectionsBySubType(id) {
    let node = this.read(id);
    let result = Object.create(null);
    node.connections.forEach((guid) => {
      let connectedNode = this.read(guid);
      if (connectedNode.subType) {
        if (result[connectedNode.subType]) {
          result[connectedNode.subType].push(guid);
        } else {
          result[connectedNode.subType] = [guid];
        }
      }
    });
    return result;
  }

  /**
   *
   * @param {string} type
   * @returns {Array<string>}
   */
  static getByType(type) {
    let result = [];
    this.keys.forEach((id) => {
      if (this.read(id).type === type) {
        result.push(id);
      }
    });
    return result;
  }

  /**
   *
   * @param {string} subType
   * @returns {Array<string>}
   */
  static getBySubType(subType) {
    let result = [];
    this.keys.forEach((id) => {
      if (this.read(id).subType === subType) {
        result.push(id);
      }
    });
    return result;
  }

  /**
   *
   * @param {String} type
   */
  static removeNodesByType(type) {
    let typeArr = this.getByType(type);
    typeArr.forEach((id) => {
      let connections = this.read(id).connections;
      connections.forEach((connectionId) => {
        this.disconnect(connectionId, id);
      });
      delete this.store[id];
    });
  }

  /**
   *
   * @param {String} subType
   */
  static removeNodesBySubType(subType) {
    let subTypeArr = this.getBySubType(subType);
    subTypeArr.forEach((id) => {
      let connections = this.read(id).connections;
      connections.forEach((connectionId) => {
        this.disconnect(connectionId, id);
      });
      delete this.store[id];
    });
  }

  static clearStore() {
    this.store = Object.create(null);
  }

}

HdGraph.store = Object.create(null);

