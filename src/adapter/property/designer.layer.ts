import { SvgEditor } from "@/lib/svgEditor/SvgEditor";

export default class DesignerLayer {
  editor: SvgEditor;
  constructor(editor: SvgEditor) { 
    this.editor = editor;
  }

  populateLayers() {
    console.log('clear')
    this.editor.svgCanvas.clearSelection()
  }
}