export function transformPoint(x: Float, y: Float, m: SVGMatrix): any;
export function isIdentity(m: SVGMatrix): boolean;
export function matrixMultiply(...args: SVGMatrix[]): SVGMatrix;
export function hasMatrixTransform(tlist?: SVGTransformList): boolean;
export function transformBox(l: Float, t: Float, w: Float, h: Float, m: SVGMatrix): any;
export function transformListToTransform(tlist: SVGTransformList, min?: Integer, max?: Integer): SVGTransform;
export function getMatrix(elem: Element): SVGMatrix;
export function snapToAngle(x1: Integer, y1: Integer, x2: Integer, y2: Integer): any;
export function rectsIntersect(r1: SVGRect, r2: SVGRect): boolean;
/**
 * :math.AngleCoord45
 */
export type module = PlainObject;
