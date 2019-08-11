import { HdElement } from '../../../core/hd-element.js';

class RepeatAl extends HdElement {

  _createDataMap() {
    let bindedElements = [...this.querySelectorAll('[bind-repeat]')];
    if (bindedElements.length) {
      if (!this._dataMap) {
        this._dataMap = {};
      }
      bindedElements.forEach((el) => {
        let bKey = el.getAttribute('bind-repeat');
        let pairsArr = bKey.split(';');
        pairsArr.forEach((pair) => {
          if (!pair) {
            return;
          }
          let keyValArr = pair.split(':');
          let valKey = keyValArr[1].trim();
          if (!this._dataMap[valKey]) {
            this._dataMap[valKey] = [];
          }
          this._dataMap[valKey].push({
            element: el,
            propName: keyValArr[0].trim(),
          });
        });
        if (!window['hdDevModeEnabled']) {
          el.removeAttribute('bind-repeat');
        }
      });
    }
  }

  _buildDOMSubtree() {
    this.textContent = '';
    let fragment = document.createDocumentFragment();
    this._idxMap = [];
    // @ts-ignore
    for (let i = 0; i < ((this.size * 1) || this._defaultSize); i++) {
      let domChunk = this._rTemplate.content.cloneNode(true);
      // @ts-ignore
      this._idxMap.push([...domChunk.children]);
      fragment.appendChild(domChunk);
    }
    this.appendChild(fragment);
    this._createDataMap();
    this.setAttribute('initialized', '');
  }

  _reflectData() {
    // @ts-ignore
    if (!this.data) {
      return;
    }
    if (this._debounceTimeout) {
      window.clearTimeout(this._debounceTimeout);
    }
    this._debounceTimeout = window.setTimeout(() => {
      // @ts-ignore
      let from = (this.from * 1) || this._defaultFrom;
      // @ts-ignore
      let to = from + ((this.size * 1) || this._defaultSize);
      // @ts-ignore
      let dataArrFragment = this.data.slice(from, to);
      dataArrFragment.forEach((dataObj, idx) => {
        // console.log(dataObj);
        for (let path in this._dataMap) {
          let parent = dataObj;
          let lastStep = path;
          let propPath = path.split('.');
          propPath.forEach((step, idx) => {
            if (idx < propPath.length - 1) {
              parent = parent[step];
            } else {
              lastStep = step;
            }
          });
          let value = parent[lastStep];
          let bObj = this._dataMap[path][idx];
          let propName = bObj.propName;
          if (propName.includes('@')) {
            propName = propName.replace('@', '');
            bObj.element.setAttribute(propName, value);
          } else {
            bObj.element[propName] = value;
          }
        }
      });
      this._idxMap.forEach((elArr, idx) => {
        if (idx > dataArrFragment.length - 1) {
          elArr.forEach((el) => {
            el.setAttribute('out-of-range', '');
          });
        } else {
          elArr.forEach((el) => {
            el.removeAttribute('out-of-range');
          });
        }
      });
      this._debounceTimeout = null;
    });
  }

  constructor() {
    super();
    
    this.defineAccessor('data', (/** @type {Array<*>} */ data) => {
      this._reflectData();
    });
    
    this.defineAccessor('from', (/** @type {Number} */ from) => {
      this._reflectData();
    });

    this.defineAccessor('size', (/** @type {Number} */ size) => {
      if (this.hasAttribute('initialized')) {
        this._buildDOMSubtree();
        this._reflectData();
      }
    });

    this._defaultFrom = 0;
    this._defaultSize = 10;
    this._rTemplate = document.createElement('template');
  }

  connectedCallback() {
    super.connectedCallback();
    this._rTemplate.innerHTML = this.innerHTML;
    this._buildDOMSubtree();
  }

}

RepeatAl.template = /*html*/ `
<style>
  :host {
    display: none;
  }
  :host([initialized]) {
    display: contents;
  }
</style>
<slot></slot>
`;
RepeatAl.logicAttributes = [
  'from',
  'size',
];

RepeatAl.is = 'repeat-al';

export { RepeatAl };