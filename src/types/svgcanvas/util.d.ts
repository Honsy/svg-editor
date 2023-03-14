/**
 * @param {any} obj
 * @returns {any}
 */
export function findPos(obj: any): any;
export function isObject(item: any): boolean;
export function mergeDeep(target: any, source: any): any;
/**
 * Get the closest matching element up the DOM tree.
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against (class, ID, data attribute, or tag)
 * @return {Boolean|Element}  Returns null if not match found
 */
export function getClosest(elem: Element, selector: string): boolean | Element;
/**
 * Get all DOM element up the tree that contain a class, ID, or data attribute
 * @param  {Node} elem The base element
 * @param  {String} selector The class, id, data attribute, or tag to look for
 * @return {Array} Null if no match
 */
export function getParents(elem: Node, selector: string): any[];
export function getParentsUntil(elem: any, parent: any, selector: any): any[];
