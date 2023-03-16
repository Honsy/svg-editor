import { GaugeSettings } from "@/models/hmi";
import { service } from "@/services/service";
import { HtmlButtonComponent } from "./controls/html-button/html-button";
import { HtmlChartComponent } from "./controls/html-chart/html-chart";
import { HtmlSwitchComponent } from "./controls/html-switch/html-switch";
import { ValueComponent } from "./controls/value/value";

export class GaugesManager {
  mapGauges = {}
  gaugesTags = []
  // list of gauges components
  static Gauges = [
    ValueComponent,
    HtmlButtonComponent,
    HtmlSwitchComponent
  ]
  constructor() { 
    // make the list of gauges tags to speed up the check
    GaugesManager.Gauges.forEach((g) => {
      this.gaugesTags.push(g.TypeTag)
    })
  }

  async initElementAdded(ga: GaugeSettings, isview: boolean) {
    if (!ga || !ga.type) {
      console.error('!TOFIX', ga)
      return null
    }

    if (ga.type.startsWith(HtmlChartComponent.TypeTag)) {

    } else if(ga.type.startsWith(HtmlSwitchComponent.TypeTag)) {
      let gauge = HtmlSwitchComponent.initElement(ga);
      this.mapGauges[ga.id] = gauge
      return gauge
    }
  }

  createSettings(id: string, type: string) {
    console.log('id ,',id)
    let gs: GaugeSettings = null
    if (type) {
      for (let i = 0; i < GaugesManager.Gauges.length; i++) {
        if (type.startsWith(GaugesManager.Gauges[i].TypeTag)) {
          gs = new GaugeSettings(id, type)
          gs.label = GaugesManager.Gauges[i].LabelTag
          return gs
        }
      }
    }
    return gs
  }
}