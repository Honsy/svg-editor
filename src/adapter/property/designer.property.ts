import { Editor } from '@/lib/editor/editor'
import SvgCanvas from '@/packages/svgcanvas/svgcanvas'
import { SvgEditor } from '@/lib/svgEditor/SvgEditor'
import Designer from '../designer'
import { Events } from '@/events/event'

const { $qa, $id, $click, isValidUnit, getTypeMap, convertUnit } = SvgCanvas

export default class DesignerProperty {
  editor: SvgEditor
  designer: Designer

  /**
   * @type {module}
   */
  get selectedElement() {
    return this.editor.selectedElement
  }
  /**
   * @type {module}
   */
  get path () {
    return this.editor.svgCanvas.pathActions
  }


  constructor(designer: Designer) {
    this.designer = designer;
    this.editor = designer.editor
    this.editor.svgCanvas.bind('selected', this.selectedChanged.bind(this))
  }

  // 属性Dom改变监听 触发editor事件
  initPropertyListener(domIds?: string[]) {
    let doms = [
      'elem_id',
      'elem_class',
      'circle_cx',
      'circle_cy',
      'circle_r',
      'ellipse_cx',
      'ellipse_cy',
      'ellipse_rx',
      'ellipse_ry',
      'selected_x',
      'selected_y',
      'rect_width',
      'rect_height',
      'line_x1',
      'line_x2',
      'line_y1',
      'line_y2',
      'image_width',
      'image_height',
      'path_node_x',
      'path_node_y',
    ]

    doms.map((item) => {
      if ($id(item)) {
        $id(item).addEventListener('change', this.attrChanger.bind(this))        
      }
    })
    // 角度事件绑定
    $("#angle").SpinButton({
      min: -180,
      max: 180,
      step: 5,
      stateObj: this.editor,
      callback: this.handleAngleChange.bind(this)
    })
    // 线宽绑定
    $("#stroke_width").SpinButton({
      min: 0,
      max: 99,
      smallStep: .1,
      callback: this.handleStrokeWitdhChange.bind(this)
    })
    // 线条样式
    $("#stroke_style").change((e) => {
      this.editor.svgCanvas.setStrokeAttr("stroke-dasharray", $("#stroke_style").val());
    })
  }

  handleStrokeWitdhChange(e) {
    let value = e.value;
    if (value === 0 && this.selectedElement && ["line", "polyline"].indexOf(this.selectedElement.nodeName) >= 0) {
      value = e.value = 1;
    }
    this.editor.svgCanvas.setStrokeWidth(value)
  }

  handleAngleChange(e) {
    this.editor.svgCanvas.setRotationAngle(e.value)
  }

