import ConfigObj from './ConfigObj'
import { SvgEditorStartup } from './SvgEditorStartup'
import { isMac } from '@svgedit/svgcanvas/common/browser'
import { isValidUnit } from '@svgedit/svgcanvas/core/units'
import { assignAttributes, cleanupElement, getElement, init } from '@svgedit/svgcanvas/core/utilities'

import SvgCanvas from '@svgedit/svgcanvas'
import { NS } from '@svgedit/svgcanvas/core/namespaces'
import { merge } from 'lodash'
import { emitter } from './utils/event'

const { $id, $click, decode64, blankPageObjectURL } = SvgCanvas

export class SvgEditor extends SvgEditorStartup {
  currentMode: string
  lastClickPoint: number
  shapeProperty: any
  loadFromDataURI(source: any) {
    throw new Error('Method not implemented.')
  }
  loadFromString(source: any) {
    throw new Error('Method not implemented.')
  }
  loadFromURL(url: any) {
    throw new Error('Method not implemented.')
  }
  declare svgCanvas: SvgCanvas
  langChanged: boolean
  showSaveWarning: boolean
  declare storagePromptState: string
  title: string
  $click: any
  isReady: boolean
  customExportImage: boolean
  customExportPDF: boolean
  setConfig: any
  callbacks: any[]
  curContext: null
  exportWindowName: null
  docprops: boolean
  canvMenu: null
  goodLangs: string[]
  shortcuts: ({ key: string; fn: () => void } | { key: (string | boolean)[]; fn: () => void })[]
  multiselected: any
  leftPanel: any
  bottomPanel: any
  topPanel: any
  layersPanel: any
  mainMenu: any
  constructor(div: HTMLDivElement) {
    super(div)
    this.langChanged = false
    this.showSaveWarning = false
    /**
     * Will be set to a boolean by `ext-storage.js`
     * @type {"ignore"|"waiting"|"closed"}
     */
    this.storagePromptState = 'ignore'
    /**
     * document title
     */
    this.title = 'untitled.svg'

    this.lastClickPoint = 0
    this.currentMode = ''
    this.svgCanvas = null
    this.$click = $click
    this.isReady = false
    this.customExportImage = false
    this.customExportPDF = false
    this.configObj = new ConfigObj(this)
    this.configObj.pref = this.configObj.pref.bind(this.configObj)
    this.setConfig = this.configObj.setConfig.bind(this.configObj)
    this.callbacks = []
    this.curContext = null
    this.exportWindowName = null
    this.docprops = false
    this.configObj.preferences = false
    this.canvMenu = null
    this.goodLangs = ['ar', 'cs', 'de', 'en', 'es', 'fa', 'fr', 'fy', 'hi', 'it', 'ja', 'nl', 'pl', 'pt-BR', 'ro', 'ru', 'sk', 'sl', 'sv', 'tr', 'uk', 'zh-CN', 'zh-TW']
    this.shapeProperty = {
      shape: {
        fill: ('none' == this.configObj.curConfig.initFill.color ? '' : '#') + this.configObj.curConfig.initFill.color,
        fill_paint: null,
        fill_opacity: this.configObj.curConfig.initFill.opacity,
        stroke: '#' + this.configObj.curConfig.initStroke.color,
        stroke_paint: null,
        stroke_opacity: this.configObj.curConfig.initStroke.opacity,
        stroke_width: this.configObj.curConfig.initStroke.width,
        stroke_dasharray: 'none',
        stroke_linejoin: 'miter',
        stroke_linecap: 'butt',
        opacity: this.configObj.curConfig.initOpacity
      }
    }
    this.shapeProperty.text = merge(this.shapeProperty.shape, {
      fill: '#000000',
      stroke_width: 0,
      font_size: 14,
      font_family: 'sans-serif',
      text_anchor: 'middle'
    })

    const modKey = isMac() ? 'meta+' : 'ctrl+'
    this.shortcuts = [
      // Shortcuts not associated with buttons
      {
        key: 'ctrl+arrowleft',
        fn: () => {
          this.rotateSelected(0, 1)
        }
      },
      {
        key: 'ctrl+arrowright',
        fn: () => {
          this.rotateSelected(1, 1)
        }
      },
      {
        key: 'ctrl+shift+arrowleft',
        fn: () => {
          this.rotateSelected(0, 5)
        }
      },
      {
        key: 'ctrl+shift+arrowright',
        fn: () => {
          this.rotateSelected(1, 5)
        }
      },
      {
        key: 'shift+o',
        fn: () => {
          this.svgCanvas.cycleElement(false)
        }
      },
      {
        key: 'shift+p',
        fn: () => {
          this.svgCanvas.cycleElement(true)
        }
      },
      {
        key: 'tab',
        fn: () => {
          this.svgCanvas.cycleElement(false)
        }
      },
      {
        key: 'shift+tab',
        fn: () => {
          this.svgCanvas.cycleElement(true)
        }
      },
      {
        key: [modKey + 'arrowup', true],
        fn: () => {
          this.zoomImage(2)
        }
      },
      {
        key: [modKey + 'arrowdown', true],
        fn: () => {
          this.zoomImage(0.5)
        }
      },
      {
        key: [modKey + ']', true],
        fn: () => {
          this.moveUpDownSelected('Up')
        }
      },
      {
        key: [modKey + '[', true],
        fn: () => {
          this.moveUpDownSelected('Down')
        }
      },
      {
        key: ['arrowup', true],
        fn: () => {
          this.moveSelected(0, -1)
        }
      },
      {
        key: ['arrowdown', true],
        fn: () => {
          this.moveSelected(0, 1)
        }
      },
      {
        key: ['arrowleft', true],
        fn: () => {
          this.moveSelected(-1, 0)
        }
      },
      {
        key: ['arrowright', true],
        fn: () => {
          this.moveSelected(1, 0)
        }
      },
      {
        key: 'shift+arrowup',
        fn: () => {
          this.moveSelected(0, -10)
        }
      },
      {
        key: 'shift+arrowdown',
        fn: () => {
          this.moveSelected(0, 10)
        }
      },
      {
        key: 'shift+arrowleft',
        fn: () => {
          this.moveSelected(-10, 0)
        }
      },
      {
        key: 'shift+arrowright',
        fn: () => {
          this.moveSelected(10, 0)
        }
      },
      {
        key: ['alt+arrowup', true],
        fn: () => {
          this.svgCanvas.cloneSelectedElements(0, -1)
        }
      },
      {
        key: ['alt+arrowdown', true],
        fn: () => {
          this.svgCanvas.cloneSelectedElements(0, 1)
        }
      },
      {
        key: ['alt+arrowleft', true],
        fn: () => {
          this.svgCanvas.cloneSelectedElements(-1, 0)
        }
      },
      {
        key: ['alt+arrowright', true],
        fn: () => {
          this.svgCanvas.cloneSelectedElements(1, 0)
        }
      },
      {
        key: ['alt+shift+arrowup', true],
        fn: () => {
          this.svgCanvas.cloneSelectedElements(0, -10)
        }
      },
      {
        key: ['alt+shift+arrowdown', true],
        fn: () => {
          this.svgCanvas.cloneSelectedElements(0, 10)
        }
      },
      {
        key: ['alt+shift+arrowleft', true],
        fn: () => {
          this.svgCanvas.cloneSelectedElements(-10, 0)
        }
      },
      {
        key: ['alt+shift+arrowright', true],
        fn: () => {
          this.svgCanvas.cloneSelectedElements(10, 0)
        }
      },
      {
        key: ['delete/backspace', true],
        fn: () => {
          if (this.selectedElement || this.multiselected) {
            this.svgCanvas.deleteSelectedElements()
          }
        }
      },
      {
        key: 'a',
        fn: () => {
          this.svgCanvas.selectAllInCurrentLayer()
        }
      },
      {
        key: modKey + 'a',
        fn: () => {
          this.svgCanvas.selectAllInCurrentLayer()
        }
      },
      {
        key: modKey + 'x',
        fn: () => {
          this.cutSelected()
        }
      },
      {
        key: modKey + 'c',
        fn: () => {
          this.copySelected()
        }
      },
      {
        key: modKey + 'v',
        fn: () => {
          this.pasteInCenter()
        }
      }
    ]
    // this.leftPanel = new LeftPanel(this)
    // this.bottomPanel = new BottomPanel(this)
    // this.topPanel = new TopPanel(this)
    // this.layersPanel = new LayersPanel(this)
    // this.mainMenu = new MainMenu(this)
    // makes svgEditor accessible as a global variable
    window.svgEditor = this
  }

