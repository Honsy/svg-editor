/**
 * Tools for SVG handle on JSON format.
 * @module svgcanvas
 * @license MIT
 *
 * @copyright 2010 Alexis Deveria, 2010 Jeff Schiller
 */
import { getElement, assignAttributes, cleanupElement } from './utilities.js'
import { NS } from './namespaces.js'
import { svgEmitter } from '../common/emiiter.js'

let svgCanvas = null
let svgdoc_ = null

/**
 * @function module:json.jsonContext#getSelectedElements
 * @returns {Element[]} the array with selected DOM elements
*/
/**
 * @function module:json.jsonContext#getDOMDocument
 * @returns {HTMLDocument}
*/

/**
* @function module:json.init
* @param {module:json.jsonContext} jsonContext
* @returns {void}
*/
export const init = (canvas) => {
  svgCanvas = canvas
  svgdoc_ = canvas.getDOMDocument()
}
/**
* @function module:json.getJsonFromSvgElements Iterate element and return json format
* @param {ArgumentsArray} data - element
* @returns {svgRootElement}
*/
export const getJsonFromSvgElements = (data) => {
  // Text node
  if (data.nodeType === 3) return data.nodeValue

  const retval = {
    element: data.tagName,
    // namespace: nsMap[data.namespaceURI],
    attr: {},
    children: []
  }

  // Iterate attributes
  for (let i = 0, attr; (attr = data.attributes[i]); i++) {
    retval.attr[attr.name] = attr.value
  }

  // Iterate children
  for (let i = 0, node; (node = data.childNodes[i]); i++) {
    retval.children[i] = getJsonFromSvgElements(node)
  }

  return retval
}

/**
* This should really be an intersection implementing all rather than a union.
* @name module:json.addSVGElementsFromJson
* @type {module:utilities.EditorContext#addSVGElementsFromJson|module:path.EditorContext#addSVGElementsFromJson}
*/

export const addSVGElementsFromJson = (data) => {
  if (typeof data === 'string') return svgdoc_.createTextNode(data)

  let shape = getElement(data.attr.id)
  // if shape is a path but we need to create a rect/ellipse, then remove the path
  const currentLayer = svgCanvas.getDrawing().getCurrentLayer()
  if (shape && data.element !== shape.tagName) {
    shape.remove()
    shape = null
  }
  if (!shape) {
    const ns = data.namespace || NS.SVG
    shape = svgdoc_.createElementNS(ns, data.element)
    if (currentLayer) {
      (svgCanvas.getCurrentGroup() || currentLayer).append(shape)
    }
  }
  const curShape = svgCanvas.getCurShape()
  if (data.curStyles) {
    assignAttributes(shape, {
      fill: curShape.fill,
      stroke: curShape.stroke,
      'stroke-width': curShape.strokeWidth,
      'stroke-dasharray': curShape.stroke_dasharray,
      'stroke-linejoin': curShape.stroke_linejoin,
      'stroke-linecap': curShape.stroke_linecap,
      'stroke-opacity': curShape.stroke_opacity,
      'fill-opacity': curShape.fill_opacity,
      opacity: curShape.opacity / 2,
      style: 'pointer-events:inherit'
    }, 100)
  }
  assignAttributes(shape, data.attr, 100)
  cleanupElement(shape)

  // Children
  if (data.children) {
    data.children.forEach((child) => {
      shape.append(addSVGElementsFromJson(child))
    })
  }

  return shape
}

export const addSvgGroupFromJson = (data) => {
  let shape = getElement(data.id)
  const currentLayer = svgCanvas.getDrawing().getCurrentLayer()
  if (shape && data.group != shape.tagName) {
    // this.svgCanvas.
    shape = null
  }

  const ns = data.namespace || NS.SVG
  shape = svgdoc_.createElementNS(ns, data.group)
  shape.setAttribute('id', data.id)
  shape.setAttribute('type', data.type)
  if (currentLayer) {
    (svgCanvas.getCurrentGroup() || currentLayer).append(shape)
  }

  const curShape = svgCanvas.getCurShape()
  for (let index = 0; index < data.elements.length; index++) {
    const elementConfig = data.elements[index]
    let newElement = svgdoc_.createElementNS(NS.SVG, elementConfig.type)
    assignAttributes(
      newElement,
      {
        'stroke-width': curShape.stroke_width,
        'stroke-dasharray': curShape.stroke_dasharray,
        'stroke-linejoin': curShape.stroke_linejoin,
        'stroke-linecap': curShape.stroke_linecap,
        style: 'pointer-events:inherit'
      },
      100
    )
    assignAttributes(newElement, elementConfig.attr)
    if (elementConfig.type === 'text') {
      newElement.textContent = elementConfig.content
    } else if (elementConfig.type === 'foreignObject') {
      let content = elementConfig.content
      if (content) {
        for (let sIndex = 0; sIndex < content.length; sIndex++) {
          const contentJSON = content[sIndex]
          const contentElement = document.createElement(contentJSON.tag)
          if (contentElement.tagName.toLowerCase() === 'select') {
            const optionsElement = document.createElement('option')
            optionsElement.setAttribute('test', ' ')
            contentElement.appendChild(optionsElement)
          } else if (contentElement.tagName.toLowerCase() === 'button') {
            contentElement.innerHTML = 'button'
          } else if (contentElement.tagName.toLowerCase() === 'span') {
            contentJSON.value && (contentElement.innerHTML = contentJSON.value)
            contentJSON.attr && assignAttributes(contentElement, contentJSON.attr)
          }
          assignAttributes(contentElement, contentJSON.attr)
          contentJSON.style && contentElement.setAttribute('style', contentJSON.style)
          if (contentElement.tagName.toLowerCase() === 'input') {
            contentElement.style.backgroundColor = shape.fill
            contentElement.style.color = shape.stroke
          }
          newElement.appendChild(contentElement)
        }
      }
    }
    shape.appendChild(newElement)
  }

  if (data.curStyles) {
    assignAttributes(element, {
      fill: curShape.fill,
      stroke: curShape.stroke,
      "stroke-width": curShape.stroke_width,
      "stroke-dasharray": curShape.stroke_dasharray,
      "stroke-linejoin": curShape.stroke_linejoin,
      "stroke-linecap": curShape.stroke_linecap,
      style: "pointer-events:inherit"
  }, 100)
  }
  assignAttributes(shape,  data.attr, 100);
  cleanupElement(shape)
  svgEmitter.emit('onGaugeAdded', {
    id: data.id,
    type: data.type
  })

  console.log(shape)
  return shape
}