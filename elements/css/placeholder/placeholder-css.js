export const PLACEHOLDER_CSS = /*css*/ `
placeholder-css {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed currentColor;
  opacity: 0.6;
  padding: var(--gap-min, 2px);
  min-height: var(--tap-zone-size, 28px);
  box-sizing: border-box;
}
placeholder-css[inline] {
  display: inline-flex;
}
placeholder-css:hover {
  opacity: 1;
}
`;
