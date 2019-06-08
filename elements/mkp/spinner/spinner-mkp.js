import { HdElement } from '../../../core/hd-element.js';

class SpinnerMkp extends HdElement {}

SpinnerMkp.template = /*html*/ `
<style>
  :host {
    --local-border-width: 4px;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: var(--tap-zone-size, 32px);
    width: var(--tap-zone-size, 32px);
    min-height: var(--tap-zone-size, 32px);
    min-width: var(--tap-zone-size, 32px);
  }
  .segment {
    position: absolute;
    border-radius: 100%;
    border: var(--local-border-width) solid currentColor;
    border-top-color: transparent;
    box-sizing: border-box;
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-duration: 1.2s;
    animation-timing-function: linear;
  }
  .s1 {
    height: var(--tap-zone-size, 32px);
    width: var(--tap-zone-size, 32px);
  }
  .s2 {
    height: calc(var(--tap-zone-size, 32px) / 2);
    width: calc(var(--tap-zone-size, 32px) / 2);
    animation-direction: reverse;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
<div class="segment s1"></div>
<div class="segment s2"></div>
`;
SpinnerMkp.is = 'spinner-mkp';

export { SpinnerMkp };