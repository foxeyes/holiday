import { HdElement } from '../../../core/hd-element.js';

class CodeMkp extends HdElement {}

CodeMkp.template = /*html*/ `
<style>
  :host {
    display: block;
    padding: var(--gap-max, 20px);
    color: var(--color, currentColor);
    font-size: 1.2em;
    position: relative;
    border-left: 1px solid currentColor;
    overflow: auto;
  }
  :host::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--color, currentColor);
    opacity: 0.05;
    pointer-events: none;
  }
</style>
<pre><code><slot></slot></code></pre>
`;
CodeMkp.is = 'code-mkp';

export { CodeMkp };