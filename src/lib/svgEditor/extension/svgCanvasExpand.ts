import { getTransformList } from "@/packages/svgcanvas/common/svgtransformlist";
import { transformPoint } from "@/packages/svgcanvas/core/math";
import { snapToGrid } from "@/packages/svgcanvas/core/utilities";
import { SvgEditor } from "../SvgEditor";

export class SvgCanvasListenerExpand {
  editor: SvgEditor;
  screenCTM: any;
  n: any;
  l: any;
  d: any;
  s: any;
  constructor(editor: SvgEditor, canvasDom) {
    this.editor = editor;
    this.screenCTM = undefined;
    this.n = null;
    this.l = null;
    this.d = null;
    this.s = null;
    $(canvasDom).mousedown(this.handleMouseDown)
  }

  handleMouseDown(event) {
    if (!this.editor.svgCanvas.spaceKey && event.button !== 1) {
      let flag = event.button === 2;
      this.screenCTM = $("#svgcontent g")[0].getScreenCTM().inverse()
      let transformPointValue = transformPoint(event.pageX, event.pageY, this.screenCTM);
      let scaleX = transformPointValue.x * this.editor.scale;
      let scaleY = transformPointValue.y * this.editor.scale;
      event.preventDefault()
      if (flag) {
        this.editor.current_mode = "select"
        this.editor.lastClickPoint = transformPointValue
      }

      let originalX = scaleX / this.editor.scale;
      let originalY = scaleY / this.editor.scale;
      let mouseTarget: any = this.editor.svgCanvas.getMouseTarget(event);
      if (mouseTarget.tagName === 'a') {
        mouseTarget.childNodes.length === 1 && (mouseTarget = mouseTarget.firstChild)
      }

      let warpX = originalX;
      this.l = this.n = originalX;
      let warpY = originalY;
      this.d = this.s = originalY;
      if (this.editor.svgCanvas.curConfig.gridSnapping) {
        originalX = snapToGrid(originalX)
        originalY = snapToGrid(originalY)
        this.n = snapToGrid(this.n);
        this.s = snapToGrid(this.s);
      }
      if (mouseTarget == this.editor.svgCanvas.selectorManager.selectorParentGroup && null != this.editor.S[0]) {
        let target = event.target
        let type = $.data(target, "type")
        if (type === 'rotate') {
          this.editor.current_mode = "rotate"
        } else if (type === "resize"){
          this.editor.current_mode = "resize"
          this.editor.current_resize_mode = $.data(target, "dir")
        }
        mouseTarget = this.editor.S[0]
      }
      let startTransform = mouseTarget.getAttribute("transform")
      let A, E, B =  getTransformList(mouseTarget)
      if (this.editor.current_mode === 'select') {
        this.editor.started = true
        this.editor.current_resize_mode = "none"
        flag && (this.editor.started = false);
        if (mouseTarget != this.editor.svgCanvas.svgroot) {
          
        }
      } else if (this.editor.current_mode === 'zoom') {

      } else if (this.editor.current_mode === 'resize') {
        
      } else if (['fhellipse', 'fhrect', 'fhpath'].indexOf(this.editor.current_mode) > -1) {
        
      } else if (this.editor.current_mode === 'image') {
        
      } else if (this.editor.current_mode === 'svg-image') {
        
      } else if (['square', 'rect'].indexOf(this.editor.current_mode) > -1) {
        
      } else if (this.editor.current_mode === 'line') {
        
      } else if (this.editor.current_mode === 'circle') {
        
      } else if (this.editor.current_mode === 'ellipse') {
        
      } else if (this.editor.current_mode === 'text') {
        
      }

    }
  }
}