  /**
   *
   * @param {string} str SVG string
   * @param {PlainObject} [opts={}]
   * @param {boolean} [opts.noAlert]
   * @throws {Error} Upon failure to load SVG
   * @returns {void}
   */
  loadSvgString(str: string, { noAlert }: any = {}) {
    const success = this.svgCanvas.setSvgString(str) !== false
    if (success) {
      this.updateCanvas()
      return
    }
    // if (!noAlert) seAlert(this.i18next.t('notification.errorLoadingSVG'))
    throw new Error('Error loading SVG')
  }

  /**
   * Queues a callback to be invoked when the editor is ready (or
   *   to be invoked immediately if it is already ready--i.e.,
   *   if `runCallbacks` has been run).
   * @function module:SVGthis.ready
   * @param {module:SVGthis.ReadyCallback} cb Callback to be queued to invoke
   * @returns {Promise<ArbitraryCallbackResult>} Resolves when all callbacks, including the supplied have resolved
   */
  ready(cb: any) {
    return new Promise((resolve, reject) => {
      if (this.isReady) {
        resolve(cb())
        return
      }
      this.callbacks.push([cb, resolve, reject])
    })
  }
  rotateSelected(arg0: number, arg1: number) {
    throw new Error('Method not implemented.')
  }
  zoomImage(multiplier: number) {
    const resolution = this.svgCanvas.getResolution()
    multiplier = multiplier ? resolution.zoom * multiplier : 1
    // setResolution(res.w * multiplier, res.h * multiplier, true);
    $id('zoom').value = (multiplier * 100).toFixed(1)
    this.svgCanvas.setCurrentZoom(multiplier)
    this.zoomDone()
    this.updateCanvas(true)
  }
  /**
   * @function module:SVGthis.updateCanvas
   * @param {boolean} center
   * @param {module:math.XYObject} newCtr
   * @returns {void}
   */
  updateCanvas(center?: any, newCtr?: any) {
    console.log('updateCanvas')
    const zoom = this.svgCanvas.getZoom()
    const { workarea } = this
    const cnvs = $id('svgcanvas')

    let w = parseFloat(getComputedStyle(workarea, null).width.replace('px', ''))
    let h = parseFloat(getComputedStyle(workarea, null).height.replace('px', ''))
    const wOrig = w
    const hOrig = h
    const oldCtr = {
      x: workarea.scrollLeft + wOrig / 2,
      y: workarea.scrollTop + hOrig / 2
    }
    const multi = this.configObj.curConfig.canvas_expansion
    w = Math.max(wOrig, this.svgCanvas.contentW * zoom * multi)
    h = Math.max(hOrig, this.svgCanvas.contentH * zoom * multi)

    if (w === wOrig && h === hOrig) {
      workarea.style.overflow = 'hidden'
    } else {
      workarea.style.overflow = 'scroll'
    }

    const oldCanY = parseFloat(getComputedStyle(cnvs, null).height.replace('px', '')) / 2
    const oldCanX = parseFloat(getComputedStyle(cnvs, null).width.replace('px', '')) / 2

    cnvs.style.width = w + 'px'
    cnvs.style.height = h + 'px'
    const newCanY = h / 2
    const newCanX = w / 2
    const offset = this.svgCanvas.updateCanvas(w, h)

    const ratio = newCanX / oldCanX

    const scrollX = w / 2 - wOrig / 2
    const scrollY = h / 2 - hOrig / 2

    if (!newCtr) {
      const oldDistX = oldCtr.x - oldCanX
      const newX = newCanX + oldDistX * ratio

      const oldDistY = oldCtr.y - oldCanY
      const newY = newCanY + oldDistY * ratio

      newCtr = {
        x: newX,
        y: newY
      }
    } else {
      newCtr.x += offset.x
      newCtr.y += offset.y
    }

    if (center) {
      // Go to top-left for larger documents
      if (this.svgCanvas.contentW > parseFloat(getComputedStyle(workarea, null).width.replace('px', ''))) {
        // Top-left
        workarea.scrollLeft = offset.x - 10
        workarea.scrollTop = offset.y - 10
      } else {
        // Center
        workarea.scrollLeft = scrollX
        workarea.scrollTop = scrollY
      }
    } else {
      workarea.scrollLeft = newCtr.x - wOrig / 2
      workarea.scrollTop = newCtr.y - hOrig / 2
    }
    if (this.configObj.curConfig.showRulers) {
      this.rulers.updateRulers(cnvs, zoom)
      workarea.scroll()
    }

    if (this.configObj.urldata.storagePrompt !== true && this.storagePromptState === 'ignore') {
      if ($id('dialog_box') != null) $id('dialog_box').style.display = 'none'
    }
  }
  /**
   * @returns {void}
   */
  zoomDone() {
    for (const el of this.svgCanvas.selectedElements) {
      this.svgCanvas.selectorManager.requestSelector(el).resize()
    }
    this.updateWireFrame()
  }
  setColor(color, alfa, type) {}
  setDocProperty(name, width, height, bkColor) {
    const widthFlag = !(width != 'fit' && !isValidUnit('width', width))
    const heightFlag = !(height != 'fit' && !isValidUnit('height', height))
    if (widthFlag && heightFlag) {
      this.svgCanvas.setResolution(width, height)
    }

    if (!bkColor) {
      bkColor = '#fff'
    }
    this.svgCanvas.setBackground(bkColor)
    this.updateCanvas()
  }
  setSvgString(svg: string) {
    this.svgCanvas.setSvgString(svg)
  }

