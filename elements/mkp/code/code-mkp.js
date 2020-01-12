import {HdElement} from '../../../core/hd-element.js';

export class CodeMkp extends HdElement {

  _colorize(srcCode) {
    srcCode = srcCode
      .replace(/;/g, '&semi;') // must be on a first place
      .replace(/\//g, '&sol;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    if (!this.hasAttribute('highlight')) {
      return srcCode;
    }
    let hlChars = [
      '=',
      '#',
      '$',
      '|',
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
      '&lt;&sol;',
      '&lt;',
      '&gt;',
      '&semi;',
      '&quot;',
    ];
    hlChars.forEach((char) => {
      srcCode = srcCode.split(char).join(`<span class="hl">${char}</span>`);
    });

    srcCode = srcCode
      .split('&sol;*').join('<span class="comment">&sol;*')
      .split('*&sol;').join('*&sol;</span>')
      .split('&sol;&sol; ').map((subStr, idx) => {
        return idx ? subStr.replace('\n', '</span>\n') : subStr;
      }).join('<span class="comment">&sol;&sol; ');
    return srcCode;
  }

  constructor() {
    super();

    this.state = {
      src: 'Loading...',
    };

    this.defineAccessor('highlight', (color) => {
      this.style.setProperty('--hl-color', color);
    });

    this.defineAccessor('src', async (/** @type {String} */ url) => {
      try {
        let srcCode = await (await window.fetch(url)).text();
        this.setStateProperty({
          'src': this._colorize(srcCode),
        });
      } catch (e) {
        this.setStateProperty({
          'src': 'Error...',
        });
        if (window['hdDevModeEnabled']) {
          console.warn(e);
        }
      }
    });

  }

  set textContent(text) {
    super.textContent = text;
    this.setStateProperty({
      'src': this._colorize(text),
    });
  }

  get textContent() {
    return super.textContent;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.textContent) {
      this.setStateProperty({
        'src': this._colorize(this.textContent),
      });
    }
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
  .hl {
    color: var(--hl-color);
  }
  .comment {
    color: var(--hl-color);
    font-style: italic;
    opacity: 0.7;
  }
  code {
    white-space: pre-wrap;
  }
</style>
<pre><code id="code-el" bind="innerHTML: src"></code></pre>
`;
CodeMkp.logicAttributes = [
  'highlight',
  'src',
];
CodeMkp.is = 'code-mkp';

