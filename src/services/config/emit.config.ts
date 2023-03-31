import { SaveMode } from "../project.service";

export enum ServiceResult {
  success = 'success',
  fail = 'fail'
}


export interface ServiceSaveData {
  mode: SaveMode
}

export interface ServiceHmiLoadedData {
  mode: SaveMode
}

export interface ServiceErrorData {
  
}