  clickClearAll() {
    const dimensions = this.svgCanvas.curConfig.dimensions
    this.svgCanvas.clear()
    console.log(this.svgCanvas)
  }
  /**
   *
   * @param {string} color
   * @param {string} url
   * @returns {void}
   */
  setBackground(color: any, url: any) {
    // if (color == this.configObj.pref('bkgd_color') && url == this.configObj.pref('bkgd_url')) { return; }
    this.configObj.pref('bkgd_color', color)
    this.configObj.pref('bkgd_url', url, true)

    // This should be done in  this.svgCanvas.js for the borderRect fill
    this.svgCanvas.setBackground(color, url)
  }
  /**
   *
   * @returns {void}
   */
  updateWireFrame() {
    const rule = `
      #workarea.wireframe #svgcontent * {
        stroke-width: ${1 / this.svgCanvas.getZoom()}px;
      }
    `
    if (document.querySelectorAll('#wireframe_rules').length > 0) {
      const wireframe_rules = document.querySelector('#wireframe_rules')
      if (wireframe_rules) {
        wireframe_rules.textContent = this.workarea.classList.contains('wireframe') ? rule : ''
      }
    }
  }
  moveUpDownSelected(arg0: string) {
    throw new Error('Method not implemented.')
  }
  moveSelected(arg0: number, arg1: number) {
    throw new Error('Method not implemented.')
  }
  cutSelected() {
    throw new Error('Method not implemented.')
  }
  copySelected() {
    throw new Error('Method not implemented.')
  }
  pasteInCenter() {
    throw new Error('Method not implemented.')
  }

