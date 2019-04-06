/**
 * @license
 * Copyright (c) 2018 Alex Sova (alex.sova@pm.me). All rights reserved.
 * This code may only be used under the BSD style license found at
 * https://github.com/foxeyes/holiday/LICENSE.md
 */

class HdElement extends HTMLElement {

  __parseTemplateBindings(element) {
    let bindedToStateElements = [...element.querySelectorAll('[bind]')];
    if (bindedToStateElements.length) {
      if (!this.__stateBindingsMap) {
        this.__stateBindingsMap = {};
      }
      bindedToStateElements.forEach((el) => {
        let bKey = el.getAttribute('bind');
        let pairsArr = bKey.split(';');
        pairsArr.forEach((pair) => {
          if (!pair) {
            return;
          }
          let keyValArr = pair.split(':');
          let valKey = keyValArr[1].trim();
          if (!this.__stateBindingsMap[valKey]) {
            this.__stateBindingsMap[valKey] = [];
          }
          this.__stateBindingsMap[valKey].push({
            element: el,
            propName: keyValArr[0].trim(),
          });
        });
      });
    }
  }

  static get isShady() {
    return window['ShadyDOM'] && window['ShadyDOM'].inUse;
  }

  __initialRender() {
    let tpl = HdElement.__templatesMap.get(this.constructor.name);
    if (tpl) {
      if (this.constructor['isShady']) {
        window['ShadyCSS'].prepareTemplate(tpl, this.constructor['is']);
      }
      this.shadowRoot.appendChild(tpl.content.cloneNode(true));

      this.__parseTemplateBindings(this.$);

      [...this.$.querySelectorAll('[id*="-"]')].forEach((el) => {
        this[el.id] = el;
      });
    }
  }

  /**
   * 
   * @param {String} path 
   */
  stateUpdated(path) {
    return;
  }

  constructor() {
    super();
    this.__state = this.state;
    this.$ = this.attachShadow({
      mode: 'open',
    });
    this.__initialRender();
    
    Object.defineProperty(this, 'state', {
      set: (stateObj) => {
        this.__state = stateObj;
        if (!this.__stateBindingsMap) {
          return;
        }
        for (let path in this.__stateBindingsMap) {
          let bindingsArr = this.__stateBindingsMap[path];
          bindingsArr.forEach((binding) => {
            let el = binding.element;
            let value = this.__state;
            let propPath = path.split('.');
            propPath.forEach((step) => {
              value = value[step];
            });
            if (binding.propName.indexOf('@') === 0) {
              let attrName = binding.propName.replace('@', '');
              if (value === false || value === null || value === undefined) {
                el.removeAttribute(attrName);
              } else {
                el.setAttribute(attrName, value);
              }
            } else {
              el[binding.propName] = value;
            }
            this.stateUpdated && this.stateUpdated(path);
          });
        }
      },
      get: () => {
        return this.__state;
      },
    });
    if (this.__state) {
      this.state = this.__state;
    }
  }

  updateTemplateBindings() {
    this.__stateBindingsMap = {};
    this.__parseTemplateBindings(this.$);
    if (this.__state) {
      this.state = this.__state;
    }
  }

  /**
   * 
   * @param {String} propName 
   * @param {Function} handler 
   */
  defineAccessor(propName, handler) {
    let localPropName = '__' + propName;
    if (this[propName] !== undefined) {
      this[localPropName] = this[propName];
    }
    Object.defineProperty(this, propName, {
      set: (val) => {
        this[localPropName] = val;
        handler.bind(this)(val);
      },
      get: () => {
        return this[localPropName];
      },
    });
    if (this[localPropName]) {
      this[propName] = this[localPropName];
    }
  }

