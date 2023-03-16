
const name = 'html_input';

export default {
  name,
  async init (l) {
    const svgEditor = this
    const { svgCanvas } = svgEditor
    const width = 80;
    const height = 32;
    const mode = "html_input";
    const classId = "svg-ext-" + mode;
    const prefixId = "HXI_";
    const t = {};
    let svgElement;
    return {
      callback: function () {
        $("#html_input_panel").hide()
      },
      mouseDown: function (e) {
        if (svgCanvas.getMode() === mode) {
          const fill = svgCanvas.getColor("fill");
          const stroke = svgCanvas.getColor("stroke");
          const startX = e.start_x;
          const startY = e.start_y;
          let o = svgCanvas.getNextId();
          let a = svgCanvas.getNextId().replace("svg_", prefixId);
          let style = "width:calc(100% - 6px);height:calc(100% - 6px);text-align:center;background-color:" + fill + ";color:" + stroke + ";";
          style += "font-size:14px;";
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
                tag: "input",
                attr: {
                  id: "I-" + a,
                  type: "text",
                  value: "#.##"
                },
                style: "width:calc(100% - 7px);height:calc(100% - 7px);text-align:right;border: unset;font-size:14px;font-family:sans-serif;"
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
          svgElement = svgEditor.addSvgGroupFromJson({
            group: "g",
            id: c,
            type: classId,
            attr: {
              type: classId,
              style: "pointer-events:none",
              fill: fill,
              stroke: stroke,
              "xml:space": "preserve"
            },
            elements: svgDom.elements
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
      setFontAttribute: function (t) {
        if (t.elem.getAttribute("type") === classId) {
          l.walkTree(t.elem, function (e) {
            if (e.nodeName.toLowerCase() === 'input') {
              t.attr = t.attr.replace("text-anchor", "text-align")
              t.value = t.value.replace("end", "right").replace("middle", "center").replace("start", "left")
              e.style[t.attr] = t.value
            }
          })
        }
      },
      getFontAttribute: function (e) {
        if (e.elem.getAttribute("type") === classId) {
          var r = false;
          l.walkTree(e.elem, function (e) {
            if (e.nodeName.toLowerCase() === "button") {
              var t = e.style["text-align"];
              t = t.replace("right", "end").replace("center", "middle").replace("left", "start"), r = {
                fontSize: e.style["font-size"],
                fontFamily: e.style["font-family"],
                textAnchor: t
              }
            }
          })
          return r
        }
      }
    }
  }
}