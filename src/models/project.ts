import { Utils } from '@/helpers/utils';
import { Chart } from './chart';
import { Device, DEVICE_PREFIX } from './device';
import { Graph } from './graph';
import { Alarm, Hmi } from './hmi';
import { Report } from './report';
import { Script } from './script';

export class ProjectData {
  version = "1.01";
  /** Project name */
  name?: string;
  /** FUXA Server */
  server: Device = new Device(Utils.getGUID(DEVICE_PREFIX));
  /** Hmi resource, layout, SVG, etc. */
  hmi: Hmi = new Hmi();
  /** Devices, connection, Tags, etc. */
  devices = {};
  /** Charts, Tags, colors, etc. */
  charts: Chart[] = [];
  /** Graphs, Bar, Pie */
  graphs: Graph[] = [];
  /** Alarms, Tags, logic, level, colors, etc.  */
  alarms: Alarm[] = [];
  /** Notifications  */
  notifications: Notification[] = [];
  /** Scripts */
  scripts: Script[] = [];
  /** Reports */
  reports: Report[] = [];
  /** not used yet */
  texts: Text[] = [];
  /** Plugins, name, version */
  plugin: Plugin[] = [];
}
