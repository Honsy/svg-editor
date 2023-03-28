
const name = 'help-linear';

// 直标线
export default {
  name,
  async init (l) {
    console.log('init')
    const svgEditor = this
    const { svgCanvas } = svgEditor
    const stokeColor = "rgba(255, 0, 0, 0.5)";
    const useTypes = ["line", "path", "pipe"];
    let flag = false;
    const ownerDocument = document.getElementById("svgcanvas").ownerDocument;
    const canvasBackground = document.getElementById("canvasBackground");
    const startLine = ownerDocument.createElementNS(svgCanvas.NS.SVG, "line")
    const assignAttributes = svgCanvas.assignAttributes
    assignAttributes(startLine, 
      {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        "stroke-width": 1,
        stroke: stokeColor
      })
    const endLine = ownerDocument.createElementNS(svgCanvas.NS.SVG, "line")
    function reset() {
      flag = false;
      assignAttributes(startLine,{
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      })
      assignAttributes(endLine,{
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      })
    }
    assignAttributes(endLine, {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      "stroke-width": 1,
      stroke: stokeColor
    }), 
    canvasBackground.append(startLine)
    canvasBackground.append(endLine)

    return {
      callback: function () {},
      mouseDown: function (e) {
        const mode = svgCanvas.getMode(); 
        if (useTypes.indexOf(mode) > -1) {
          flag = true;
        } else {
          reset();
        }
      },
      mouseMove: function (e) {
        if (flag) {
          const mode = svgCanvas.getMode(); 
          if (useTypes.indexOf(mode) > -1) {
            const mouseX = e.mouse_x;
            const mouseY = e.mouse_y;
            const box = canvasBackground.getBBox()
            assignAttributes(startLine, {
              x1: mouseX,
              y1: 0,
              x2: mouseX,
              y2: box.height
            })
            assignAttributes(endLine, {
              x1: 0,
              y1: mouseY,
              x2: box.width,
              y2: mouseY
            })
          }
        }
      },
      mouseUp: function (e) {
        if (flag && "line" != svgCanvas.getMode()){
          return;
        }
        reset();
      },
    }
  }
}