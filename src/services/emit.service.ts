import { logger } from "@/utils/logger";
import EventEmitter from "eventemitter3";
import { ServiceSaveData, ServiceErrorData } from "./config/emit.config";

/**
 * @enum {ErrorDetails}
 * @typedef {string} ErrorDetail
 */
export enum ServiceErrorDetails {
  INTERNAL_EXCEPTION = 'internalException',
}

export enum ServiceErrorTypes {
  NETWORK_ERROR = 'networkError',
  OTHER_ERROR = 'otherError',
}

/**
 * @readonly
 * @enum {string}
 */
export enum ServiceEvents {
  // Fired before MediaSource is attaching to media element
  SERVICE_SAVE_CURRENT = 'serviceSaveCurrent',
  SERVICE_ERROR = "serviceError",
  HMI_SERVICE_VARIABLECHANGED = 'serviceHmiVariableChanged'
}

export interface ServiceListeners {
  [ServiceEvents.SERVICE_SAVE_CURRENT]: (
    event: ServiceEvents.SERVICE_SAVE_CURRENT,
    data: ServiceSaveData
  ) => void;
  [ServiceEvents.SERVICE_ERROR]: (
    event: ServiceEvents.SERVICE_ERROR,
    data: ServiceErrorData
  ) => void;
}
export interface ServiceEventEmitter {
  on<E extends keyof ServiceListeners, Context = undefined>(
    event: E,
    listener: ServiceListeners[E],
    context?: Context
  ): void;
  once<E extends keyof ServiceListeners, Context = undefined>(
    event: E,
    listener: ServiceListeners[E],
    context?: Context
  ): void;

  removeAllListeners<E extends keyof ServiceListeners>(event?: E): void;
  off<E extends keyof ServiceListeners, Context = undefined>(
    event: E,
    listener?: ServiceListeners[E],
    context?: Context,
    once?: boolean
  ): void;

  listeners<E extends keyof ServiceListeners>(event: E): ServiceListeners[E][];
  emit<E extends keyof ServiceListeners>(
    event: E,
    name: E,
    eventObject: Parameters<ServiceListeners[E]>[1]
  ): boolean;
  listenerCount<E extends keyof ServiceListeners>(event: E): number;
}

export default class EmitService implements ServiceEventEmitter {
  private _emitter: ServiceEventEmitter = new EventEmitter()

    // 事件监听器
    on<E extends keyof ServiceListeners, Context = undefined>(event: E, listener: ServiceListeners[E], context: Context = this as any) {
      this._emitter.on(event, listener, context)
    }
  
    once<E extends keyof ServiceListeners, Context = undefined>(event: E, listener: ServiceListeners[E], context: Context = this as any) {
      this._emitter.once(event, listener, context)
    }
  
    removeAllListeners<E extends keyof ServiceListeners>(event?: E | undefined) {
      this._emitter.removeAllListeners(event)
    }
  
    off<E extends keyof ServiceListeners, Context = undefined>(event: E, listener?: ServiceListeners[E] | undefined, context: Context = this as any, once?: boolean | undefined) {
      this._emitter.off(event, listener, context, once)
    }
  
    listeners<E extends keyof ServiceListeners>(event: E): ServiceListeners[E][] {
      return this._emitter.listeners(event)
    }
  
    emit<E extends keyof ServiceListeners>(event: E, name: E, eventObject: Parameters<ServiceListeners[E]>[1]): boolean {
      return this._emitter.emit(event, name, eventObject)
    }
  
    trigger<E extends keyof ServiceListeners>(event: E, eventObject: Parameters<ServiceListeners[E]>[1]): boolean {
      try {
        return this.emit(event, event, eventObject)
      } catch (e) {
        logger.error('An internal error happened while handling event ' + event + '. Error message: "' + e.message + '". Here is a stacktrace:', e)
        this.trigger(ServiceEvents.SERVICE_ERROR, {
          type: ServiceErrorTypes.OTHER_ERROR,
          details: ServiceErrorDetails.INTERNAL_EXCEPTION,
          fatal: false,
          event: event,
          error: e
        })
      }
      return false
    }
  
    listenerCount<E extends keyof ServiceListeners>(event: E): number {
      return this._emitter.listenerCount(event)
    }
}