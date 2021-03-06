/**
 * @license
 * Copyright (c) 2018 Alex Sova (alex.sova@pm.me). All rights reserved.
 * This code may only be used under the BSD style license found at
 * https://github.com/foxeyes/holiday/LICENSE.md
 */

const READY_EVENT_NAME = 'hd-idb-store-ready';

class DbInstance {

  _print(msg) {
    if (window['hdDevModeEnabled']) {
      console.warn(msg);
    }
  }

  _notifyWhenReady(event = null) {
    window.dispatchEvent(new CustomEvent(READY_EVENT_NAME, {
      detail: {
        dbName: this.name,
        storeName: this.storeName,
        event: event,
      }
    }));
  }

  /**
   *
   * @param {String} dbName
   * @param {String} storeName
   */
  constructor(dbName, storeName) {
    this.name = dbName;
    this.storeName = storeName;
    this.version = 1;
    this.request = window.indexedDB.open(this.name, this.version);
    this.request.onupgradeneeded = (e) => {
      // @ts-ignore
      this.db = e.target.result;
      this.objStore = this.db.createObjectStore(storeName, {
        keyPath: '_key',
      });
      this.objStore.transaction.oncomplete = (e) => {
        this._notifyWhenReady(e);
      };
    };
    this.request.onsuccess = (e) => {
      // @ts-ignore
      this.db = e.target.result;
      this._notifyWhenReady(e);
    };
    this.request.onerror = (e) => {
      this._print({
        title: 'IDB error in ' + this.name + ': ' + storeName,
        details: e,
      });
    };
    if (window['hdDevModeEnabled']) {
      this._print(`(${dbName}/${storeName}) IDB store initialized. Use "${READY_EVENT_NAME}" event for start.`);
    }
  }

  /**
  *
  * @param {String} key
  */
  read(key) {
    let tx = this.db.transaction(this.storeName, 'readwrite');
    let request = tx.objectStore(this.storeName).get(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = (e) => {
        if (e.target.result && e.target.result._value) {
          resolve(e.target.result._value);
        } else {
          resolve(null);
          this._print(`IDB: cannot read "${key}"`);
        }
      };
      request.onerror = (e) => {
        reject(e);
      };
    });
  }

  /**
   *
   * @param {String} key
   * @param {*} value
   */
  write(key, value) {
    let data = {
      _key: key,
      _value: value,
    };
    let tx = this.db.transaction(this.storeName, 'readwrite');
    let request = tx.objectStore(this.storeName).put(data);
    return new Promise((resolve, reject) => {
      request.onsuccess = (e) => {
        resolve(e.target.result);
      };
      request.onerror = (e) => {
        reject(e);
      };
    });
  }

  /**
   *
   * @param {String} key
   */
  delete(key) {
    let tx = this.db.transaction(this.storeName, 'readwrite');
    let request = tx.objectStore(this.storeName).delete(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = (e) => {
        resolve(e);
      };
      request.onerror = (e) => {
        reject(e);
      };
    });
  }

  getAll() {
    let tx = this.db.transaction(this.storeName, 'readwrite');
    let request = tx.objectStore(this.storeName).getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = (e) => {
        let all = e.target.result;
        resolve(all.map((obj) => {
          return obj._value;
        }));
      };
      request.onerror = (e) => {
        reject(e);
      };
    });
  }

}

export class IDB {

  static get readyEventName() {
    return READY_EVENT_NAME;
  }

  /**
   *
   * @param {String} dbName
   * @param {String} storeName
   * @returns {DbInstance}
   */
  static open(dbName = 'holidayDb', storeName = 'store') {
    let key = dbName + '/' + storeName;
    if (!this._reg[ key ]) {
      this._reg[ key ] = new DbInstance(dbName, storeName);
    }
    return this._reg[ key ];
  }

  /**
   *
   * @param {String} dbName
   */
  static clear(dbName) {
    window.indexedDB.deleteDatabase(dbName);
    for (let key in this._reg) {
      if (key.split('/')[0] === dbName) {
        delete this._reg[key];
      }
    }
  }

}

IDB._reg = Object.create(null);
