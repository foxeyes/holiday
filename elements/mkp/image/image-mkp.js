import {HdElement} from '../../../core/hd-element.js';
import {SPINNER_CSS} from '../../css/spinner/spinner-css.js';

export class ImageMkp extends HdElement {

  constructor() {
    super();
    this.setAttribute('error', '');
    this.defineAccessor('src', (src) => {
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
      this['img-el'].src = src;
      this['img-el'].onload = (e) => {
        // @ts-ignore
        this.onload && this.onload(e);
        if (this.hasAttribute('native-size')) {
          this['img-el'].removeAttribute('default-size');
          window.requestAnimationFrame(() => {
            this.height = this['img-el'].height;
            this.width = this['img-el'].width;
            this.style.height = this.height + 'px';
            this.style.width = this.width + 'px';
          });
        }
        this.removeAttribute('loading');
        this.removeAttribute('error');
      };
      this['img-el'].onerror = (e) => {
        // @ts-ignore
        this.onerror && this.onerror(e);
        this.setAttribute('error', '');
        this.removeAttribute('loading');
      };
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
   height: var(--native-height);
   width: var(--native-width);
   overflow: hidden;
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
   display: block;
   object-fit: contain;
   opacity: 1;
   transition: 0.3s;
   pointer-events: none;
 }
 #img-el[default-size] {
   height: 100%;
   width: 100%;
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
<img id="img-el" default-size />
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
