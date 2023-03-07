import { DesignerListeners } from "./event";
import { Hmi, View, ViewType } from "@/models/hmi"
import { IotPoint } from "@/models/iot";

export enum EditorResult {
  success = 'success',
  fail = 'fail'
}

export enum ErrorTypes {
  NETWORK_ERROR = 'networkError',
  OTHER_ERROR = 'otherError',
}



/**
 * @enum {ErrorDetails}
 * @typedef {string} ErrorDetail
 */
export enum ErrorDetails {
  INTERNAL_EXCEPTION = 'internalException',
}

export interface EditorData {
  result: EditorResult
  hmi: Hmi
}

export interface EditorPointData {
  point: IotPoint
}

export interface EditorHmiData {
  result: EditorResult
  hmi: Hmi
}

export interface EditorAddView {
  name?: string
  type?: ViewType
}

export interface EditorSelectView {
  view?: View 
}


export interface ErrorData {
  type: ErrorTypes;
  details: ErrorDetails;
  fatal: boolean;
  event?: keyof DesignerListeners;
  error?: Error;
  err?: {
    // comes from transmuxer interface
    message: string;
  };
}