export function setUiStrings(strs: any): void;
export function setLinkControlPoints(lcp: boolean): void;
/**
 * @name module:path.path
 * @type {null|module:path.Path}
 * @memberof module:path
*/
export let path: null | module;
export function init(canvas: any): void;
/**
* @function module:path.ptObjToArr
* @todo See if this should just live in `replacePathSeg`
* @param {string} type
* @param {SVGPathSegMovetoAbs|SVGPathSegLinetoAbs|SVGPathSegCurvetoCubicAbs|SVGPathSegCurvetoQuadraticAbs|SVGPathSegArcAbs|SVGPathSegLinetoHorizontalAbs|SVGPathSegLinetoVerticalAbs|SVGPathSegCurvetoCubicSmoothAbs|SVGPathSegCurvetoQuadraticSmoothAbs} segItem
* @returns {ArgumentsArray}
*/
export const ptObjToArr: any;
/**
* @function module:path.getGripPt
* @param {Segment} seg
* @param {module:math.XYObject} altPt
* @returns {module:math.XYObject}
*/
export const getGripPt: any;
/**
* @function module:path.getPointFromGrip
* @param {module:math.XYObject} pt
* @param {module:path.Path} pth
* @returns {module:math.XYObject}
*/
export const getPointFromGrip: any;
/**
* Requires prior call to `setUiStrings` if `xlink:title`
*    to be set on the grip.
* @function module:path.addPointGrip
* @param {Integer} index
* @param {Integer} x
* @param {Integer} y
* @returns {SVGCircleElement}
*/
export const addPointGrip: any;
/**
* @function module:path.getGripContainer
* @returns {Element}
*/
export const getGripContainer: any;
/**
* Requires prior call to `setUiStrings` if `xlink:title`
*    to be set on the grip.
* @function module:path.addCtrlGrip
* @param {string} id
* @returns {SVGCircleElement}
*/
export const addCtrlGrip: any;
/**
* @function module:path.getCtrlLine
* @param {string} id
* @returns {SVGLineElement}
*/
export const getCtrlLine: any;
/**
* @function module:path.getPointGrip
* @param {Segment} seg
* @param {boolean} update
* @returns {SVGCircleElement}
*/
export const getPointGrip: any;
/**
* @function module:path.getControlPoints
* @param {Segment} seg
* @returns {PlainObject<string, SVGLineElement|SVGCircleElement>}
*/
export const getControlPoints: any;
/**
* This replaces the segment at the given index. Type is given as number.
* @function module:path.replacePathSeg
* @param {Integer} type Possible values set during {@link module:path.init}
* @param {Integer} index
* @param {ArgumentsArray} pts
* @param {SVGPathElement} elem
* @returns {void}
*/
export const replacePathSeg: any;
/**
* @function module:path.getSegSelector
* @param {Segment} seg
* @param {boolean} update
* @returns {SVGPathElement}
*/
export const getSegSelector: any;
export function smoothControlPoints(ct1: PlainObject, ct2: PlainObject, pt: PlainObject): Point[];
export function getPath_(elem: SVGPathElement): any;
export function removePath_(id: string): void;
export function recalcRotatedPath(): void;
export function clearData(): void;
export function reorientGrads(elem: Element, m: SVGMatrix): void;
export function convertPath(pth: SVGPathElement, toRel: boolean): string;
/**
* Group: Path edit functions.
* Functions relating to editing path elements.
*/
export const pathActions: any;
/**
 * :path.uiStrings
 */
export type module = any;
export type Point = PlainObject;
