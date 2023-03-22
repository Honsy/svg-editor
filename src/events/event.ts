import { EditorAddView, EditorData, EditorHmiData, EditorPointData, EditorSelectElement, EditorSelectView, ErrorData } from "./event.data";

/**
 * @readonly
 * @enum {string}
 */
export enum ModalEvent {
  // Fired before MediaSource is attaching to media element
  ok = 'ok',
  cancel = 'cancel',
}


/**
 * @readonly
 * @enum {string}
 */
export enum Events {
  // Fired before MediaSource is attaching to media element
  EDITOR_LOADED = 'iotEditorLoaded',
  EDITOR_SET_SHAPES = 'iotEditorSetShapes',
  EDITOR_HMI_LOADED = 'iotEditorHmiLoaded', // HMI数据已经加载
  EDITOR_ADD_VIEW = 'iotEditorAddView', // 新增视图通知
  EDITOR_SELECT_VIEW = 'iotEditorSelectView', // 视图选中通知
  EDITOR_SELECT_ELEMENT = 'iotEditorSelectElement', // 节点选中变化通知
  DIALOG_SELECT_POINT = 'iotDialogSelectPoint', // 弹框选取点位
  ERROR = 'iotError' // 发生错误
}

export interface DesignerListeners {
  [Events.EDITOR_LOADED]: (
    event: Events.EDITOR_LOADED,
    data: EditorData
  ) => void;
  [Events.EDITOR_SET_SHAPES]: (
    event: Events.EDITOR_SET_SHAPES,
    data: EditorData
  ) => void;
  [Events.EDITOR_HMI_LOADED]: (
    event: Events.EDITOR_SET_SHAPES,
    data: EditorHmiData
  ) => void;
  [Events.EDITOR_ADD_VIEW]: (
    event: Events.EDITOR_ADD_VIEW,
    data: EditorAddView
  ) => void;
  [Events.EDITOR_SELECT_VIEW]: (
    event: Events.EDITOR_SELECT_VIEW,
    data: EditorSelectView
  ) => void;
  [Events.EDITOR_SELECT_ELEMENT]: (
    event: Events.EDITOR_SELECT_ELEMENT,
    data: EditorSelectElement
  ) => void;
  [Events.DIALOG_SELECT_POINT]: (
    event: Events.DIALOG_SELECT_POINT,
    data: EditorPointData
  ) => void;
  [Events.ERROR]: (
    event: Events.ERROR, 
    data: ErrorData
  ) => void;
  
}
export interface DesignerEventEmitter {
  on<E extends keyof DesignerListeners, Context = undefined>(
    event: E,
    listener: DesignerListeners[E],
    context?: Context
  ): void;
  once<E extends keyof DesignerListeners, Context = undefined>(
    event: E,
    listener: DesignerListeners[E],
    context?: Context
  ): void;

  removeAllListeners<E extends keyof DesignerListeners>(event?: E): void;
  off<E extends keyof DesignerListeners, Context = undefined>(
    event: E,
    listener?: DesignerListeners[E],
    context?: Context,
    once?: boolean
  ): void;

  listeners<E extends keyof DesignerListeners>(event: E): DesignerListeners[E][];
  emit<E extends keyof DesignerListeners>(
    event: E,
    name: E,
    eventObject: Parameters<DesignerListeners[E]>[1]
  ): boolean;
  listenerCount<E extends keyof DesignerListeners>(event: E): number;
}
