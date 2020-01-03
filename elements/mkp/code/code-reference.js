/*
Multiline comment
*/

export class MyClass {

  constructor() {
    this.property = null;
    this._applyProp = (propName, value) => {
      this[propName] = value;
    };
  }

  // Single line comment:
  _myMethod(val) {
    console.log(val);
  }

  /*
  Comment line 1
  Comment line 2
  Comment line 3
  */

}

const TEMPLATE = /*html*/ `
<style>
  :host {
    display: block;
  }
</style>
<my-element my-attr="true">Some content...</my-element>
<a href=".//my-page.html"></a>
`;

// Last comment...
