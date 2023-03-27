import { getImage } from '@/apis/image.api'
import { DesignerEventEmitter, DesignerListeners, Events } from '@/events/event'
import { Editor } from '@/lib/editor/editor'
import { SvgEditor } from '@/lib/svgEditor/SvgEditor'
import DesignerProperty from './property/designer.property'
import { EventEmitter } from 'eventemitter3'
import { logger } from '@/utils/logger'
import { EditorResult, ErrorDetails, ErrorTypes } from '@/events/event.data'
import { service } from '@/services/service'
import { GaugeSettings, Hmi, LayoutSettings, View, ViewType } from '@/models/hmi'
import { Utils } from '@/helpers/utils'
import { ServiceEvents } from '@/services/emit.service'
import { SaveMode } from '@/services/project.service'
import { ServiceSaveData } from '@/services/config/emit.config'
import DesignerLayer from './property/designer.layer'

export interface DesignerConfig {
  debug: boolean
}

export default class Designer implements DesignerEventEmitter {
  readonly colorDefault = {
    fill: '#FFFFFF',
    stroke: '#000000'
  }
  currentMode: string
  colorFill: any = this.colorDefault.fill
  colorStroke: any
  imagefile: any
  config: DesignerConfig
  editor: SvgEditor | null
  property: DesignerProperty | null
  private _emitter: DesignerEventEmitter = new EventEmitter()
  currentView: any
  hmi: Hmi
  layer: DesignerLayer
  private gaugesRef = []

  constructor() {
    this.config = {
      debug: true
    }
    this.currentMode = ''
    this.editor = null
    this.property = null
  }

  init(div: HTMLDivElement) {
    // 初始化编辑器
    this.editor = new SvgEditor(div)
    this.editor.init()
    this.editor.setConfig({
      allowInitialUserOverride: true,
      extensions: [],
      noDefaultExtensions: false,
      userExtensions: [
        /* { pathName: '/packages/react-test/dist/react-test.js' } */
      ]
    })
    this.editor.emitter.on('onGaugeAdded', this.onGaugeAdded.bind(this))
    // 初始化属性相关
    this.property = new DesignerProperty(this)
    this.layer = new DesignerLayer(this.editor);

    this.layer.populateLayers();
    this.initServiceListener();
    this.trigger(Events.EDITOR_LOADED, null)
    this.loadHmi()
    this.setFillColor(this.colorFill)
  }

  initPropertyListener(domIds?: string[]) {
    this.property?.initPropertyListener(domIds)
  }
  // 启动服务监听器
  initServiceListener() {
    service.emitService.on(ServiceEvents.SERVICE_SAVE_CURRENT, (event, data: ServiceSaveData) => {
      const { mode } = data
      if (mode === SaveMode.Current) {
        this.onSaveProject()
      } else if (mode === SaveMode.Save) {
        this.onSaveProject()
      }
    })
  }
  loadHmi() {
    this.currentView = null
    console.log('tigger')
    this.hmi = service.projectService.getHmi()
    this.trigger(Events.EDITOR_HMI_LOADED, { result: EditorResult.success, hmi: this.hmi })
    // check new hmi
    if (!this.hmi.views || this.hmi.views.length <= 0) {
      this.hmi.views = []
      this.addView()
      // this.selectView(this.hmi.views[0].name);
    } else {
      let oldsel = localStorage.getItem('@frango.webeditor.currentview')
      if (!oldsel && this.hmi.views.length) {
        oldsel = this.hmi.views[0].name
      }
      for (let i = 0; i < this.hmi.views.length; i++) {
        if (this.hmi.views[i].name === oldsel) {
          this.onSelectView(this.hmi.views[i])
          break
        }
      }
      if (!this.currentView) {
        this.onSelectView(this.hmi.views[0])
      }
      // check and set start page
      if (!this.hmi.layout) {
        this.hmi.layout = new LayoutSettings()
      }
      if (!this.hmi.layout.start) {
        this.hmi.layout.start = this.hmi.views[0].id
      }
    }
  }
  /**
   * Add View to Project with a default name View_[x]
   */
  addView(name?: string, type?: ViewType): string {
    if (this.hmi.views) {
      let nn = 'View_'
      let idx = 1
      for (idx = 1; idx < this.hmi.views.length + 2; idx++) {
        let found = false
        for (var i = 0; i < this.hmi.views.length; i++) {
          if (this.hmi.views[i].name === nn + idx) {
            found = true
            break
          }
        }
        if (!found) break
      }
      let v = new View()
      v.type = type
      if (name) {
        v.name = name
      } else if (this.hmi.views.length <= 0) {
        v.name = 'MainView'
      } else {
        v.name = nn + idx
        v.profile.bkcolor = '#ffffffff'
      }
      if (type === Utils.getEnumKey(ViewType, ViewType.cards)) {
        v.profile.bkcolor = 'rgba(67, 67, 67, 1)'
      }
      v.id = 'v_' + Utils.getShortGUID()
      this.hmi.views.push(v)
      this.onSelectView(v)
      this.saveView(this.currentView)
      return v.id
    }
    return null
  }

