declare module '@svgedit/svgcanvas/common/browser' { 
  export function isWebkit(): boolean;
  export function isGecko(): boolean;
  export function isChrome(): boolean;
  export function isMac(): boolean;
  export function supportsGoodTextCharPos(): boolean;
}
