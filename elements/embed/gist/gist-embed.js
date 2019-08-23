import { HdElement } from '../../../core/hd-element.js';
import { IconMkp } from '../../mkp/icon/icon-mkp.js';

IconMkp.addIcons({
  'github': 'M20.38,8.53C20.54,8.13 21.06,6.54 20.21,4.39C20.21,4.39 18.9,4 15.91,6C14.66,5.67 13.33,5.62 12,5.62C10.68,5.62 9.34,5.67 8.09,6C5.1,3.97 3.79,4.39 3.79,4.39C2.94,6.54 3.46,8.13 3.63,8.53C2.61,9.62 2,11 2,12.72C2,19.16 6.16,20.61 12,20.61C17.79,20.61 22,19.16 22,12.72C22,11 21.39,9.62 20.38,8.53M12,19.38C7.88,19.38 4.53,19.19 4.53,15.19C4.53,14.24 5,13.34 5.8,12.61C7.14,11.38 9.43,12.03 12,12.03C14.59,12.03 16.85,11.38 18.2,12.61C19,13.34 19.5,14.23 19.5,15.19C19.5,19.18 16.13,19.38 12,19.38M8.86,13.12C8.04,13.12 7.36,14.12 7.36,15.34C7.36,16.57 8.04,17.58 8.86,17.58C9.69,17.58 10.36,16.58 10.36,15.34C10.36,14.11 9.69,13.12 8.86,13.12M15.14,13.12C14.31,13.12 13.64,14.11 13.64,15.34C13.64,16.58 14.31,17.58 15.14,17.58C15.96,17.58 16.64,16.58 16.64,15.34C16.64,14.11 16,13.12 15.14,13.12Z',
});

export class GistEmbed extends HdElement {
  constructor() {
    super();
    this.state = {
      gistSrc: 'Loading gist...',
      on: {
        github: () => {
          window.open('https://gist.github.com/' + this.id);
        },
      },
    };
    this.defineAccessor('id', async (id) => {
      if (!id) {
        return;
      }
      let fileContent = window.localStorage.getItem(id);
      if (!fileContent) {
        let apiResponse;
        try {
          apiResponse = await (await window.fetch('https://api.github.com/gists/' + id, {
            method: 'GET',
          })).json();
          let fileName = Object.keys(apiResponse.files)[0];
          fileContent = apiResponse.files[fileName].content;
          window.localStorage.setItem(id, fileContent);
        } catch {
          fileContent = 'Error loading gist...';
        }
      }
      this.setStateProperty({
        'gistSrc': fileContent,
      });
      this.setAttribute('ready', '');
    });
  }
}

GistEmbed.template = /*html*/ `
<style>
  :host {
    display: block;
    position: relative;
  }
  .loading {
    display: none;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  :host(:not([ready])) .loading {
    display: flex;
  }
  .gh {
    display: flex;
    align-items: center;
    padding: var(--gap-mid);
    background-color: var(--color, #000);
    color: var(--bg-color, #fff);
    cursor: pointer;
    user-select: none;
  }
</style>
<code-mkp bind="textContent: gistSrc"></code-mkp>
<div class="gh" bind="onclick: on.github"><icon-mkp icon="github"></icon-mkp>&nbsp;&nbsp;View on&nbsp;<b>GitHub</b></div>
<div class="loading">
  <spinner-mkp></spinner-mkp>
</div>
`;
GistEmbed.logicAttributes = [
  'id',
];
GistEmbed.is = 'gist-embed';