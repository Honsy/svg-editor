import { supportsNativeTransformLists } from "./browser";

/**
* Returns an object that behaves like a `SVGTransformList` for the given DOM element.
* @function module:SVGTransformList.getTransformList
* @param {Element} elem - DOM element to get a transformlist from
* @todo The polyfill should have `SVGAnimatedTransformList` and this should use it
* @returns {SVGAnimatedTransformList|SVGTransformList}
*/
export const getTransformList = function (elem) {
  if (!supportsNativeTransformLists()) {
    const id = elem.id || 'temp';
    let t = listMap_[id];
    if (!t || id === 'temp') {
      listMap_[id] = new SVGTransformList(elem);
      listMap_[id]._init();
      t = listMap_[id];
    }
    return t;
  }
  if (elem.transform) {
    return elem.transform.baseVal;
  }
  if (elem.gradientTransform) {
    return elem.gradientTransform.baseVal;
  }
  if (elem.patternTransform) {
    return elem.patternTransform.baseVal;
  }

  return null;
};