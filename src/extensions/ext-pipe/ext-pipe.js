
const name = 'pipe';

export default {
  name,
  async init (arg) {
    const svgEditor = this
    const mode="pipe";
    const { svgCanvas } = svgEditor;
    const classId = "svg-ext-" + mode;
    const prefixId = "PIE_";
    return {
      initPipe: function (e) {
        if (!e || !e[0]) {
          return false;
        }

        let elem = document.getElementById(e[0].id);
        if (!elem) return false;

        let property = e[0].property;
        if (elem.nodeName == 'path') {
          var bbox = elem.getBBox(),
            dAttr = elem.getAttribute("d"),
            space = property.contentSpace + " " + property.contentSpace;
            
          elem.remove();
          let svgElements = [{
            type: "path",
            attr: {
              id: "b" + svgCanvas.getNextId().replace("svg_", prefixId),
              d: dAttr,
              "stroke-width": property.borderWidth,
              stroke: property.border,
              fill: "none"
            }},{
              type: "path",
              attr: {
                id: "p" + svgCanvas.getNextId().replace("svg_", prefixId),
                d: dAttr,
                "stroke-width": property.pipeWidth,
                stroke: property.pipe,
                fill: "none"
              }
            }, {
              type: "path",
              attr: {
                id: "c" + svgCanvas.getNextId().replace("svg_", prefixId),
                d: dAttr,
                "stroke-width": property.contentWidth,
                stroke: property.content,
                fill: "none",
                "stroke-dasharray": space
              }
            }]
          let nextId = svgCanvas.getNextId().replace("svg_", v);
          let svgAttr = {
            type: classId,
            x: bbox.x,
            y: bbox.y,
            style: "pointer-events:none"
          };
          $.extend(svgAttr, {
            "xml:space": "preserve"
          },{
            keep: true,
            element: svgEditor.addSvgGroupFromJson({
              group: "g",
              id: nextId,
              type: classId,
              attr: svgAttr,
              elements: svgElements
            }),
            started: false
          })
          return {
            started: false
          }
        }
        for (let index = 0; index < elem.childNodes.length; index++) {
          let node = elem.childNodes[index];
          if (node.id.indexOf("b"+ prefixId) >= 0) {
            node.setAttribute("stroke-width", property.borderWidth);
            node.setAttribute("stroke", property.border);
          }else if (node.id.indexOf("p"+ prefixId) >= 0) {
            node.setAttribute("stroke-width", property.pipeWidth);
            node.setAttribute("stroke", property.pipe);
          }else if (node.id.indexOf("c"+ prefixId) >= 0) {
            node.setAttribute("stroke-width", property.contentWidth), 
            node.setAttribute("stroke", property.content);
            node.setAttribute("stroke-dasharray", property.contentSpace + " " + property.contentSpace)
          }
        }
        return {
          keep: true,
          element: elem,
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