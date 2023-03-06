import { getImage } from '@/apis/image.api'
import { DesignerEventEmitter, DesignerListeners, Events } from '@/events/event'
import { Editor } from '@/lib/editor/editor'
import { SvgEditor } from '@/lib/svgEditor/SvgEditor'
import DesignerProperty from './property/designer.property'
import { EventEmitter } from 'eventemitter3'
import { logger } from '@/utils/logger'
import { ErrorDetails, ErrorTypes } from '@/events/event.data'

export interface DesignerConfig {
  debug: boolean
}

export default class Designer implements DesignerEventEmitter {
  currentMode: string
  colorFill: any
  colorStroke: any
  colorDefault: any
  imagefile: any
  config: DesignerConfig
  editor: SvgEditor | null
  property: DesignerProperty | null
  private _emitter: DesignerEventEmitter = new EventEmitter()

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
    // 初始化属性相关
    this.property = new DesignerProperty(this.editor)
    console.log('trigger listener')
    this.trigger(Events.EDITOR_LOADED, null);
  }

  initPropertyListener(domIds?: string[]) {
    this.property?.initPropertyListener(domIds)
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
    window.svgEditor.clickToSetMode(mode)
  }

  clearSelection() {
    window.svgEditor.clearSelection()
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
    if (window.svgEditor) {
      window.svgEditor.setColor(color, alfa, 'fill')
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
    window.svgEditor.setColor(color, alfa, 'stroke')
    // this.fillcolor;
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
