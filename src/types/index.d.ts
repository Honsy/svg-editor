
declare global {
  declare const $;
  interface Window {
    opera: any;
    SVGPathSeg: any;
    SVGPathSegClosePath: any;
    SVGPathSegMovetoAbs: any;
    SVGPathSegMovetoRel: any;
    
    svgEditor: any;
    svgedit: any;
    widget: any;
  }

  interface HTMLElement {
    value: any
  }
  interface Element {
    pathSegList: any
    createSVGPathSegLinetoAbs: any
    getStartPositionOfChar: any
    getBBox: any
    style: any
  }
}

export {};