  getSvgString() {
    return this.svgCanvas.getSvgString()
  }
  /**
   * Invokes the callbacks previous set by `svgthis.ready`
   * @function module:SVGthis.runCallbacks
   * @returns {Promise<void>} Resolves to `undefined` if all callbacks succeeded and rejects otherwise
   */
  async runCallbacks() {
    try {
      await Promise.all(
        this.callbacks.map(([cb]) => {
          return cb()
        })
      )
    } catch (err) {
      this.callbacks.forEach(([, , reject]) => {
        reject()
      })
      throw err
    }
    this.callbacks.forEach(([, resolve]) => {
      resolve()
    })
    this.isReady = true
  }
  /** @lends module:SVGEditor~Actions */
  /**
   * @returns {void}
   */
  setAll() {
    const keyHandler: any = {} // will contain the action for each pressed key

    this.shortcuts.forEach((shortcut) => {
      // Bind function to shortcut key
      if (shortcut.key) {
        // Set shortcut based on options
        let keyval: any = shortcut.key
        let pd: any = false
        if (Array.isArray(shortcut.key)) {
          keyval = shortcut.key[0]
          if (shortcut.key.length > 1) {
            pd = shortcut.key[1]
          }
        }
        keyval = String(keyval)
        const { fn } = shortcut
        keyval.split('/').forEach((key: any) => {
          keyHandler[key] = { fn, pd }
        })
      }
      return true
    })
    // register the keydown event
    document.addEventListener('keydown', (e: any) => {
      // only track keyboard shortcuts for the body containing the SVG-Editor
      if (e.target.nodeName !== 'BODY') return
      // normalize key
      const key = `${e.altKey ? 'alt+' : ''}${e.shiftKey ? 'shift+' : ''}${e.metaKey ? 'meta+' : ''}${e.ctrlKey ? 'ctrl+' : ''}${e.key.toLowerCase()}`
      // return if no shortcut defined for this key
      if (!keyHandler[key]) return
      // launch associated handler and preventDefault if necessary
      keyHandler[key].fn()
      if (keyHandler[key].pd) {
        e.preventDefault()
      }
    })
  }

