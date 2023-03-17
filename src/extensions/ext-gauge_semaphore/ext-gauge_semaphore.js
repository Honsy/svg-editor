
const name = 'gauge_semaphore';

export default {
  name,
  async init (arg) {
    const svgEditor = this
    const { svgCanvas } = svgEditor;
    const mode = "gauge_semaphore";
    const classId = "svg-ext-" + mode;
    const prefixId = "GSE_";
    const t = {};
    return {
      callback: function () {
        $("#gauge_semaphore_panel").hide()
      },
      mouseDown: function (e) {
        if (svgCanvas.getMode() === mode) {
          const fill = svgCanvas.getColor("fill");
          const stroke = svgCanvas.getColor("stroke");
          const strokeWidth = svgCanvas.getStrokeWidth()
          const startX = e.start_x;
          const startY = e.start_y - 30;
          let o = svgCanvas.getNextId();
          let a = svgCanvas.getNextId().replace("svg_", prefixId);
          let svgProperty = {
              fill: fill,
              "font-size": v.getFontSize(),
              stroke: stroke,
              "stroke-width": strokeWidth,
              "font-family": svgCanvas.getFontFamily(),
              "xml:space": "preserve"
          }
          let svgDom = {
              elements: [{
                type: "ellipse",
                attr: {
                  id: svgCanvas.getNextId().replace("svg_", prefixId),
                  cx: "15",
                  cy: "15",
                  rx: "14",
                  ry: "14",
                  "stroke-width": "none"
                }
              }]
          }
          let svgAttr = {
            type: classId,
            x: startX,
            y: startY,
            style: "pointer-events:none"
          }

          for (let index = 0; index < svgDom.elements.length; index++) {
            const element = svgDom.elements[index];
            $.extend(element.attr, svgProperty);
          }
          $.extend(svgAttr, svgProperty)
          t.x = startX
          t.y = startY
          let c = svgCanvas.getNextId().replace("svg_", prefixId)
          let g = svgEditor.addSvgGroupFromJson({
            group: "g",
            id: c,
            type: classId,
            attr: svgAttr,
            elements: svgDom.elements
          }).setAttribute("transform", "translate(" + startX + "," + startY + ")")

          arg.recalculateDimensions(g);
          g.getBBox();
          return {started: true}
        }
      },
      mouseMove: function (e) {},
      mouseUp: function (e) {
        if (svgCanvas.getMode() === mode) return {
          keep: e.event.clientX != t.x && e.event.clientY != t.y,
          element: arg,
          started: false
        }
      },
      getClassId: function () {
        return classId
      },
      getPrefixId: function () {
        return prefixId
      },
    }
  }
}