  selectedChanged(win: any, elems: any) {
    const mode = this.editor.svgCanvas.getMode()
    if (mode === 'select') {
      // this.leftPanel.clickSelect()
      this.designer.updateSelect();
    }
    const isNode = mode === 'pathedit'
    // if this.elems[1] is present, then we have more than one element
    this.editor.selectedElement = elems.length === 1 || !elems[1] ? elems[0] : null
    this.editor.multiselected = elems.length >= 2 && elems[1]
    if (this.selectedElement && !isNode) {
      // this.topPanel.update()
    } // if (elem)

    // Deal with pathedit mode
    // this.topPanel.togglePathEditMode(isNode, elems)
    this.updateContextPanel()
    this.editor.svgCanvas.runExtensions(
      'selectedChanged',
      /** @type {module:svgcanvas.SvgCanvas#event:ext_selectedChanged} */ {
        elems,
        selectedElement: this.selectedElement,
        multiselected: this.editor.multiselected
      }
    )

    let params = []
    if (this.editor.multiselected) {
      for (let index = 0; index < elems.length; index++) {
        if (elems[index]) {
          params.push({
            id: elems[index].id,
            type:elems[index].getAttribute("type")
          })
        }
      }
      this.designer.trigger(Events.EDITOR_SELECT_ELEMENT, {elems: params})
    } else {
      if (this.selectedElement) {
        params.push({id: this.selectedElement.id, type: this.selectedElement.getAttribute('type')})
        this.designer.trigger(Events.EDITOR_SELECT_ELEMENT, {elems: params})
      } else {
        this.designer.trigger(Events.EDITOR_SELECT_ELEMENT, null)
      }
    }
  }
  // 同步选中节点属性
  updateContextPanel() {
    let elem = this.editor.selectedElement
    // If element has just been deleted, consider it null
    if (!elem?.parentNode) {
      elem = null
    }
    const currentLayerName = this.editor.svgCanvas
      .getCurrentDrawing()
      .getCurrentLayerName()
    const currentMode = this.editor.svgCanvas.getMode()
    const unit =
      this.editor.configObj.curConfig.baseUnit !== 'px'
        ? this.editor.configObj.curConfig.baseUnit
        : null

    const isNode = currentMode === 'pathedit' 

    $("#selected_panel, #multiselected_panel, #threemoreselected_panel, #g_panel, #rect_panel, #circle_panel,#ellipse_panel, #line_panel, #text_panel, #image_panel, #container_panel, #use_panel, #a_panel, #xy_panel, #marker_panel, #htmlctrl_panel, #tool_stroke, #tool_angle, #shape_panel").hide();
    if (elem) {
      const elname = elem.nodeName
      $("#tool_angle").show();
      const angle = this.editor.svgCanvas.getRotationAngle(elem)
      $('#angle').val(angle)

      const blurval = Number(this.editor.svgCanvas.getBlur(elem)) * 10
      $('#blur').val(blurval)
      // $("#blur_slider").slider("option", "value", blurval)
      if (
        this.editor.svgCanvas.addedNew &&
        elname === 'image' &&
        this.editor.svgCanvas.getMode() === 'image' &&
        !this.editor.svgCanvas.getHref(elem).startsWith('data:')
      ) {
        /* await */ this.promptImgURL({ cancelDeletes: true })
      }
      
      if (currentMode === 'pathedit') {
        const point = this.path.getNodePoint()
        $("#tool_add_subpath").removeClass("push_button_pressed").addClass("tool_button")
        $("#tool_node_delete").toggleClass("disabled", !this.path.canDeleteNodes)
        if (point) {
          const segType = $('#seg_type')
          if (unit) {
            point.x = convertUnit(point.x)
            point.y = convertUnit(point.y)
          }
          $('#path_node_x').value = point.x
          $('#path_node_y').value = point.y
          if (point.type) {
            segType.value = point.type
            segType.removeAttr('disabled')
          } else {
            segType.value = 4
            segType.attr('disabled', 'disabled')
          }
        }
      }
      $("#selected_panel").show();
      if (['line', 'circle', 'ellipse'].includes(elname)) {
        $('#selected_panel').hide();
      } else {
        let x
        let y

        // Get BBox vals for g, polyline and path
        if (['g', 'polyline', 'path'].includes(elname)) {
          const bb = this.editor.svgCanvas.getStrokedBBox([elem])
          if (bb) {
            ;({ x, y } = bb)
          }
        } else {
          x = elem.getAttribute('x')
          y = elem.getAttribute('y')
        }

        if (unit) {
          x = convertUnit(x)
          y = convertUnit(y)
        }
        elem.getAttribute("width"); 
        elem.getAttribute("heght")
        x = Number.parseFloat(x);
        y = Number.parseFloat(y);
        x = x.toFixed(Number.isInteger(x) ? 0 : 2)
        y = y.toFixed(Number.isInteger(y) ? 0 : 2)
        $('#selected_x').val(x || 0)
        $('#selected_y').val(y || 0)
        $('#xy_panel').show();

        // if (this.editor.customPrefixIds.indexOf(t.id.substr(0, 4)) >= 0) {
        // var y = svgedit.utilities.getBBox(t);
        // e("#htmlctrl_panel").show(), e("#htmlctrl_width").val(y.width || 0), e("#htmlctrl_height").val(y.height || 0)
        // }
      }
      var isImg = ["image", "text", "path", "g", "use"].indexOf(currentMode) === -1;
      $("#tool_topath").toggle(isImg);
      $("#tool_reorient").toggle("path" === elname);
      $("#tool_reorient").toggleClass("disabled", 0 === angle);
      // update contextual tools here
      const panels = {
        g: [],
        a: [],
        rect: ['rx', 'width', 'height'],
        image: ['width', 'height'],
        circle: ['cx', 'cy', 'r'],
        ellipse: ['cx', 'cy', 'rx', 'ry'],
        line: ['x1', 'y1', 'x2', 'y2'],
        text: [],
        use: []
      }

      const { tagName } = elem

      let linkHref = null
      if (tagName === 'a') {
        linkHref = this.editor.svgCanvas.getHref(elem)
        $('#g_panel').show();
      }

      if (tagName === elem.parentNode.tagName) {
        $(elem).siblings().length
        $("#a_panel").show();
        linkHref = this.editor.svgCanvas.getHref(elem.parentNode)
      }
      $("#tool_make_link, #tool_make_link").toggle(!linkHref), 
      linkHref && $("#link_url").val(linkHref)

      let S = false;

      if (panels[tagName]) {
        const curPanel = panels[tagName]
        const type = elem.getAttribute("type");
        if (type && type.indexOf("svg-ext") === 0) {
          S = true;
        } else {
          $("#" + tagName + "_panel").show()
        }
        curPanel.forEach(item => {
          let attrVal = elem.getAttribute(item)
          if (this.editor.configObj.curConfig.baseUnit !== 'px' && elem[item]) {
            const bv = elem[item].baseVal.value
            attrVal = convertUnit(bv)
          }
          $id(`${tagName}_${item}`).value = attrVal || 0
        })

        // var A = "g" === x && f.indexOf(t.id.substr(0, 4)) >= 0;
        // if ("text" == x || A) {
        //     if (e("#text_panel").css("display", "inline"), u.getItalic() ? e("#tool_italic").addClass("push_button_pressed").removeClass("tool_button") : e("#tool_italic").removeClass("push_button_pressed").addClass("tool_button"), u.getBold() ? e("#tool_bold").addClass("push_button_pressed").removeClass("tool_button") : e("#tool_bold").removeClass("push_button_pressed").addClass("tool_button"), e("#font_family").val(t.getAttribute("font-family")), e("#font_size").val(t.getAttribute("font-size")), e("#text_anchor").val(t.getAttribute("text-anchor")), A) {
        //         var L = u.getExtensionFont(t);
        //         L && (L.fontFamily && e("#font_family").val(L.fontFamily), L.fontSize && e("#font_size").val(L.fontSize.replace("px", "")), L.textAnchor && e("#text_anchor").val(L.textAnchor))
        //     }
        //     e("#text").val(t.textContent), u.addedNew && !A && setTimeout(function () {
        //         e("#text").focus().select()
        //     }, 100)
        // } else "image" == x ? he(u.getHref(t)) : "g" === x || "use" === x ? (e("#container_panel").show(), u.getTitle()) : "line" === x && e("#marker_panel").show()
      }
    }
  }

