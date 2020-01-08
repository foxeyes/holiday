export const SPINNER_CSS = /*css*/ `
spinner-css {
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
spinner-css::before {
  content: '';
  display: block;
  position: absolute;
  border-radius: 100%;
  border: var(--local-border-width) solid currentColor;
  border-top-color: transparent;
  box-sizing: border-box;
  animation-name: spinner-css-rotate;
  animation-iteration-count: infinite;
  animation-duration: 1.2s;
  animation-timing-function: linear;
  height: var(--tap-zone-size, 32px);
  width: var(--tap-zone-size, 32px);
}
spinner-css::after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 100%;
  border: var(--local-border-width) solid currentColor;
  border-top-color: transparent;
  box-sizing: border-box;
  animation-name: spinner-css-rotate;
  animation-iteration-count: infinite;
  animation-duration: 1.2s;
  animation-timing-function: linear;
  height: calc(var(--tap-zone-size, 32px) / 2);
  width: calc(var(--tap-zone-size, 32px) / 2);
  animation-direction: reverse;
}
@keyframes spinner-css-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;
