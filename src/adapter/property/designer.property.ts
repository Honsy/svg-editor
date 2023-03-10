import { Editor } from '@/lib/editor/editor'
import SvgCanvas from '@svgedit/svgcanvas'
import { SvgEditor } from '@/lib/svgEditor/SvgEditor'

const { $qa, $id, $click, isValidUnit, getTypeMap, convertUnit } = SvgCanvas

export default class DesignerProperty {
  editor: SvgEditor

  /**
   * @type {module}
   */
  get selectedElement() {
    return this.editor.selectedElement
  }

  constructor(editor: SvgEditor) {
    this.editor = editor
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
      'path_node_y'
    ]

    doms.map((item) => {
      if ($id(item)) {
        $id(item).addEventListener('change', this.attrChanger.bind(this))        
      }
    })
  }

  selectedChanged(win: any, elems: any) {
    console.log('dddd')
    const mode = this.editor.svgCanvas.getMode()
    if (mode === 'select') {
      // this.leftPanel.clickSelect()
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
  }
  // 同步选中节点属性
  updateContextPanel() {
    let elem = this.editor.selectedElement
    console.log('elem', elem)
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
    console.log($("#selected_panel"))
    if (elem) {
      const elname = elem.nodeName

      const angle = this.editor.svgCanvas.getRotationAngle(elem)
      $id('angle').value = angle

      const blurval = this.editor.svgCanvas.getBlur(elem) * 10
      $id('blur').value = blurval

      if (
        this.editor.svgCanvas.addedNew &&
        elname === 'image' &&
        this.editor.svgCanvas.getMode() === 'image' &&
        !this.editor.svgCanvas.getHref(elem).startsWith('data:')
      ) {
        /* await */ this.promptImgURL({ cancelDeletes: true })
      }
      
      if (!isNode && currentMode !== 'pathedit') {
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
          console.log(x, y)
          $id('selected_x').value = x || 0
          $id('selected_y').value = y || 0
          $('#xy_panel').hide();
        }
      } else {

      }
    
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

      if (panels[tagName]) {
        const curPanel = panels[tagName]
        $(`#${tagName}_panel`).show();
        curPanel.forEach(item => {
          let attrVal = elem.getAttribute(item)
          if (this.editor.configObj.curConfig.baseUnit !== 'px' && elem[item]) {
            const bv = elem[item].baseVal.value
            attrVal = convertUnit(bv)
          }
          $id(`${tagName}_${item}`).value = attrVal || 0
        })
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

    this.editor.svgCanvas.changeSelectedAttribute(attr, val)
    return true
  }
}
