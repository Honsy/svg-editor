/**
 * @file ext-iot_polyline.js
 *
 * @license MIT
 *
 * @copyright 2010 Alexis Deveria
 *
 */

/**
* This is a very basic SVG-Edit extension. It adds a "Hello World" button in
*  the left ("mode") panel. Clicking on the button, and then the canvas
*  will show the user the point on the canvas that was clicked on.
*/

const name = 'iot_polyline'


export default {
  name,
  async init ({ _importLocale }) {
    const mode = "iot_polyline";
    const polylineType = 'iotPolyLine';
    const svgEditor = this
    const { svgCanvas } = svgEditor
    const { $id, $click, getElement } = svgCanvas
    const { ChangeElementCommand, InsertElementCommand } = svgCanvas.history
    const addToHistory = (cmd) => { svgCanvas.undoMgr.addCommandToHistory(cmd) }
    const svgRoot = svgCanvas.getSvgRoot()
    const {curConfig: {initStroke}} = svgCanvas;
    const addElem = svgCanvas.addSVGElementsFromJson
    let curLine,curSelectPoint,dragPoints = [],startX,startY,started = false, nextId, selectorPolylineGripsGroup;
    let pointShowFlag = false;

    function setPoint (elem, pos, x, y, setMid) {
      const pts = elem.points;
      const pt = svgroot.createSVGPoint();
      pt.x = x;
      pt.y = y;
      if (pos === 'end') { pos = pts.numberOfItems - 1; }
      
      // TODO: Test for this on init, then use alt only if needed
      try {
        pts.replaceItem(pt, pos);
      } catch (err) {
        // Should only occur in FF which formats points attr as "n,n n,n", so just split
        const ptArr = elem.getAttribute('points').split(' ');
        for (let i = 0; i < ptArr.length; i++) {
          if (i === pos) {
            ptArr[i] = x + ',' + y;
          }
        }
        elem.setAttribute('points', ptArr.join(' '));
      }

      if (setMid) {
        // Add center point
        const ptStart = pts.getItem(0);
        const ptEnd = pts.getItem(pts.numberOfItems - 1);

        setPoint(elem, 1, (ptEnd.x + ptStart.x) / 2, ptStart.y);
        setPoint(elem, 2, (ptEnd.x + ptStart.x) / 2, ptEnd.y);
      }
    }

    function generalCircle(x, y, dir, cursor) {
      const circle = svgCanvas.createSVGElement({
        element: 'circle',
        attr: { 
          type: 'iotPolyLinePoint',
          cx: x,
          cy: y,
          dir,
          r: '4',
          fill: "aqua",
          "stroke-width": "2",
          cursor: cursor
        }
      })

      return circle
    }
    // function handlePolylineMove(e) {
    //   console.log(e)
    // }
    function hideDragPoint() {
      pointShowFlag = false
      selectorPolylineGripsGroup && selectorPolylineGripsGroup.setAttribute("display", "none")
    }

    function showDragPoint() {
      pointShowFlag = true;
      selectorPolylineGripsGroup && selectorPolylineGripsGroup.setAttribute("display", "inline")
      showOtherDragPoint();
    }
    // 隐藏除当前拖拽节点外的其他的节点
    function hideOtherDragPoint(index) {
      dragPoints.map((item,dIndex) => {
        if (dIndex !== index) {
          item.setAttribute('display', 'none')
        } else {
          item.setAttribute('display', 'inline')
        }
      })
    }

    function showOtherDragPoint(index) {
      dragPoints.map((item,dIndex) => {
        item.setAttribute('display', 'inline')
      })
    }

    function setDragPoint(elem) {
      const pts = elem.points;
      const ptArr = elem.getAttribute('points').split(' ');

      if (!selectorPolylineGripsGroup) {
        selectorPolylineGripsGroup = svgCanvas.createSVGElement({
          element: 'g',
          attr: { id: 'selectorPolylineGroup', display: 'none' }
        })
        // selectorPolylineGripsGroup.addEventListener('mousemove', handlePolylineMove)
        getElement('selectorParentGroup').append(selectorPolylineGripsGroup) 
      }
      showDragPoint();

      if (!dragPoints.length) {
        for (let index = 0; index < pts.numberOfItems - 1; index++) {
          const element = pts.getItem(index);
          const nextElement = pts.getItem(index + 1)
          const x = (element.x + nextElement.x) / 2
          const y = (element.y + nextElement.y) / 2
          // 起始点追加在前
          if (index == 0) {
            const circle = generalCircle(element.x, element.y, 'start', 'all-scroll')
            selectorPolylineGripsGroup.append(circle)
            dragPoints.push(circle)
          } 
          const dir = index % 2 === 0 ? 'horizon' : 'vertical'
          const cursor = index % 2 === 0 ? 'row-resize' : 'col-resize'
          const circle = generalCircle(x, y, dir, cursor)
          dragPoints.push(circle)
          selectorPolylineGripsGroup.append(circle)
          // 终点追加在后
          if (index == pts.numberOfItems - 2) {
            const circle = generalCircle(nextElement.x, nextElement.y, 'end', 'all-scroll')
            selectorPolylineGripsGroup.append(circle)
            dragPoints.push(circle)
          }
        } 
      } else {
        // 重置中间点位
        for (let index = 0; index < pts.numberOfItems - 1; index++) {
          const element = pts.getItem(index);
          const nextElement = pts.getItem(index + 1)
          const x = (element.x + nextElement.x) / 2
          const y = (element.y + nextElement.y) / 2
          const dragPoint = dragPoints[index + 1]
          dragPoint.setAttribute('cx', x)
          dragPoint.setAttribute('cy', y)
        }
        // 重置起终点
        const firstElement = pts.getItem(0);
        const lastElement = pts.getItem(pts.numberOfItems - 1)
        dragPoints[0].setAttribute('cx', firstElement.x)
        dragPoints[0].setAttribute('cy', firstElement.y)
        dragPoints[dragPoints.length - 1].setAttribute('cx', lastElement.x)
        dragPoints[dragPoints.length - 1].setAttribute('cy', lastElement.y)
      }
    }
    // 更新折线
    function updatePolyline(polyline, curPoint, x, y) {

      const pts = polyline.points;
      const ptArr = polyline.getAttribute('points');
      const dir = curPoint.getAttribute('dir')
      const dragIndex = dragPoints.indexOf(curPoint);
      // const releativeIndex = index > 
      hideOtherDragPoint(dragIndex)
      // 起终点可上下左右 中间点只能上下或者左右
      if (dir === 'start' || dir === 'end') {
        const pos = dir === 'start' ? 0 : pts.numberOfItems - 1;
        const neighborPos = dir === 'start' ? pos + 1 : pos - 1;
        const neightborPoint = pts[neighborPos];
        curPoint.setAttribute('cx', x);
        curPoint.setAttribute('cy', y);


        // neightborPoint.setAttribute()
        const pt = svgroot.createSVGPoint();
        pt.x = x;
        pt.y = y;
        const neighborPt = svgroot.createSVGPoint();
        neighborPt.x = neightborPoint.x;
        neighborPt.y = y;

        pts.replaceItem(pt, pos);
        pts.replaceItem(neighborPt, neighborPos);
      } else {
        const beforePtIndex = dragIndex - 1;
        const afterIndex = dragIndex;
        const beforePt = pts[beforePtIndex]
        const afterPt = pts[afterIndex]
        if (dir === 'horizon') {
          beforePt.y = y;
          afterPt.y = y;
          curPoint.setAttribute('cy', y);
        } else {
          beforePt.x = x;
          afterPt.x = x;
          curPoint.setAttribute('cx', x);
        }
      }

      // addToHistory(new ChangeElementCommand(polyline, { points: ptArr }))
    }
    // update the dummy transform in our transform list
    // to be a translate. We need to check if there was a transformation
    // to avoid loosing it
    function updateTransformList(svgRoot, element, dx, dy) {
      const xform = svgRoot.createSVGTransform()
      xform.setTranslate(dx, dy)
      const tlist = element.transform?.baseVal
      if (tlist.numberOfItems) {
        const firstItem = tlist.getItem(0)
        if (firstItem.type === 2) { // SVG_TRANSFORM_TRANSLATE = 2
          tlist.replaceItem(xform, 0)
        } else {
          tlist.insertItemBefore(xform, 0)
        }
      } else {
        tlist.appendItem(xform)
      }
    }

    return {
      name: name,
      callback () {},
      mouseDown (opts) {
        const e = opts.event;
        startX = opts.start_x;
        startY = opts.start_y;
        nextId = svgCanvas.getNextId();

        // 开始拖拽点位
        if (e.target.getAttribute('type') == 'iotPolyLinePoint') {
          curSelectPoint = e.target;
        }
        // 绘制逻辑
        if (svgCanvas.getMode() === 'iot_polyline') {
          started = true;
          if (!curLine) {
            curLine = addElem({
              element: 'polyline',
              attr: {
                type: 'iotPolyLine',
                id: nextId,
                points: (startX + ',' + startY + ' ' + startX + ',' + startY + ' ' + startX + ',' + startY + ' ' + startX + ',' + startY),
                stroke: '#' + initStroke.color,
                'stroke-width': initStroke.width,
                fill: 'none',
                opacity: initStroke.opacity,
                style: 'pointer-events:inherit'
              }
            })
          } else {
            svgCanvas.call('selected', [curLine])
            addToHistory(new InsertElementCommand(curLine))
            // 二次点击拖拽结束 并且选中该拽节点
            curLine = null;
            started = false;
            return { started: false }
          }
        }

        // 如果是选中模式下的触发 此处修改了svgedit源码
        if (svgCanvas.getMode() === 'select' && e.selected && e.selected.getAttribute('type') === polylineType) {
          if (!pointShowFlag) {
            showDragPoint();
          }
        }

        return { keep: true, started: true }
      },
      // 鼠标移
      mouseMove (opts) {
        const zoom = svgCanvas.getZoom();
        // const e = opts.event;
        const x = opts.mouse_x / zoom;
        const y = opts.mouse_y / zoom;
        const mode = svgCanvas.getMode();
        const selected = opts.selected
        // 如果单个点Move后 后续操作不触发
        if (curSelectPoint && selected) {
          updatePolyline(selected, curSelectPoint, x, y)
          svgCanvas.selectorManager.requestSelector(selected).resize()
          return;
        }
        if (selected && selected.getAttribute('type') == polylineType) {
          const selectedElements = svgCanvas.getSelectedElements()
          let dx = x - svgCanvas.getStartX()
          let dy = y - svgCanvas.getStartY()
          // svgCanvas.call('transition', selectedElements)
          selectedElements.forEach((el) => {
            if (el) {
              updateTransformList(svgRoot, el, dx, dy)
              // update our internal bbox that we're tracking while dragging
              svgCanvas.selectorManager.requestSelector(el).resize()
            }
          })
          svgCanvas.call('transition', selectedElements)
          hideDragPoint()
        }
        if (mode === 'iot_polyline' && started) {
          setPoint(curLine, 'end', x, y, true);
        }
      },
      // 鼠标起
      mouseUp (opts) {
        const currentMode = svgCanvas.getMode()
        if (curSelectPoint) {
          curSelectPoint = null;
        }
        if (currentMode !== mode) {
          if (currentMode === "select" && opts && opts.selected && opts.selected.getAttribute('type') === polylineType) {
            svgCanvas.recalculateDimensions(opts.selected);
            return opts.selected.id
          } else {
            return undefined;
          }
        } else {
          return {
            started: true,
            element: null,
            keep: true
          }
        }
      },
      // 节点选中
      selectedChanged(opts) {
        const selectedElement = opts.selectedElement;
        const currentMode = svgCanvas.getMode()
        // 如果节点选中不存在 且当前折线点存在 隐藏折线点
        if (!selectedElement && pointShowFlag) {
          hideDragPoint();
        }
        if (selectedElement && currentMode == 'select') {
          const type = selectedElement.getAttribute('type');
          if (type === polylineType) {
            setDragPoint(selectedElement);
          } else {
            hideDragPoint()
          }
        }
      }
    }
  }
}
