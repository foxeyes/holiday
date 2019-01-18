import { HdElement } from '../../../core/hd-element.js';

class SpinnerMkp extends HdElement {

}

SpinnerMkp.styles = /*html*/ `
<style>
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 6px solid var(--color, #000);
    border-radius: 100%;
    height: var(--tap-zone-size, 32px);
    width: var(--tap-zone-size, 32px);
    min-height: var(--tap-zone-size, 32px);
    min-width: var(--tap-zone-size, 32px);
    border-top-color: transparent;
    box-sizing: border-box;
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-duration: 1s;
    animation-timing-function: linear;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    50% {
      opacity: 0.4;
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
`;
SpinnerMkp.is = 'spinner-mkp';

export { SpinnerMkp };