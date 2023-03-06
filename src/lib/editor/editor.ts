import { TDEditor } from "../3dEditor/TDEditor";
import { SvgEditor } from "../svgEditor/SvgEditor";
import { EditorStartup } from "./editorStartup";

export class Editor extends EditorStartup {
  editor: SvgEditor | TDEditor;
  // 画布对象
  get svgCanvas() {
    return this.editor.svgCanvas;
  }
  // 当前选中节点
  get selectedElement() {
    return this.editor.selectedElement;
  }
  // 配置对象
  // get configObj() {
  //   return this.editor.configObj;
  // }
  constructor(div: HTMLDivElement, type: string) {
    super(div);
    if (type == '2d') {
      this.editor = new SvgEditor(div);
    } else {
      this.editor = new TDEditor(div);
    }
  }

  async init() {
    this.editor.init();
  }

  setConfig(config: any) {
    this.editor.setConfig(config)
  }

  clickToSetMode(mode: string) {
    this.editor.setMode(mode);
  }

  clearSelection() {
    this.editor.clearSelection();
  }
}