  /**
   * @function module:SVGthis.addExtension
   * @param {string} name Used internally; no need for i18n.
   * @param {module:svgcanvas.ExtensionInitCallback} initfn Config to be invoked on this module
   * @param {module:svgcanvas.ExtensionInitArgs} initArgs
   * @throws {Error} If called too early
   * @returns {Promise<void>} Resolves to `undefined`
   */
  addExtension(name: any, initfn: any, initArgs: any) {
    // Note that we don't want this on this.ready since some extensions
    // may want to run before then (like server_opensave).
    if (!this.svgCanvas) {
      throw new Error('Extension added too early')
    }
    return this.svgCanvas.addExtension(name, initfn, initArgs)
  }

  addSvgGroupFromJson(e) {
    let element = getElement(e.id)
    const layer = this.svgCanvas.current_drawing_.getCurrentLayer()
    if (element && e.group != element.tagName) {
      console.log(this.svgCanvas)
      // this.svgCanvas.
      element = null
    }
    element = document.createElement(NS.SVG, e.group)
    element.setAttribute('id', e.id)
    element.setAttribute('type', e.type)
    if (layer) {
      layer.appendChild(element)
    }

    for (let index = 0; index < e.elements.length; index++) {
      const elementConfig = e.elements[index]
      let newElement = document.createElementNS(NS.SVG, elementConfig.type)
      assignAttributes(
        newElement,
        {
          'stroke-width': this.shapeProperty.stroke_width,
          'stroke-dasharray': this.shapeProperty.stroke_dasharray,
          'stroke-linejoin': this.shapeProperty.stroke_linejoin,
          'stroke-linecap': this.shapeProperty.stroke_linecap,
          style: 'pointer-events:inherit'
        },
        100
      )
      assignAttributes(newElement, elementConfig.attr)
      if (elementConfig.type === 'text') {
        newElement.textContent = elementConfig.content
      } else if (elementConfig.type === 'foreignObject') {
        let content = elementConfig.content
        if (content) {
          for (let sIndex = 0; sIndex < content.length; sIndex++) {
            const contentJSON = content[sIndex]
            const contentElement = document.createElement(contentJSON.tag)
            if (contentElement.tagName.toLowerCase() === 'select') {
              const optionsElement = document.createElement('option')
              optionsElement.setAttribute('test', ' ')
              contentElement.appendChild(optionsElement)
            } else if (contentElement.tagName.toLowerCase() === 'button') {
              contentElement.innerHTML = 'button'
            } else if (contentElement.tagName.toLowerCase() === 'span') {
              contentJSON.value && (contentElement.innerHTML = contentJSON.value)
              contentJSON.attr && assignAttributes(contentElement, contentJSON.attr)
            }
            assignAttributes(contentElement, contentJSON.attr)
            contentJSON.style && contentElement.setAttribute('style', contentJSON.style)
            if (contentElement.tagName.toLowerCase() === 'input') {
              contentElement.style.backgroundColor = this.shapeProperty.fill
              contentElement.style.color = this.shapeProperty.stroke
            }
            newElement.appendChild(contentElement)
          }
        }
      }
    }

    if (e.curStyles) {
      assignAttributes(element, {
        fill: this.shapeProperty.fill,
        stroke: this.shapeProperty.stroke,
        "stroke-width": this.shapeProperty.stroke_width,
        "stroke-dasharray": this.shapeProperty.stroke_dasharray,
        "stroke-linejoin": this.shapeProperty.stroke_linejoin,
        "stroke-linecap": this.shapeProperty.stroke_linecap,
        style: "pointer-events:inherit"
    }, 100)
    }
    assignAttributes(element,  e.attr, 100);
    cleanupElement(element)
    // 
    this.emitter.emit('onGaugeAdded', {
      id: e.id,
      type: e.type
    })
    return element
  }
  /**
   *
   * @param {Event} e
   * @returns {void}
   */
  onDragEnter(e: any) {
    e.stopPropagation()
    e.preventDefault()
    // and indicator should be displayed here, such as "drop files here"
  }

  /**
   *
   * @param {Event} e
   * @returns {void}
   */
  onDragOver(e: any) {
    e.stopPropagation()
    e.preventDefault()
  }

  /**
   *
   * @param {Event} e
   * @returns {void}
   */
  onDragLeave(e: any) {
    e.stopPropagation()
    e.preventDefault()
    // hypothetical indicator should be removed here
  }
  // ******************对外
  setMode(mode: string) {
    this.svgCanvas.setMode(mode)
  }
  clickToSetMode(mode: string) {
    this.svgCanvas.setMode(mode)
  }
}
