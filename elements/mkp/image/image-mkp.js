import { HdElement } from '../../../core/hd-element.js';
import {} from '../spinner/spinner-mkp.js';

class ImageMkp extends HdElement {

  constructor() {
    super();

    this.defineAccessor('src', async (src) => {
      if (!src) {
        return;
      }
      this.removeAttribute('error');
      this.setAttribute('loading', '');
      let img = new Image();
      img.src = src;
      img.onload = () => {
        this[ 'img-el' ].style.setProperty('--local-bg-image', `url('${src}')`);
        this.removeAttribute('loading');
        this._loadedOnce = true;
      }
      img.onerror = () => {
        this[ 'img-el' ].style.setProperty('--local-bg-image', '');
        this.setAttribute('error', '');
        this.removeAttribute('loading');
      }
    });

  }
}

ImageMkp.template = /*html*/ `
<style>
 :host {
   display: inline-flex;
   justify-content: center;
   align-items: center;
   font-size: 100%;
 }
 :host([error]) {
  background: linear-gradient(#FFF, #eee);
  background-clip: content-box;
  border-top: var(--gap-max, 20px) solid rgba(0, 0, 0, 0.1);
  border-bottom: var(--gap-max, 20px) solid #fff;
  border-left: var(--gap-max, 20px) solid rgba(0, 0, 0, 0.05);
  border-right: var(--gap-max, 20px) solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
 }
 :host(:not([loading])) spinner-mkp {
  display: none;
 }
 #img-el {
   height: 100%;
   width: 100%;
   background-image: var(--local-bg-image);
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center center;
 }
:host([loading]) #img-el {
  display: none;
 }
</style>
<div id="img-el"></div>
<spinner-mkp></spinner-mkp>
`;
ImageMkp.logicAttributes = [
  'src',
];
ImageMkp.is = 'image-mkp';

export { ImageMkp };