  /**
   * Save Project
   * Save the current View
   */
  onSaveProject() {
    if (this.currentView) {
      this.currentView.svgcontent = this.getContent()
      console.log("this.getContent", this.getContent())
      this.saveView(this.currentView)
    }
  }

  /**
   * select the view, save current vieww before
   * @param view selected view to load resource
   */
  onSelectView(view) {
    if (this.currentView) {
      this.currentView.svgcontent = this.getContent()
      // this.hmi.views[this.currentView].svgcontent = window.svgEditor.getSvgString();
    } else {
      this.setFillColor(this.colorFill)
    }
    if (this.currentView) {
      this.saveView(this.currentView)
    }
    this.currentView = view
    this.trigger(Events.EDITOR_SELECT_VIEW, {view: this.currentView})
    this.loadView(this.currentView)
    // if (this.currentView.type === Utils.getEnumKey(ViewType, ViewType.cards)) {
    //   this.editorMode = EditorModeType.CARDS
    // } else {
    //   this.editorMode = EditorModeType.SVG
    // }
    // emitter.trigger(Events.EDITOR_SELECT_VIEW, {view: this.currentView});
    // localStorage.setItem('@frango.webeditor.currentview', this.currentView.name)
    // this.loadView(this.currentView)
  }
  
  loadView(view: View) {
    if (view) {
      this.clearEditor()
      let svgcontent = ''
      let v = this.getView(view.name)
      if (v) {
        svgcontent = v.svgcontent
      }
      if (svgcontent.length <= 0) {
        svgcontent =
          '<svg id="' +
          view.name +
          '" width="' +
          view.profile.width +
          '" height="' +
          view.profile.height +
          '" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">' +
          '<filter id="blur-filter" x="-3" y="-3" width="200" height="200"><feGaussianBlur in="SourceGraphic" stdDeviation="3" /></filter>' +
          '<g><title>Layer 1</title></g></svg>'
      }
      this.editor.setDocProperty(view.name, view.profile.width, view.profile.height, view.profile.bkcolor)
      this.editor.setSvgString(svgcontent)

      // check gauge to init
      // this.gaugesRef = []
      // setTimeout(() => {
      //   for (let key in v.items) {
      //     let ga: GaugeSettings = this.getGaugeSettings(v.items[key])
      //     this.checkGaugeAdded(ga)
      //   }
      //   window.svgEditor.refreshCanvas()
      // }, 500)
    }
  }
  clearEditor() {
    this.editor.clickClearAll()
  }
  private getContent() {
    if (this.currentView.type === Utils.getEnumKey(ViewType, ViewType.cards)) {
      this.currentView.svgcontent = ''
      return this.currentView.svgcontent
      // let temp = JSON.parse(JSON.stringify(this.dashboard));
      // for (let i = 0; i < temp.length; i++) {
      //     delete temp[i]['content'];
      //     delete temp[i]['background'];
      // }
      // return JSON.stringify(temp);
    } else {
      return this.editor.getSvgString()
    }
  }
  /**
   * get view from hmi views list
   * @param name view name
   */
  private getView(name) {
    for (var i = 0; i < this.hmi.views.length; i++) {
      if (this.hmi.views[i].name === name) {
        return this.hmi.views[i]
      }
    }
    return null
  }
  /**
   * Set or Add the View to Project
   * Save the View to Server
   */
  private saveView(view: View) {
    service.projectService.setView(view)
  }
  /**
   * add image to view
   * @param event selected file
   */
  onSetImage(event: any) {
    if (event.target.files) {
      this.imagefile = 'assets/images/' + event.target.files[0].name
      let self = this
      if (this.imagefile.split('.').pop().toLowerCase() === 'svg') {
        let reader = new FileReader()
        reader.onloadend = function (e: any) {
          if (window.svgEditor.setSvgImageToAdd) {
            window.svgEditor.setSvgImageToAdd(e.target.result)
          }
          self.setMode('svg-image')
        }
        reader.readAsText(event.target.files[0])
      } else {
        this.getBase64Image(event.target.files[0], function (imgdata: any) {
          if (window.svgEditor.setUrlImageToAdd) {
            window.svgEditor.setUrlImageToAdd(imgdata)
          }
          self.setMode('image')
        })
      }
    }
  }
  /**
   * convert image file to code to attach in svg
   * @param file image file
   * @param callback event for end load image
   */
  private getBase64Image(file: any, callback: any) {
    var fr = new FileReader()
    fr.onload = function () {
      callback(fr.result)
    }
    fr.readAsDataURL(file)
  }
  /**
   * check with the current mode
   * @param mode mode to check
   */
  isModeActive(mode: string) {
    const { currentMode } = this
    return currentMode === mode
  }

