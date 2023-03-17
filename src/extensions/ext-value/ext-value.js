
const name = 'value';

export default {
  name,
  async init (l) {
    console.warn('lllllllllllll',l, this)
    const svgEditor = this
    const { svgCanvas } = svgEditor
    const mode = "value";
    const classId = "svg-ext-" + mode;
    const prefixId = "VAL_";
    const t = {};
    let svgElement;
    return {
      callback: function () {
        $("#value_panel").hide()
      },
      mouseDown: function (e) {
        if (svgCanvas.getMode() === mode) {
          let fill = svgCanvas.getColor("fill");
          let stroke = svgCanvas.getColor("stroke");
          fill !== stroke && (fill = stroke)
          const startX = e.start_x;
          const startY = e.start_y;
          const svgProperty = {
            fill: fill,
            stroke: stroke,
            "font-size": 14,
            stroke: stroke,
            "stroke-width": 0,
            "font-family": "sans-serif",
            "text-anchor": "middle",
            "xml:space": "preserve",
            x: startX,
            y: startY
          }
          
          const elements = {
            elements: [{
              type: "text",
              content: "##.##",
              attr: {
                id: svgCanvas.getNextId().replace("svg_", prefixId)
              }
            }]
          }

          const attr = {
            type: classId,
            x: startX,
            y: startY,
            style: "pointer-events:none"
          }

          for (let index = 0; index < elements.elements.length; index++) {
            const element = elements.elements[index];
            $.extend(element.attr, svgProperty)
          }

          $.extend(attr, svgProperty)
          t.x = startX
          t.y = startY
          let c = svgCanvas.getNextId().replace("svg_", prefixId)

          svgElement = svgEditor.addSvgGroupFromJson({
            group: "g",
            id: c,
            type: classId,
            attr: attr,
            elements: elements.elements
          })
          return {started: true}
        }
      },
      mouseMove: function (e) {},
      mouseUp: function (e) {
        if (svgCanvas.getMode() === mode) return {
          keep: e.event.clientX != t.x && e.event.clientY != t.y,
          element: svgElement,
          started: false
        }
      },
      getClassId: function () {
        return classId
      },
      getPrefixId: function () {
        return prefixId
      },
      setGaugeAttribute: function (e) {
        if (e.elem.id.indexOf(prefixId) === 0 && e.elem.children && e.elem.children.length && e.elem.children[0]) {
          e.elem.children[0].setAttribute(e.attr, e.value)
        }
      },
    }
  }
}