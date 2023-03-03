
declare module "@svgedit/svgcanvas/common/util.js" {
  export function mergeDeep(target, source): any;
}

declare module "@svgedit/svgcanvas/common/browser" {
  export function isMac(): any;
}

declare module "@svgedit/svgcanvas" {
  export default SvgCanvas;
}

declare module "@svgedit/svgcanvas/core/path" {
  export const path;
}

declare module "@svgedit/svgcanvas/core/math" {
  export function transformPoint(x, y, m): any;
}


declare module "@svgedit/svgcanvas/core/utilities" {
  export function snapToGrid(value): any;
}
