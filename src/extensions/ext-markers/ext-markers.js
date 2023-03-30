/**
 * @file ext-markers.js
 *
 * @license Apache-2.0
 *
 * @copyright 2010 Will Schleter based on ext-arrows.js by Copyright(c) 2010 Alexis Deveria
 * @copyright 2021 OptimistikSAS
 *
 * This extension provides for the addition of markers to the either end
 * or the middle of a line, polyline, path, polygon.
 *
 * Markers are graphics
 *
 * to simplify the coding and make the implementation as robust as possible,
 * markers are not shared - every object has its own set of markers.
 * this relationship is maintained by a naming convention between the
 * ids of the markers and the ids of the object
 *
 * The following restrictions exist for simplicty of use and programming
 *    objects and their markers to have the same color
 *    marker size is fixed
 *    an application specific attribute - se_type - is added to each marker element
 *        to store the type of marker
 *
 * @todo
 *    remove some of the restrictions above
 *
*/

export default {
  name: 'markers',
  async init () {
    const svgEditor = this
    const { svgCanvas } = svgEditor
    const { BatchCommand, RemoveElementCommand, InsertElementCommand } = svgCanvas.history
    const { $id, addSVGElementsFromJson: addElem } = svgCanvas
    const mtypes = ['start', 'mid', 'end']
    const markerElems = ['line', 'path', 'polyline', 'polygon']
    const prefix = "se_marker_";
    // note - to add additional marker types add them below with a unique id
    // and add the associated icon(s) to marker-icons.svg
    // the geometry is normalized to a 100x100 box with the origin at lower left
    // Safari did not like negative values for low left of viewBox
    // remember that the coordinate system has +y downward
    const markerTypes = {
      nomarker: {
        label: "&#x2014;"
      },
      leftarrow:
        { element: 'path', attr: { d: 'M0,50 L100,90 L70,50 L100,10 Z' }, label: "&#x25C4;" },
      rightarrow:
        { element: 'path', attr: { d: 'M100,50 L0,90 L30,50 L0,10 Z' },label: "&#x25BA;" },
      leftpointing: {
          element: "path",
          attr: {
              d: "M50,48 L90,90 M50,52 L90,10"
          },
          label: "&#x2009;&#x02C2;"
      },
      rightpointing: {
        element: "path",
        attr: {
            d: "M50,48 L10,90 L50,52 L10,10 Z"
        },
        label: "&#x2009;&#x003E;"
      },
      break: {
        element: "path",
        attr: {
            d: "M50,20 L50,80"
        },
        label: "&#x2009;&#x2223;"
      },
      mcircle:
        { element: 'circle', attr: { r: 30, cx: 50, cy: 50 },label: "&#x2009;&#x25CF;" }
    };
    let selectElements;

    /**
    * @param {Element} elem - A graphic element will have an attribute like marker-start
    * @param {"marker-start"|"marker-mid"|"marker-end"} attr
    * @returns {Element} The marker element that is linked to the graphic element
    */
    const getLinked = (elem, attr) => {
      const str = elem.getAttribute(attr)
      if (!str) { return null }
      const m = str.match(/\(#(.*)\)/)
      // "url(#mkr_end_svg_1)" would give m[1] = "mkr_end_svg_1"
      if (!m || m.length !== 2) {
        return null
      }
      return svgCanvas.getElement(m[1])
    }

    function update(e, r) {
      console.log('e,r',e,r)
      "\\" !== r.substr(0, 1) && (r = "\\textmarker");
      var t = document.getElementById(e + "_marker"),
          n = 0;
      $.each(markerTypes, function (e, t) {
          if (-1 !== r.indexOf(e)) return !1;
          n++
      }), t.selectedIndex = n
    }
    /**
     * Toggles context tool panel off/on.
     * @param {boolean} on
     * @returns {void}
    */
    const showPanel = (on) => {
      let textContent, warpContent;
      console.log(selectElements)
      $('#marker_panel').toggle(on)
      if (on) {
        mtypes.forEach((pos) => {
          const marker = getLinked(selectElements[0], 'marker-' + pos)
          const markerDom = $("#" + pos + "_marker");
          console.log(marker, markerDom)
          if (marker) {
            if (marker?.attributes?.se_type) {
              textContent = "\\" + marker.attributes.se_type.textContent;
              warpContent = textContent
              if (warpContent == "\\textmarker") {
                textContent = marker.lastChild.textContent
              } else {
                markerDom.hide();
              }
            }
          } else {
            warpContent = textContent = "\\nomarker"
            markerDom.hide();
          }
          markerDom.val(textContent)
          update(pos, warpContent)
        })
      }
    }

    /**
    * @param {string} id
    * @param {""|"nomarker"|"nomarker"|"leftarrow"|"rightarrow"|"textmarker"|"forwardslash"|"reverseslash"|"verticalslash"|"box"|"star"|"xmark"|"triangle"|"mcircle"} seType
    * @returns {SVGMarkerElement}
    */
    const addMarker = (id, seType) => {
      const selElems = svgCanvas.getSelectedElements()
      let marker = svgCanvas.getElement(id)
      if (marker) { return undefined }
      if (seType === '' || seType === 'nomarker') { return undefined }
      const el = selElems[0]
      const color = el.getAttribute('stroke')
      const strokeWidth = 10
      const refX = 50
      const refY = 50
      const viewBox = '0 0 100 100'
      const markerWidth = 5
      const markerHeight = 5
      let type;

      type = seType.substr(0, 1) === "\\" ? seType.substr(1) : "textmarker"
      if (!markerTypes[type]) {
        console.error(`unknown marker type: ${type}`)
        return undefined
      }

      // create a generic marker
      marker = addElem({
        element: 'marker',
        attr: {
          id,
          markerUnits: 'strokeWidth',
          orient: 'auto',
          style: 'pointer-events:none',
          se_type: type
        }
      })
      if (type != "textmarker") {
        const mel = addElem(markerTypes[type])
        const fillcolor = (type.substr(-2) === '_o')
        ? 'none'
        : color
        mel.setAttribute('fill', fillcolor)
        mel.setAttribute('stroke', color)
        mel.setAttribute('stroke-width', strokeWidth)
        marker.append(mel)
      } else {
        
      }

      const mel = addElem(markerTypes[seType])
      const fillcolor = (seType.substr(-2) === '_o')
        ? 'none'
        : color

      mel.setAttribute('fill', fillcolor)
      mel.setAttribute('stroke', color)
      mel.setAttribute('stroke-width', strokeWidth)
      marker.append(mel)

      marker.setAttribute('viewBox', viewBox)
      marker.setAttribute('markerWidth', markerWidth)
      marker.setAttribute('markerHeight', markerHeight)
      marker.setAttribute('refX', refX)
      marker.setAttribute('refY', refY)
      svgCanvas.findDefs().append(marker)

      return marker
    }

    /**
    * @param {Element} elem
    * @returns {SVGPolylineElement}
    */
    const convertline = (elem) => {
      // this routine came from the connectors extension
      // it is needed because midpoint markers don't work with line elements
      if (elem.tagName !== 'line') { return elem }

      // Convert to polyline to accept mid-arrow
      const x1 = Number(elem.getAttribute('x1'))
      const x2 = Number(elem.getAttribute('x2'))
      const y1 = Number(elem.getAttribute('y1'))
      const y2 = Number(elem.getAttribute('y2'))
      const { id } = elem

      const midPt = (' ' + ((x1 + x2) / 2) + ',' + ((y1 + y2) / 2) + ' ')
      const pline = addElem({
        element: 'polyline',
        attr: {
          points: (x1 + ',' + y1 + midPt + x2 + ',' + y2),
          stroke: elem.getAttribute('stroke'),
          'stroke-width': elem.getAttribute('stroke-width'),
          fill: 'none',
          opacity: elem.getAttribute('opacity') || 1
        }
      })
      mtypes.forEach((pos) => { // get any existing marker definitions
        const nam = 'marker-' + pos
        const m = elem.getAttribute(nam)
        if (m) { pline.setAttribute(nam, elem.getAttribute(nam)) }
      })

      const batchCmd = new BatchCommand()
      batchCmd.addSubCommand(new RemoveElementCommand(elem, elem.parentNode))
      batchCmd.addSubCommand(new InsertElementCommand(pline))

      elem.insertAdjacentElement('afterend', pline)
      elem.remove()
      svgCanvas.clearSelection()
      pline.id = id
      svgCanvas.addToSelection([pline])
      svgCanvas.addCommandToHistory(batchCmd)
      return pline
    }

    /**
    *
    * @returns {void}
    */
    const setMarker = (pos, markerType) => {
      const selElems = svgCanvas.getSelectedElements()
      if (selElems.length === 0) return
      const markerName = 'marker-' + pos
      const el = selElems[0]
      const marker = getLinked(el, markerName)
      if (marker) { marker.remove() }
      el.removeAttribute(markerName)
      let val = markerType
      if (val === '') { val = 'nomarker' }
      if (val === 'nomarker') {
        svgCanvas.call('changed', selElems)
        return
      }
      // Set marker on element
      const id = 'mkr_' + pos + '_' + el.id
      addMarker(id, val)
      svgCanvas.changeSelectedAttribute(markerName, 'url(#' + id + ')')
      if (el.tagName === 'line' && pos === 'mid') {
        convertline(el)
      }
      svgCanvas.call('changed', selElems)
    }

    /**
     * Called when the main system modifies an object. This routine changes
     *   the associated markers to be the same color.
     * @param {Element} elem
     * @returns {void}
    */
    const colorChanged = (elem) => {
      const color = elem.getAttribute('stroke')

      mtypes.forEach((pos) => {
        const marker = getLinked(elem, 'marker-' + pos)
        if (!marker) { return }
        if (!marker.attributes.se_type) { return } // not created by this extension
        const ch = marker.lastElementChild
        if (!ch) { return }
        const curfill = ch.getAttribute('fill')
        const curstroke = ch.getAttribute('stroke')
        if (curfill && curfill !== 'none') { ch.setAttribute('fill', color) }
        if (curstroke && curstroke !== 'none') { ch.setAttribute('stroke', color) }
      })
    }

    /**
    * Called when the main system creates or modifies an object.
    * Its primary purpose is to create new markers for cloned objects.
    * @param {Element} el
    * @returns {void}
    */
    const updateReferences = (el) => {
      const selElems = svgCanvas.getSelectedElements()
      mtypes.forEach((pos) => {
        const markerName = 'marker-' + pos
        const marker = getLinked(el, markerName)
        if (!marker || !marker.attributes.se_type) { return } // not created by this extension
        const url = el.getAttribute(markerName)
        if (url) {
          const len = el.id.length
          const linkid = url.substr(-len - 1, len)
          if (el.id !== linkid) {
            const newMarkerId = 'mkr_' + pos + '_' + el.id
            addMarker(newMarkerId, marker.attributes.se_type.value)
            svgCanvas.changeSelectedAttribute(markerName, 'url(#' + newMarkerId + ')')
            svgCanvas.call('changed', selElems)
          }
        }
      })
    }

    return {
      name: `markers`,
      mySetMarker(cmd_makeer, optionIndex) {
        console.warn('mySetMarker', cmd_makeer, optionIndex)
        let updateKey = undefined,
            warpIndex = 0;
        $.each(markerTypes, function(key, item) {
          if (optionIndex === warpIndex++) {
            updateKey = key
          }
        })

        console.log(optionIndex, warpIndex, updateKey)
        // let cmd = {
        //   start_marker: "start",
        //   mid_marker: "mid",
        //   end_marker: "end"
        // }[cmd_makeer];

        
        // (function(cmd_makeer, updateIndex){
          let cmd = {
            start_marker: "start",
            mid_marker: "mid",
            end_marker: "end"
          }[cmd_makeer];
          let domId = "marker-" + cmd;
          let i = "\\" + updateKey;
          let element = selectElements[0]
          let marker = getLinked(element, domId)
          marker && $(marker).remove()
          element.removeAttribute(domId);
          console.log(i)
          if (i == "") {
            i = "\\nomarker";
          }

          if ("\\nomarker" == i) {
            update(cmd, i)
            svgCanvas.call('changed', selectElements)
            return
          }

          const pos = prefix + cmd + "_" + element.id
          setMarker(pos, i)
          svgCanvas.changeSelectedAttribute(domId, "url(#" + pos + ")")
          if (element.tagName === "line" && "mid" == cmd) {
            element = convertline(element)
          }

          svgCanvas.call('changed', selectElements)
          update(cmd, i)
        // }(cmd_makeer, "\\" + updateIndex))
      },
      // The callback should be used to load the DOM with the appropriate UI items
      callback () {
        var a = document.getElementById("start_marker"),
            s = document.getElementById("mid_marker"),
            d = document.getElementById("end_marker");
        $.each(markerTypes, function(index, item) {
          if (item.label) {
            const option = document.createElement("option");
            option.value = item.label;
            option.innerHTML = item.label;
            option.setAttribute("style", "background-color: rgba(33,33,33,1);color: rgba(255,255,255,1);")
            var option1 = option.cloneNode(true),
                option2 = option.cloneNode(true),
                option3 = option.cloneNode(true);
                
            a.appendChild(option1), s.appendChild(option2), d.appendChild(option3)
          }
        })
      },
      selectedChanged (opts) {
        selectElements = opts.elems
        // Use this to update the current selected elements
        opts.elems.forEach((elem) => {
          if (elem && markerElems.includes(elem.tagName)) {
            if (opts.selectedElement && !opts.multiselected) {
              showPanel(true)
            } else {
              showPanel(false)
            }
          }
        })
      },
      elementChanged (opts) {
        const elem = opts.elems[0]
        if (elem && (
          elem.getAttribute('marker-start') ||
          elem.getAttribute('marker-mid') ||
          elem.getAttribute('marker-end')
        )) {
          colorChanged(elem)
          updateReferences(elem)
        }
      }
    }
  }
}
