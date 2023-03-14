
const name = 'html_button';

export default {
  name,
  async init () {
    const svgEditor = this
    const { svgCanvas } = svgEditor
    const width = 80;
    const height = 32;
    const mode = "html_button";
    const type = "svg-ext-" + mode;
    const prefix = "HXB_";
    const t = {};
    return {
      callback: function () {
        $("#html_button_panel").hide()
      },
      mouseDown: function (e) {
        if (svgCanvas.getMode() === mode) {
          const fill = svgCanvas.getColor("fill");
          const stroke = svgCanvas.getColor("stroke");
          const startX = e.start_x;
          const startY = e.start_y;
          let o = svgCanvas.getNextId();
          let a = svgCanvas.getNextId().replace("svg_", prefix);
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
                tag: "button",
                attr: {
                  id: "B-" + a,
                  class: "ant-btn ant-btn-default"
                },
                style: style += "font-family:sans-serif;"
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
          let c = svgCanvas.getNextId().replace("svg_", prefix)
          console.log(svgEditor)
          let g = svgEditor.addSvgGroupFromJson({
            group: "g",
            id: c,
            type: type,
            attr: {
              type: type,
              style: "pointer-events:none",
              fill: "rgba(0,0,0,0)",
              stroke: "rgba(0,0,0,0)",
              "xml:space": "preserve"
            },
            elements: svgDom.elements
          })
          return {started: true}
        }
      }
    }
  }
}