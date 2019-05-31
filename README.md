# Holiday.js - lightweight and flexible UI-library for those who tired of js-frameworks
## Concept Basics

* Minimal overhead upon a native web platform and DOM API
* Native syntax for templates and styling
* Full power of modern web-platform: Custom Elements, Shadow DOM, ES modules, CSS variables
* Minimalistic toolchain: can work directly in any modern browser, without any additional build process setting
* Lightweight and "tree shaking" friendly: use what you need only
* Fast as lightning: Holiday.js not using string pre-processing for templates in js runtime
* Flexible and extensible: standard class-based syntax allows you to extend any core-class as you want
* Easy to understand, easy to use: probably, you already know all you need

## Component Example

```js
import { HdElement } from './core/hd-element.js';

class MyComponent extends HdElement {
  constructor() {
    super();
    this.state = {
      imageURL: 'images/photo.jpg',
      firstName: 'John',
      secondName: 'Snow',
    };
  }
}

MyComponent.template = /*html*/ `
<style>
  :host {
    display: block;
    paddimg: 10px;
    background-color: #fff;
    color: #000;
  }
</style>
<img bind="src: imageURL" />
<div bind="textContent: firstName"></div>
<div bind="textContent: secondName"></div>
`;
MyComponent.is = 'my-component';
```

## Full Documentation, Examples, Benchmarks
### [holiday-js.web.app](https://holiday-js.web.app/)

## Installation (using git)

`git submodule add -b master https://github.com/foxeyes/holiday holiday`

Git-module approach allows you to put your dependency to any path in project structure you prefer, select branches and versions, create your own branches and use git tooling to manage code more flexible.

For getting updates:

`git submodule update --init --recursive --remote`

[About git submodules](https://blog.github.com/2016-02-01-working-with-submodules/)