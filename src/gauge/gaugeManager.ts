import { GaugeSettings } from "@/models/hmi";
import { service } from "@/services/service";
import { HtmlButtonComponent } from "./controls/html-button/html-button";
import { ValueComponent } from "./controls/value/value";

export class GaugesManager {

  gaugesTags = []
  // list of gauges components
  static Gauges = [
    ValueComponent,
    HtmlButtonComponent,
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
  }
}