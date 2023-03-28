import { GaugeSettings } from "@/models/hmi";
import { service } from "@/services/service";
import { logger } from "@/utils/logger";
import { GaugeProgressComponent } from "./controls/gauge-progress/gauge-progress";
import { HtmlBagComponent } from "./controls/html-bag/html-bag";
import { HtmlButtonComponent } from "./controls/html-button/html-button";
import { HtmlChartComponent } from "./controls/html-chart/html-chart";
import { HtmlSwitchComponent } from "./controls/html-switch/html-switch";
import { PipeComponent } from "./controls/pipe/pipe";
import { ValueComponent } from "./controls/value/value";

export class GaugesManager {
  mapGauges = {}
  gaugesTags = []
  // list of gauges components
  static Gauges = [
    ValueComponent,
    HtmlButtonComponent,
    HtmlSwitchComponent,
    GaugeProgressComponent,
    HtmlChartComponent,
    HtmlBagComponent
  ]
  constructor() { 
    // make the list of gauges tags to speed up the check
    GaugesManager.Gauges.forEach((g) => {
      this.gaugesTags.push(g.TypeTag)
    })
  }
  async initInEditor(ga: GaugeSettings) {
    if (ga.type.startsWith(PipeComponent.TypeTag)) {
      return this.mapGauges[ga.id] = PipeComponent.detectChange(ga);
    }
  }

  async initElementAdded(ga: GaugeSettings, isview: boolean) {
    if (!ga || !ga.type) {
      console.error('!TOFIX', ga)
      return null
    }

    if (ga.type.startsWith(HtmlChartComponent.TypeTag)) {
      let gauge = await HtmlChartComponent.initElement(ga).catch((err) => {
        return err
      });
      this.mapGauges[ga.id] = gauge
      return gauge
    } if (ga.type.startsWith(HtmlBagComponent.TypeTag)) {
      let gauge = await HtmlBagComponent.initElement(ga).catch((err) => {
        return err
      });
      this.mapGauges[ga.id] = gauge
      return gauge
    } else if(ga.type.startsWith(HtmlSwitchComponent.TypeTag)) {
      let gauge = await HtmlSwitchComponent.initElement(ga).catch((err) => {
        return err
      });
      this.mapGauges[ga.id] = gauge
      return gauge
    } else if (ga.type.startsWith(GaugeProgressComponent.TypeTag)) {
      GaugeProgressComponent.initElement(ga)
      return true
    }else if (ga.type.startsWith(ValueComponent.TypeTag)) {
       let gauge = await ValueComponent.initElement(ga).catch((err) => {
         return err
       })
       this.mapGauges[ga.id] = gauge
       return gauge
    } else {
      logger.warn("找不到自定义组件！");
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