  setImageMode(mode: string, shape?: any) {
    getImage(shape.ico).then((res) => {
      if (window.svgEditor.setSvgImageToAdd) {
        window.svgEditor.setSvgImageToAdd(res.data)
      }
      this.setMode('svg-image')
    })
  }
  //#region Svg-editor event and function interface
  /**
   * set the mode to svg-editor (line,text,...)
   * @param mode mode to set
   */
  setMode(mode: string, clearSelection: boolean = true, shape?: any) {
    if (mode.indexOf('iotshapes') > -1) {
      this.setImageMode(mode, shape)
      return
    }
    this.currentMode = mode
    if (clearSelection) {
      this.clearSelection()
      this.checkFillAndStrokeColor()
    }
    this.editor.clickToSetMode(mode)
  }

  clearSelection() {
    this.editor.clearSelection()
  }

  /**
   * check if fill and stroke not the same color is, text and label set all to black
   */
  private checkFillAndStrokeColor() {
    if (this.colorFill && this.colorStroke && this.colorFill === this.colorStroke) {
      this.setFillColor(this.colorDefault.fill)
      this.setStrokeColor(this.colorDefault.stroke)
    }
  }
  setFillColor(event: any) {
    let color = event
    if (color.charAt(0) === '#') color = color.slice(1)
    let alfa = 100
    if (this.editor) {
      this.editor.setColor(color, alfa, 'fill')
    }
  }
  /**
   * set stroke color (to svg-editor)
   * @param event color code
   */
  setStrokeColor(event: any) {
    let color = event
    if (color.charAt(0) === '#') color = color.slice(1)
    let alfa = 100
    this.editor.setColor(color, alfa, 'stroke')
    // this.fillcolor;
  }

  // 
  updateSelect() {
    this.editor.workarea.style.cursor = 'auto'
    this.editor.svgCanvas.setMode('select')
  }

  // ****************************Gauge*********************************
  onGaugeAdded(eleadded: any) {
    console.log('onGaugeAdded')
    let ga: GaugeSettings = this.getGaugeSettings(eleadded)
    this.checkGaugeAdded(ga)
    setTimeout(() => {
      this.setMode('select', false)
    }, 700)
  }
  getGaugeSettings(ele: any) {
    console.log('ele', ele, this.currentView)

    if (ele && this.currentView) {
      if (this.currentView.items[ele.id]) {
        return this.currentView.items[ele.id]
      }
      console.log('ele', ele)
      return service.gaugesManager.createSettings(ele.id, ele.type)
    }
    return null
  }

    /**
   * check and set the special gauge like ngx-uplot, ngx-gauge, ... if added
   * if return true then the GaugeSettings is changed have to set again
   * @param ga
   */
    async checkGaugeAdded(ga: GaugeSettings) {
      let gauge = await service.gaugesManager.initElementAdded(ga, false)
      if (gauge) {
        if (gauge !== true) {
          if (this.gaugesRef.indexOf(ga.id) === -1) {
            this.gaugesRef[ga.id] = {
              type: ga.type,
              ref: gauge
            }
          }
        }
        this.setGaugeSettings(ga)
      }
    }

      /**
   * add the gauge settings to the current view items list
   * @param ga GaugeSettings
   */
  private setGaugeSettings(ga) {
    if (ga.id) {
      this.currentView.items[ga.id] = ga
    } else {
      console.error('!TOFIX', ga)
    }
  }

  // 事件监听器
  on<E extends keyof DesignerListeners, Context = undefined>(event: E, listener: DesignerListeners[E], context: Context = this as any) {
    this._emitter.on(event, listener, context)
  }

  once<E extends keyof DesignerListeners, Context = undefined>(event: E, listener: DesignerListeners[E], context: Context = this as any) {
    this._emitter.once(event, listener, context)
  }

  removeAllListeners<E extends keyof DesignerListeners>(event?: E | undefined) {
    this._emitter.removeAllListeners(event)
  }

  off<E extends keyof DesignerListeners, Context = undefined>(event: E, listener?: DesignerListeners[E] | undefined, context: Context = this as any, once?: boolean | undefined) {
    this._emitter.off(event, listener, context, once)
  }

  listeners<E extends keyof DesignerListeners>(event: E): DesignerListeners[E][] {
    return this._emitter.listeners(event)
  }

  emit<E extends keyof DesignerListeners>(event: E, name: E, eventObject: Parameters<DesignerListeners[E]>[1]): boolean {
    return this._emitter.emit(event, name, eventObject)
  }

  trigger<E extends keyof DesignerListeners>(event: E, eventObject: Parameters<DesignerListeners[E]>[1]): boolean {
    if (this.config.debug) {
      return this.emit(event, event, eventObject)
    } else {
      try {
        return this.emit(event, event, eventObject)
      } catch (e) {
        logger.error('An internal error happened while handling event ' + event + '. Error message: "' + e.message + '". Here is a stacktrace:', e)
        this.trigger(Events.ERROR, {
          type: ErrorTypes.OTHER_ERROR,
          details: ErrorDetails.INTERNAL_EXCEPTION,
          fatal: false,
          event: event,
          error: e
        })
      }
    }
    return false
  }

  listenerCount<E extends keyof DesignerListeners>(event: E): number {
    return this._emitter.listenerCount(event)
  }
}
