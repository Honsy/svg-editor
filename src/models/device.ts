export class Tag {
  /** Tag id, GUID */
  id: string;
  /** Tag name, is like the id  */
  name: string;
  /** Tag label, used by BACnet and WebAPI  */
  label: string;
  /** not used yet */
  value: string;
  /** Tag type, Bool, Byte, etc. */
  type: string;
  /** Address of Tag, combine with address by Modbus, some property for WebAPI */
  memaddress: string;
  /** Tag address, for OPCUA like the id */
  address: string;
  /** Value divisor, used by Modbus */
  divisor: number;
  /** not used yet */
  access: string;
  /** Options, used for WebAPI and MQTT */
  options: any;
  /** not used yet */
  format: any;
  /** Daq settings */
  /** Init value */
  init: string;

  constructor(_id: string) {
      this.id = _id;
  }

  static descriptor = {
      id: 'Tag id, GUID',
      name: 'Tag name, is like the id',
      label: 'Tag label, used by BACnet and WebAPI',
      type: 'Tag type, Bool, Byte, etc. depending of device type',
      memaddress: 'Address of Tag, combine with address by Modbus, some property for WebAPI',
      address: 'Tag address, for OPCUA like the id',
      divisor: 'Value divisor, used by Modbus',
      options: 'Options is a string JSON object, used for WebAPI and MQTT, pubs: items to publish | subs: items to subscribe',
      init: 'Init value',
      daq: { 
          enabled: 'Daq enabled storage', 
          interval: 'min storage interval (without change value)' 
      },
  }
}