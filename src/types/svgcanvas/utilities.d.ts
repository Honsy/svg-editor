declare module '@svgedit/svgcanvas/core/utilities' {
  /**
   * Converts a string to base64.
   * @function module:utilities.encode64
   * @param {string} input
   * @returns {string} Base64 output
   */
  export function encode64(input: string): string
  /**
   * Converts a string from base64.
   * @function module:utilities.decode64
   * @param {string} input Base64-encoded input
   * @returns {string} Decoded output
   */
  export function decode64(input: string): string
  /**
   * Compute a hashcode from a given string
   * @param word : the string, we want to compute the hashcode
   * @returns {number}: Hascode of the given string
   */
  export function hashCode(word: any): number
  /**
   * @function module:utilities.decodeUTF8
   * @param {string} argString
   * @returns {string}
   */
  export function decodeUTF8(argString: string): string
  export function init(canvas: any): void
  export function dropXMLInternalSubset(str: string): string
  export function toXml(str: string): string
  export function encodeUTF8(argString: string): string
  export function dataURLToObjectURL(dataurl: string): string
  export function createObjectURL(blob: Blob): string
  /**
   * @property {string} blankPageObjectURL
   */
  export const blankPageObjectURL: string
  export function convertToXMLReferences(input: string): string
  export function text2xml(sXML: string): XMLDocument
  export function bboxToObj({ x, y, width, height }: SVGRect): any
  export function walkTree(elem: Element, cbFn: any): void
  export function walkTreePost(elem: Element, cbFn: any): void
  export function getUrlFromAttr(attrVal: string): string
  export function getHref(elem: Element): string
  export function setHref(elem: Element, val: string): void
  export function findDefs(): SVGDefsElement
  export function getPathBBox(path: SVGPathElement): any
  export function getBBox(elem: Element): any
  export function getPathDFromSegments(pathSegments: any): string
  export function getPathDFromElement(elem: Element): string
  export function getExtraAttributesForConvertToPath(elem: Element): PlainObject<'filter' | 'marker-start' | 'marker-end' | 'marker-mid' | 'clip-path', string>
  export function getBBoxOfElementAsPath(elem: Element, addSVGElementsFromJson: any, pathActions: any): DOMRect | false
  export function convertToPath(elem: Element, attrs: any, svgCanvas: any): SVGPathElement | null
  export function getBBoxWithTransform(elem: Element, addSVGElementsFromJson: any, pathActions: any): any
  export function getStrokedBBox(elems: Element[], addSVGElementsFromJson: any, pathActions: any): any
  export function getVisibleElements(parentElement: Element): Element[]
  export function getStrokedBBoxDefaultVisible(elems: Element[]): any
  export function getRotationAngleFromTransformList(tlist: SVGTransformList, toRad: boolean): Float
  export function getRotationAngle(elem?: Element, toRad?: boolean): Float
  export function getRefElem(attrVal: string): Element
  export function getFeGaussianBlur(ele: any): any
  export function getElement(id: string): Element | null
  export function assignAttributes(elem: Element, attrs: PlainObject<string, string>, suspendLength?: Integer, unitCheck?: boolean): void
  export function cleanupElement(element: Element): void
  export function snapToGrid(value: Float): Integer
  export function preventClickDefault(img: Element): void
  export function isNullish(val: any): boolean
  export function mock({ getHref: getHrefUser, setHref: setHrefUser, getRotationAngle: getRotationAngleUser }: PlainObject): void
  export function stringToHTML(str: any): ChildNode
  export function insertChildAtIndex(parent: any, child: any, index?: number): void
  export function $id(id: any): HTMLElement
  export function $qq(sel: any): any
  export function $qa(sel: any): any[]
  export function $click(element: any, handler: any): void
  /**
   * :utilities.SVGElementJSON
   */
  export type module = PlainObject
  export type BBox = PlainObject
}
