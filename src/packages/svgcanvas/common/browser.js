/**
 * Browser detection.
 * @module browser
 * @license MIT
 *
 * @copyright 2010 Jeff Schiller, 2010 Alexis Deveria
 */

import { NS } from "../core/namespaces"

const NSSVG = 'http://www.w3.org/2000/svg'

const { userAgent } = navigator
const svg = document.createElementNS(NS.SVG, 'svg');
// Note: Browser sniffing should only be used if no other detection method is possible
const isWebkit_ = userAgent.includes('AppleWebKit')
const isGecko_ = userAgent.includes('Gecko/')
const isChrome_ = userAgent.includes('Chrome/')
const isMac_ = userAgent.includes('Macintosh')

let supportsNativeSVGTransformLists_ = (function () {
  const rect = document.createElementNS(NS.SVG, 'rect');
  const rxform = rect.transform.baseVal;
  const t1 = svg.createSVGTransform();
  rxform.appendItem(t1);
  const r1 = rxform.getItem(0);
  const isSVGTransform = (o) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/SVGTransform
    return o && typeof o === 'object' && typeof o.setMatrix === 'function' && 'angle' in o;
  };
  return isSVGTransform(r1) && isSVGTransform(t1) &&
    r1.type === t1.type && r1.angle === t1.angle &&
    r1.matrix.a === t1.matrix.a &&
    r1.matrix.b === t1.matrix.b &&
    r1.matrix.c === t1.matrix.c &&
    r1.matrix.d === t1.matrix.d &&
    r1.matrix.e === t1.matrix.e &&
    r1.matrix.f === t1.matrix.f;
  }());
// text character positioning (for IE9 and now Chrome)
const supportsGoodTextCharPos_ = (function () {
  const svgroot = document.createElementNS(NSSVG, 'svg')
  const svgContent = document.createElementNS(NSSVG, 'svg')
  document.documentElement.append(svgroot)
  svgContent.setAttribute('x', 5)
  svgroot.append(svgContent)
  const text = document.createElementNS(NSSVG, 'text')
  text.textContent = 'a'
  svgContent.append(text)
  try { // Chrome now fails here
    const pos = text.getStartPositionOfChar(0).x
    return (pos === 0)
  } catch (err) {
    return false
  } finally {
    svgroot.remove()
  }
}())

// Public API

/**
 * @function module:browser.isWebkit
 * @returns {boolean}
*/
export const isWebkit = () => isWebkit_
/**
 * @function module:browser.isGecko
 * @returns {boolean}
*/
export const isGecko = () => isGecko_
/**
 * @function module:browser.isChrome
 * @returns {boolean}
*/
export const isChrome = () => isChrome_

/**
 * @function module:browser.isMac
 * @returns {boolean}
*/
export const isMac = () => isMac_

/**
 * @function module:browser.supportsGoodTextCharPos
 * @returns {boolean}
*/
export const supportsGoodTextCharPos = () => supportsGoodTextCharPos_

/**
* @function module:browser.supportsNativeTransformLists
* @returns {boolean}
*/
export const supportsNativeTransformLists = () => supportsNativeSVGTransformLists_;

/**
 * Set `supportsNativeSVGTransformLists_` to `false` (for unit testing).
 * @function module:browser.disableSupportsNativeTransformLists
 * @returns {void}
*/
export const disableSupportsNativeTransformLists = () => {
  supportsNativeSVGTransformLists_ = false;
};