    /**
   * @param {PlainObject} [opts={}]
   * @param {boolean} [opts.cancelDeletes=false]
   * @returns {void} Resolves to `undefined`
   */
    promptImgURL ({ cancelDeletes = false } = {}) {
      let curhref = this.editor.svgCanvas.getHref(this.editor.selectedElement)
      curhref = curhref.startsWith('data:') ? '' : curhref
      const url = prompt(
        'notification.enterNewImgURL',
        curhref
      )
      if (url) {
        this.setImageURL(url)
      } else if (cancelDeletes) {
        this.editor.svgCanvas.deleteSelectedElements()
      }
    }

    setImageURL (url) {

    }
  /**
   * 属性更改
   * @type {module}
   */
  attrChanger(e: any) {
    const attr = e.target.getAttribute('data-attr')
    let val = e.target.value
    const valid = isValidUnit(attr, val, this.selectedElement)

    if (!valid) {
      e.target.value = this.selectedElement.getAttribute(attr)
      alert('notification.invalidAttrValGiven')
      return false
    }

    if (attr !== 'id' && attr !== 'class') {
      if (isNaN(val)) {
        val = this.editor.svgCanvas.convertToNum(attr, val)
      } else if (this.editor.configObj.curConfig.baseUnit !== 'px') {
        // Convert unitless value to one with given unit

        const unitData = getTypeMap()

        if (this.editor.selectedElement[attr] || this.editor.svgCanvas.getMode() === 'pathedit' || attr === 'x' || attr === 'y') {
          val *= unitData[this.editor.configObj.curConfig.baseUnit]
        }
      }
    }

    this.editor.svgCanvas.changeSelectedAttribute(attr, val, null)
    return true
  }
}
