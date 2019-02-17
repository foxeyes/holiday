import { HdElement } from '../../../core/hd-element.js';

class SpaceMkp extends HdElement {}

SpaceMkp.template = /*html*/ `
<style>
 :host {
   display: block;
   height: var(--gap-mid, 10px);
   width: var(--gap-mid, 10px);
   min-height: var(--gap-mid, 10px);
   min-width: var(--gap-mid, 10px);
 }

 :host([min]) {
   height: var(--gap-min, 2px);
   width: var(--gap-min, 2px);
   min-height: var(--gap-min, 2px);
   min-width: var(--gap-min, 2px);
 }

 :host([mid]) {
   height: var(--gap-mid, 10px);
   width: var(--gap-mid, 10px);
   min-height: var(--gap-mid, 10px);
   min-width: var(--gap-mid, 10px);
 }

 :host([max]) {
   height: var(--gap-max, 20px);
   width: var(--gap-max, 20px);
   min-height: var(--gap-max, 20px);
   min-width: var(--gap-max, 20px);
 }

 :host([ui]) {
   height: var(--tap-zone-size, 32px);
   width: var(--tap-zone-size, 32px);
   min-height: var(--tap-zone-size, 32px);
   min-width: var(--tap-zone-size, 32px);
 }

 :host([inline]) {
   display: inline-flex;
 }
</style>
`;
SpaceMkp.is = 'space-mkp';

export { SpaceMkp };