
declare module '@svgedit/svgcanvas/core/units' {
  export function init(elementContainer: any): void;
  export function getTypeMap(): any;
  export function shortFloat(val: any): Float | string;
  export function convertUnit(val: string | Float, unit?: "em" | "ex" | "in" | "cm" | "mm" | "pt" | "pc" | "px" | "%"): Float;
  export function setUnitAttr(elem: Element, attr: string, val: string): void;
  export function convertAttrs(element: Element): void;
  export function convertToNum(attr: string, val: string): Float;
  export function isValidUnit(attr: string, val: string, selectedElement?: Element): boolean;
}

