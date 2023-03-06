import { TDEditorStartup } from "./TDEditorStartup";

export class TDEditor extends TDEditorStartup {
  svgCanvas: undefined;
  selectedElement: undefined;
  constructor(div: HTMLDivElement) {
    super(div)
  }
}