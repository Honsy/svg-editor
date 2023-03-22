/**
 * @file ext-eyedropper.js
 *
 * @license MIT
 *
 * @copyright 2010 Jeff Schiller
 * @copyright 2021 OptimistikSAS
 *
 */

const name = 'eyedropper'

export default {
  name,
  async init () {
    const svgEditor = this
    const { svgCanvas } = svgEditor
    // await loadExtensionTranslation(svgEditor)
    const { ChangeElementCommand } = svgCanvas.history
    // svgdoc = S.svgroot.parentNode.ownerDocument,
    const addToHistory = (cmd) => { svgCanvas.undoMgr.addCommandToHistory(cmd) }
    const currentStyle = {
      fillPaint: 'red',
      fillOpacity: 1.0,
      strokePaint: 'black',
      strokeOpacity: 1.0,
      strokeWidth: 5,
      strokeDashArray: null,
      opacity: 1.0,
      strokeLinecap: 'butt',
      strokeLinejoin: 'miter'
    }
    const { $id, $click } = svgCanvas

    /**
     *
     * @param {module:svgcanvas.SvgCanvas#event:ext_selectedChanged|module:svgcanvas.SvgCanvas#event:ext_elementChanged} opts
     * @returns {void}
     */
    const getStyle = (opts) => {
      // if we are in eyedropper mode, we don't want to disable the eye-dropper tool
      const mode = svgCanvas.getMode()
      if (mode === 'eyedropper') { return }

      const tool = $('tool_eyedropper')
      // enable-eye-dropper if one element is selected
      let elem = null
      if (!opts.multiselected && opts.elems[0] &&
        !['svg', 'g', 'use'].includes(opts.elems[0].nodeName)
      ) {
        elem = opts.elems[0]
        tool.removeClass('disabled')
        // grab the current style
        currentStyle.fillPaint = elem.getAttribute('fill') || 'black'
        currentStyle.fillOpacity = elem.getAttribute('fill-opacity') || 1.0
        currentStyle.strokePaint = elem.getAttribute('stroke')
        currentStyle.strokeOpacity = elem.getAttribute('stroke-opacity') || 1.0
        currentStyle.strokeWidth = elem.getAttribute('stroke-width')
        currentStyle.strokeDashArray = elem.getAttribute('stroke-dasharray')
        currentStyle.strokeLinecap = elem.getAttribute('stroke-linecap')
        currentStyle.strokeLinejoin = elem.getAttribute('stroke-linejoin')
        currentStyle.opacity = elem.getAttribute('opacity') || 1.0
        // disable eye-dropper tool
      } else {
        tool.addClass('disabled')
      }
    }

    return {
      name: `eyedropper`,
      buttons: [{
        id: "tool_eyedropper",
        type: "mode",
        title: "Eye Dropper Tool",
        key: "I",
        events: {
          click: function () {
            svgCanvas.setMode("eyedropper")
          }
        }
      }],
      selectedChanged: getStyle,
      elementChanged: getStyle,
      mouseDown (opts) {
        const mode = svgCanvas.getMode()
        if (mode === 'eyedropper') {
          const e = opts.event
          const { target } = e
          if (!['svg', 'g', 'use'].includes(target.nodeName)) {
            const changes = {}

            const change = function (elem, attrname, newvalue) {
              changes[attrname] = elem.getAttribute(attrname)
              elem.setAttribute(attrname, newvalue)
            }

            if (currentStyle.fillPaint) { change(target, 'fill', currentStyle.fillPaint) }
            if (currentStyle.fillOpacity) { change(target, 'fill-opacity', currentStyle.fillOpacity) }
            if (currentStyle.strokePaint) { change(target, 'stroke', currentStyle.strokePaint) }
            if (currentStyle.strokeOpacity) { change(target, 'stroke-opacity', currentStyle.strokeOpacity) }
            if (currentStyle.strokeWidth) { change(target, 'stroke-width', currentStyle.strokeWidth) }
            if (currentStyle.strokeDashArray) { change(target, 'stroke-dasharray', currentStyle.strokeDashArray) }
            if (currentStyle.opacity) { change(target, 'opacity', currentStyle.opacity) }
            if (currentStyle.strokeLinecap) { change(target, 'stroke-linecap', currentStyle.strokeLinecap) }
            if (currentStyle.strokeLinejoin) { change(target, 'stroke-linejoin', currentStyle.strokeLinejoin) }

            addToHistory(new ChangeElementCommand(target, changes))
          }
        }
      }
    }
  }
}
