import SvgCanvas from '@svgedit/svgcanvas'
import { init } from '@svgedit/svgcanvas/core/utilities'
import { BaseEditorStartup } from './../base/BaseEditorStartup'
import ConfigObj from './ConfigObj'
import Rulers from './Rulers'
import { merge } from 'lodash'

const { $id, $qq, $click, convertUnit } = SvgCanvas

export class SvgEditorStartup extends BaseEditorStartup {
  extensionsAdded: boolean
  messageQueue: never[]
  $container: any
  storage: Storage = window.localStorage
  configObj: ConfigObj
  workarea: any
  svgCanvas: any
  svgCanvasDom: any
  rulers: any
  selectedElement: any
  $svgEditor: any
  storagePromptState: any
  shapeProperty: any  
  /**
   *
   */
  constructor(div: HTMLDivElement) {
    super()
    this.extensionsAdded = false
    this.messageQueue = []
    this.$container = div ?? $id('svg_editor')
  }

  /**
   * Auto-run after a Promise microtask.
   * @function module:SVGthis.init
   * @returns {void}
   */
  async init() {
    if ('localStorage' in window) {
      this.storage = window.localStorage
    }
    this.configObj.load()
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
    // await import('./components/index.js')
    // await import('./dialogs/index.js')
    try {
      this.$svgEditor = $qq('.svg_editor')
      this.workarea = $id('workarea')
    } catch (error) {}
    
    this.svgCanvasDom = $id('svgcanvas');
    this.svgCanvas = new SvgCanvas(this.svgCanvasDom, this.configObj.curConfig)
    // 初始化svg工具链
    init(this.svgCanvas);

    this.rulers = new Rulers(this)
    this.selectedElement = null

    this.svgCanvas.bind(
      'updateCanvas',
      /**
       * @param {external:Window} win
       * @param {PlainObject} centerInfo
       * @param {false} centerInfo.center
       * @param {module:math.XYObject} centerInfo.newCtr
       * @listens module:svgcanvas.SvgCanvas#event:updateCanvas
       * @returns {void}
       */
      (win: any, { center, newCtr }: any) => {
        this.updateCanvas(center, newCtr)
      }
    )

    this.svgCanvas.textActions.setInputElem($id('text'))

    this.setBackground(this.configObj.pref('bkgd_color'), this.configObj.pref('bkgd_url'))
    // update resolution option with actual resolution
    const res = this.svgCanvas.getResolution()
    if (this.configObj.curConfig.baseUnit !== 'px') {
      res.w = convertUnit(res.w) + this.configObj.curConfig.baseUnit
      res.h = convertUnit(res.h) + this.configObj.curConfig.baseUnit
    }

    let lastX: any = null
    let lastY: any = null
    let panning = false
    let keypan = false
    const zoomInIcon = 'crosshair'
    const zoomOutIcon = 'crosshair'

    $id('svgcanvas').addEventListener('mouseup', (evt: any) => {
      if (panning === false) {
        return true
      }

      this.workarea.scrollLeft -= evt.clientX - lastX
      this.workarea.scrollTop -= evt.clientY - lastY

      lastX = evt.clientX
      lastY = evt.clientY

      if (evt.type === 'mouseup') {
        panning = false
      }
      return false
    })
    $id('svgcanvas').addEventListener('mousemove', (evt: any) => {
      if (panning === false) {
        return true
      }

      this.workarea.scrollLeft -= evt.clientX - lastX
      this.workarea.scrollTop -= evt.clientY - lastY

      lastX = evt.clientX
      lastY = evt.clientY

      if (evt.type === 'mouseup') {
        panning = false
      }
      return false
    })
    $id('svgcanvas').addEventListener('mousedown', (evt: any) => {
      if (evt.button === 1 || keypan === true) {
        panning = true
        lastX = evt.clientX
        lastY = evt.clientY
        return false
      }
      return true
    })

    window.addEventListener('mouseup', () => {
      panning = false
    })

    document.addEventListener('keydown', (e: any) => {
      if (e.target.nodeName !== 'BODY') return
      if (e.code.toLowerCase() === 'space') {
        this.svgCanvas.spaceKey = keypan = true
        e.preventDefault()
      } else if (e.key.toLowerCase() === 'shift' && this.svgCanvas.getMode() === 'zoom') {
        this.workarea.style.cursor = zoomOutIcon
        e.preventDefault()
      }
    })

    document.addEventListener('keyup', (e: any) => {
      if (e.target.nodeName !== 'BODY') return
      if (e.code.toLowerCase() === 'space') {
        this.svgCanvas.spaceKey = keypan = false
        e.preventDefault()
      } else if (e.key.toLowerCase() === 'shift' && this.svgCanvas.getMode() === 'zoom') {
        this.workarea.style.cursor = zoomInIcon
        e.preventDefault()
      }
    })

    const addListenerMulti = (element: any, eventNames: any, listener: any) => {
      if (!element) {
        return;
      }
      eventNames.split(' ').forEach((eventName: any) => element.addEventListener(eventName, listener, false))
    }

    addListenerMulti($id('text'), 'keyup input', (evt: any) => {
      this.svgCanvas.setTextContent(evt.currentTarget.value)
    })

    // ref: https://stackoverflow.com/a/1038781
    function getWidth() {
      return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth)
    }

