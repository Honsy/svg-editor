
const name = 'html_bag';

export default {
  name,
  async init (arg) {
    const svgEditor = this
    const { svgCanvas } = svgEditor;
    const mode = "html_bag";
    const width = 200;
    const height = 160;
    let classId = "svg-ext-" + mode;
    const prefixId = "BAG_";
    const obj = {};
    let svgElement;
    return {
      callback: function () {
        $("#html_graph_panel").hide()
      },
      mouseDown: function (e) {
        let currentMode = svgCanvas.getMode();
        if (currentMode === mode) {
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
                  y: startY - height,
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
                  y: startY - rect.height,
                  height: rect.height,
                  width: rect.width,
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