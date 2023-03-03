import { getImage } from "@/apis/image.api"
import { Editor } from "@/lib/editor/editor";

export default class Designer {
  currentMode: string
  colorFill: any
  colorStroke: any
  colorDefault: any
  imagefile: any
  editor: Editor | null;
  constructor() {
    this.currentMode = ''
    this.editor = null;
  }

  init(div: HTMLDivElement) {
    this.editor = new Editor(div, '2d');
    this.editor.init();
    this.editor.setConfig({
      allowInitialUserOverride: true,
      extensions: [],
      noDefaultExtensions: false,
      userExtensions: [/* { pathName: '/packages/react-test/dist/react-test.js' } */]
    })
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
    getImage(shape.ico).then(res=>{
      if (window.svgEditor.setSvgImageToAdd) {
        window.svgEditor.setSvgImageToAdd(res.data);
      }
      this.setMode('svg-image');
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
      return;
    }
    this.currentMode = mode;
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
}