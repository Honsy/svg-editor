import { TDEditor } from "../3dEditor/TDEditor";
import { SvgEditor } from "../svgEditor/SvgEditor";
import { EditorStartup } from "./editorStartup";

export class Editor extends EditorStartup {
  editor: SvgEditor | TDEditor;

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
