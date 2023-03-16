
const name = 'html_switch';

export default {
  name,
  async init (l) {
    const svgEditor = this
    const { svgCanvas } = svgEditor
    const width = 50;
    const height = 28;
    const mode = "html_switch";
    const classId = "svg-ext-" + mode;
    const prefixId = "HXT_";
    const t = {};
    return {
      callback: function () {
        $("#html_switch_panel").hide()
      },
      mouseDown: function (e) {
        if (svgCanvas.getMode() === mode) {
          const fill = svgCanvas.getColor("fill");
          const stroke = svgCanvas.getColor("stroke");
          const startX = e.start_x;
          const startY = e.start_y;
          let o = svgCanvas.getNextId();
          let a = svgCanvas.getNextId().replace("svg_", prefixId);
          let svgDom = {
            elements: [{
              type: "rect",
              attr: {
                x: startX,
                y: startY - height,
                width: width,
                height: height,
                "stroke-width": 0,
                id: o
              }
            }, {
              type: "foreignObject",
              content: [{
                tag: "label",
                attr: {
                  id: "T-" + a,
                  type: "md-switch"
                },
                style: "width:calc(100% - 6px);height:calc(100% - 6px);text-align:center;background-color:" + fill + ";color:" + stroke + ";margin: 3px 3px 3px 3px;"
              }],
              attr: {
                x: startX,
                y: startY - height,
                height: height,
                width: width,
                id: "H-" + a
              }
            }]
          }
          let c = svgCanvas.getNextId().replace("svg_", prefixId)
          let g = svgEditor.addSvgGroupFromJson({
            group: "g",
            id: c,
            type: classId,
            attr: {
              type: classId,
              style: "pointer-events:none",
              fill: "rgba(0,0,0,0)",
              stroke: "rgba(0,0,0,0)",
              "xml:space": "preserve"
            },
            elements: svgDom.elements
          })
          return {started: true}
        }
      },
      mouseMove: function (e) {},
      mouseMove: function (e) {
        svgCanvas.getMode() === "resize" && e && e.selected && e.selected.id && e.selected.id.startsWith(prefixId)
        
        return e.selected.id
      },
      mouseUp: function (e) {
        if (svgCanvas.getMode() === mode) return {
          keep: e.event.clientX != t.x && e.event.clientY != t.y,
          element: g,
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