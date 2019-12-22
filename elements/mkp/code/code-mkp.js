import { HdElement } from '../../../core/hd-element.js';

class CodeMkp extends HdElement {
  colorize() {
    if (!this.hasAttribute('highlight')) {
      return;
    }
    let html = this.innerHTML;
    let hlChars = [
      '{',
      '}',
      `'`,
      '`',
      `:`,
      `.`,
      `,`,
      `(`,
      `)`,
      `[`,
      `]`,
    ];
    hlChars.forEach((char) => {
      html = html.split(char).join(`<span class="code-mkp-hl">${char}</span>`)
    });

    html = html.split('/*').map((subStr) => {
      return subStr.replace('*/', '*/</span>');
    }).join('<span class="code-mkp-comment">/*');

    html = html.split('//').map((subStr) => {
      return subStr.replace('\n', '</span>\n');
    }).join('<span class="code-mkp-comment">//');

    this.innerHTML = html;
  }

  constructor() {
    super();
    this.defineAccessor('highlight', (color) => {
      this.style.setProperty('--hl-color', color);
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.colorize();
  }

}

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
  ::slotted(.code-mkp-hl) {
    color: var(--hl-color);
  }
  ::slotted(.code-mkp-comment) {
    color: var(--hl-color);
    font-style: italic;
    opacity: 0.7;
  }
  code {
    white-space: pre-wrap;
  }
</style>
<pre><code><slot></slot></code></pre>
`;
CodeMkp.logicAttributes = [
  'highlight',
];
CodeMkp.is = 'code-mkp';

export { CodeMkp };
