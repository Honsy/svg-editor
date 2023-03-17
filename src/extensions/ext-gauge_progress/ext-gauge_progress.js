
const name = 'gauge_progress';

export default {
  name,
  async init (arg) {
    const svgEditor = this
    const { svgCanvas } = svgEditor;
    const mode = "gauge_progress";
    const width = 100;
    const height = 25;
    const classId = "svg-ext-" + mode;
    const prefixId = "GXP_";
    const t = {};
    let moveElement;
    return {
      callback: function () {
        $("#gauge_progress_panel").hide()
      },
      mouseDown: function (e) {
        if (svgCanvas.getMode() === mode) {
          const fill = svgCanvas.getColor("fill");
          const stroke = svgCanvas.getColor("stroke");
          const strokeWidth = svgCanvas.getStrokeWidth()
          const fontSize = svgCanvas.getFontSize();
          const startX = e.start_x;
          const startY = e.start_y - height;
          let o = svgCanvas.getNextId();
          let a = svgCanvas.getNextId().replace("svg_", prefixId);
          let svgProperty = {
            "font-size": fontSize,
            stroke: stroke,
            "stroke-width": strokeWidth,
            "font-family": svgCanvas.getFontFamily(),
            "xml:space": "preserve"
          }
          let content = [];

          let svgDom = {
              elements: [{
                type: "rect",
                attr: {
                  id: "A-" + svgCanvas.getNextId().replace("svg_", prefixId),
                  x: startX,
                  y: startY,
                  width: width,
                  height: height,
                  fill: fill
                }
              }, {
                type: "rect",
                attr: {
                  id: "B-" + svgCanvas.getNextId().replace("svg_", prefixId),
                  x: startX,
                  y: startY + height / 2,
                  width: width,
                  height: height / 2,
                  fill: "#1565c0"
                }
              },{
                type: "foreignObject",
                content: content,
                attr: {
                  x: startX,
                  y: startY,
                  height: height,
                  width: width,
                  id: "H-" + a
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
          })
          return {started: true}
        }
      },
      mouseMove: function (e) {},
      mouseUp: function (e) {
        if (svgCanvas.getMode() === mode) return {
          keep: e.event.clientX != t.x && e.event.clientY != t.y,
          element: moveElement,
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