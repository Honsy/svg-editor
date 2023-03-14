import EventEmitter from "eventemitter3"

export class BaseEditorStartup {
  emitter: EventEmitter<string | symbol, any>;
  constructor() {
    this.emitter = new EventEmitter();
  }
  setMode(mode: string) {console.warn('Method not implemented.')}
  clickToSetMode(mode: string) {console.warn('Method not implemented.')}
  init() {}
  clearSelection() {console.warn('Method not implemented.')}
  setConfig(config: any) {console.warn('Method not implemented.')}
}