  /**
   * 
   * @param  {...any} args - key and value or key-value map object can be provided
   */
  setStateProperty(...args) {
    let path, value;
    if (args.length === 1 && typeof args[0] === 'object') {
      let map = args[ 0 ];
      for (let key in map) {
        this.setStateProperty(key, map[key]);
      }
      return;
    } else if (args.length === 2 && typeof args[0] === 'string') {
      path = args[0];
      value = args[1];
    } else {
      console.warn('(HdElement) Wrong state properties: ' + args);
    }

    if (!this.__stateBindingsMap) {
      return;
    }

    let parent = this.__state;
    let lastStep = path;
    let propPath = path.split('.');
    propPath.forEach((step, idx) => {
      if (idx < propPath.length - 1) {
        parent = parent[step];
      } else {
        lastStep = step;
      }
    });
    parent[lastStep] = value;

    let bindingsArr = this.__stateBindingsMap[path];
    if (bindingsArr) {
      bindingsArr.forEach((binding) => {
        let el = binding.element;
        if (binding.propName.indexOf('@') === 0) {
          let attrName = binding.propName.replace('@', '');
          if (value === false || value === null || value === undefined) {
            el.removeAttribute(attrName);
          } else {
            el.setAttribute(attrName, value);
          }
        } else {
          if (el[binding.propName] !== value) {
            el[binding.propName] = value;
          }
        }
      });
    }

    this.stateUpdated && this.stateUpdated(path);
  }

  /**
   * 
   * @param {String} path 
   * @param {*} value
   * @param {Number} debounceTimeout
   */
  setStatePropertyLater(path, value, debounceTimeout = null) {
    if (this.__statePropertyTimeout) {
      window.clearTimeout(this.__statePropertyTimeout);
    }
    this.__statePropertyTimeout = window.setTimeout(() => {
      this.setStateProperty(path, value);
    }, debounceTimeout && debounceTimeout);
  }

  /**
   * @param {String} tplStr
   */
  static set template(tplStr) {
    let tpl = document.createElement('template');
    this.__templatesMap.set(this.name, tpl);
    this.__templatesMap.get(this.name).innerHTML = tplStr;
  }

  /**
   * @param {String} name
   */
  static set is(name) {
    if (window.customElements.get(name)) {
      return;
    }
    this.__is = name;
    window.customElements.define(name, this);
  }

  static get is() {
    return this.__is;
  }

  /**
   * @param {Array<String>} val
   */
  static set logicAttributes(val) {
    if (val.length) {
      Object.defineProperty(this, 'observedAttributes', {
        get: () => {
          return [...val];
        },
      });
    }
  }

  connectedCallback() {
    if (this.constructor['isShady']) {
      window['ShadyCSS'].styleElement(this);
    }
    if (!this.__bindProp) {
      this.__bindProp = this.getAttribute('bind-prop');
    }
    this.__bindId = this.getAttribute('bind-id');
    if (this.__bindProp && this.__bindId) {
      this.__bindActive = true;
      this.__bindHandler = (e) => {
        if (this.__bindActive && e.detail.dispatcher !== this && e.detail.value !== this[this.__bindProp]) {
          this.__bindActive = false;
          window.setTimeout(() => {
            this.__bindActive = true;
          });
          this[this.__bindProp] = e.detail.value;
        }
      }
      window.addEventListener(this.__bindId, this.__bindHandler);
    }
  }

  disconnectedCallback() {
    window.removeEventListener(this.__bindId, this.__bindHandler);
  }

  /**
   * 
   * @param {String} propName 
   * @param {*} propValue
   */
  notify(propName, propValue = null) {
    let callbackName = 'on' + propName[0].toUpperCase() + propName.slice(1) + 'Change';
    this[callbackName] && this[callbackName](propValue);
    if (this.__bindProp && this.__bindId && this.__bindActive) {
      window.dispatchEvent(new CustomEvent(this.__bindId, {
        detail: {
          dispatcher: this,
          value: propValue,
        },
      }));
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (newVal === oldVal) {
      return;
    }
    this[name] = newVal;
  }

}

HdElement.__templatesMap = new Map();
export { HdElement };
