
const name = 'html_slider';

export default {
  name,
  async init (arg) {
    const svgEditor = this
    const { svgCanvas } = svgEditor;
    const mode = "html_slider";
    const width = 200;
    const height = 200;
    const classId = "svg-ext-" + mode;
    const prefixId = "SLI_";
    const obj = {};
    let svgElement;
    return {
      callback: function () {},
      mouseDown: function (e) {
        if (svgCanvas.getMode() === mode) {
          const fill = svgCanvas.getColor("fill");
          const stroke = svgCanvas.getColor("stroke");
          const startX = e.start_x;
          const startY = e.start_y - height;
          let nextId = svgCanvas.getNextId();
          let prefixNextId = svgCanvas.getNextId().replace("svg_", prefixId);
          let svgDom = {
              elements: [{
                type: "rect",
                attr: {
                  id: nextId,
                  x: startX,
                  y: startY,
                  width: width,
                  height: height,
                  "stroke-width": 0,
                }
              }, {
                type: "foreignObject",
                content: [{
                  tag: "div",
                  attr: {
                    id: "D-" + prefixNextId
                  },
                  style: "width:100%;height:100%;"
                }],
                attr: {
                  x: startX,
                  y: startY - height,
                  height: height,
                  width: width,
                  id: "H-" + prefixNextId
                }
              }]
          }
          let warpId = svgCanvas.getNextId().replace("svg_", prefixId)
          svgElement = svgCanvas.addSvgGroupFromJson({
            group: "g",
            id: warpId,
            type: classId,
            attr: {
              type: classId,
              style: "pointer-events:none",
              fill: fill,
              stroke: stroke,
              "stroke-width": 1,
              "font-size": svgCanvas.getFontSize(),
              "font-family": svgCanvas.getFontFamily(),
              "text-anchor": "right",
              "xml:space": "preserve"
            },
            elements: svgDom.elements
          })
          return {started: true}
        }
      },
      mouseMove: function (e) {
        if (svgCanvas.getMode() === "resize" && e && e.selected && e.selected.id && e.selected.id.startsWith(m)) {
          return e.selected.id
        }
      },
      mouseUp: function (e) {
        const currentMode = svgCanvas.getMode()
        if (currentMode === mode) {
          if (currentMode === "select" && e && e.selected && e.selected.id && e.selected.id.startsWith(prefixId)) {
            return e.selected.id
          } else {
            return undefined;
          }
        } else {
          return {
            keep: e.event.clientX != obj.x && e.event.clientY != obj.y,
            element: svgElement,
            started: false
          }
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