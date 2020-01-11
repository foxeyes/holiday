import {HdElement} from '../../../core/hd-element.js';
import {SPINNER_CSS} from '../../css/spinner/spinner-css.js';

export class ImageMkp extends HdElement {

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('error', '');
    this.defineAccessor('src', (src) => {
      if (this._srcTimeout) {
        window.clearTimeout(this._srcTimeout);
      }
      this._srcTimeout = window.setTimeout(() => {
        this.removeAttribute('error');
        this.setAttribute('loading', '');
        if (src === null || src === 'null') {
          return;
        }
        if (!src) {
          this.setAttribute('error', '');
          this.removeAttribute('loading');
          return;
        }
        let img = new Image();
        img.src = src;
        img.onload = () => {
          this.removeAttribute('loading');
          this.removeAttribute('error');
          this[ 'img-el' ].style.backgroundImage = `url('${src}')`;
          img = null;
        }
        img.onerror = () => {
          this.setAttribute('error', '');
          this.removeAttribute('loading');
          img = null;
        }
        this._srcTimeout = null;
      }, 20);
    });
  }

}

ImageMkp.template = /*html*/ `
<style>
  ${SPINNER_CSS}
 :host {
   display: inline-flex;
   justify-content: center;
   align-items: center;
   font-size: 100%;
   box-sizing: border-box;
 }
 :host([error]) {
  border: 1px solid currentColor;
 }
 spinner-css {
   position: absolute;
 }
 :host(:not([loading])) spinner-css {
  display: none;
 }
 #img-el {
   height: 100%;
   width: 100%;
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center center;
   opacity: 1;
   transition: opacity 0.3s;
 }
 :host([loading]) #img-el {
  opacity: 0;
 }
 :host([error]) #img-el {
  opacity: 0;
 }
 svg {
   position: absolute;
   height: 50px;
   width: 50px;
 }
 line {
   stroke: currentColor;
   stroke-width: 1.1px;
 }
:host(:not([error])) svg {
  display: none;
 }
</style>
<div id="img-el"></div>
<spinner-css></spinner-css>
<svg xmlns="http://www.w3.org/2000/svg" vewBox="0 0 50 50">
 <line x1="0" y1="0" x2="50" y2="50"></line>
 <line x1="0" y1="50" x2="50" y2="0"></line>
</svg>
`;
ImageMkp.logicAttributes = [
  'src',
];
ImageMkp.is = 'image-mkp';