    function getHeight() {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight)
    }
    const winWh: any = {
      width: getWidth(),
      height: getHeight()
    }
    window.addEventListener('resize', () => {
      Object.entries(winWh).forEach(([type, val]: any) => {
        const curval = type === 'width' ? window.innerWidth - 15 : window.innerHeight
        this.workarea['scroll' + (type === 'width' ? 'Left' : 'Top')] -= (curval - val) / 2
        winWh[type] = curval
      })
    })

    this.workarea.addEventListener('scroll', () => {
      this.rulers.manageScroll()
    })

    const centerCanvas = () => {
      // this centers the canvas vertically in the this.workarea (horizontal handled in CSS)
      this.workarea.style.lineHeight = this.workarea.style.height
    }

    addListenerMulti(window, 'load resize', centerCanvas)

    this.svgCanvas.clearSelection();

    this.ready(() => {
      if (this.configObj.curConfig.showRulers) {
        this.rulers.display(true)
      } else {
        this.rulers.display(false)
      }
    })

    this.workarea.addEventListener('dragenter', this.onDragEnter)
    this.workarea.addEventListener('dragover', this.onDragOver)
    this.workarea.addEventListener('dragleave', this.onDragLeave)

    this.updateCanvas(true)
    // Load extensions
    this.extAndLocaleFunc()

    await this.runCallbacks()
    // $('#svgcanvas').on('mousedown', this.handleMouseDown)
    // $('#svgcanvas').on('mousemove', this.handleMouseMove)
    // $('#svgcanvas').on('click', this.handleClick)
    // $('#svgcanvas').on('dblclick', this.handleDBClick)
    // $('#svgcanvas').on('mouseup', this.handleMouseUp)
    // $('#svgcanvas').on('mousewheel DOMMouseScroll', this.handleMouseWheel)
    // this.rulers = new Rulers(this)
  }

          /**
     * @function module:SVGthis.setPanning
     * @param {boolean} active
     * @returns {void}
     */
  setPanning(active,keypan) {
    this.svgCanvas.spaceKey = keypan = active
  }
  
  /**
   * @fires module:svgcanvas.SvgCanvas#event:ext_addLangData
   * @fires module:svgcanvas.SvgCanvas#event:ext_langReady
   * @fires module:svgcanvas.SvgCanvas#event:ext_langChanged
   * @fires module:svgcanvas.SvgCanvas#event:extensions_added
   * @returns {Promise<module:locale.LangAndData>} Resolves to result of {@link module:locale.readLang}
   */
  async extAndLocaleFunc() {
    this.$svgEditor.style.visibility = 'visible'
    try {
      // load standard extensions
      await Promise.all(
        this.configObj.curConfig.extensions.map(async (extname: any) => {
          /**
           * @tutorial ExtensionDocs
           * @typedef {PlainObject} module:SVGthis.ExtensionObject
           * @property {string} [name] Name of the extension. Used internally; no need for i18n. Defaults to extension name without beginning "ext-" or ending ".js".
           * @property {module:svgcanvas.ExtensionInitCallback} [init]
           */
          try {
            /**
             * @type {module:SVGthis.ExtensionObject}
             */
            const extPath = this.configObj.curConfig.extPath
            const imported = await import(`${extPath}/${encodeURIComponent(extname)}/${encodeURIComponent(extname)}.js`)
            const { name = extname, init: initfn } = imported.default
            return this.addExtension(name, initfn && initfn.bind(this), { langParam: 'en' }) /** @todo  change to current lng */
          } catch (err) {
            // Todo: Add config to alert any errors
            console.error('Extension failed to load: ' + extname + '; ', err)
            return undefined
          }
        })
      )
      // load user extensions (given as pathNames)
      await Promise.all(
        this.configObj.curConfig.userExtensions.map(async ({ pathName, config }: any) => {
          /**
           * @tutorial ExtensionDocs
           * @typedef {PlainObject} module:SVGthis.ExtensionObject
           * @property {string} [name] Name of the extension. Used internally; no need for i18n. Defaults to extension name without beginning "ext-" or ending ".js".
           * @property {module:svgcanvas.ExtensionInitCallback} [init]
           */
          try {
            /**
             * @type {module:SVGthis.ExtensionObject}
             */
            const imported = await import(encodeURI(pathName))
            const { name, init: initfn } = imported.default
            return this.addExtension(name, initfn && initfn.bind(this, config), {})
          } catch (err) {
            // Todo: Add config to alert any errors
            console.error('Extension failed to load: ' + pathName + '; ', err)
            return undefined
          }
        })
      )
      this.svgCanvas.bind(
        'extensions_added',
        /**
         * @param {external:Window} _win
         * @param {module:svgcanvas.SvgCanvas#event:extensions_added} _data
         * @listens module:SvgCanvas#event:extensions_added
         * @returns {void}
         */
        (_win: any, _data: any) => {
          this.extensionsAdded = true
          this.setAll()

          if (this.storagePromptState === 'ignore') {
            this.updateCanvas(true)
          }

          this.messageQueue.forEach(
            /**
             * @param {module:svgcanvas.SvgCanvas#event:message} messageObj
             * @fires module:svgcanvas.SvgCanvas#event:message
             * @returns {void}
             */
            (messageObj) => {
              this.svgCanvas.call('message', messageObj)
            }
          )
        }
      )
      this.svgCanvas.call('extensions_added')
    } catch (err) {
      // Todo: Report errors through the UI
      console.error(err)
    }
  }
  async runCallbacks() {}
  setAll() {}
  addExtension(name: any, initfn: any, initArgs: any) {}
  setBackground(color: any, url: any) {}
  updateCanvas(center?: any, newCtr?: any) {}
  ready(cb: any) {}
  onDragEnter(e: any) {}
  onDragOver(e: any) {}
  onDragLeave(e: any) {}
  selectedChanged(win: any, elems: any) {}
}
