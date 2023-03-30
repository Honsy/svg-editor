import { GaugeSettings } from "@/models/hmi";
import { service } from "@/services/service";
import { logger } from "@/utils/logger";
import { GaugeProgressComponent } from "./controls/gauge-progress/gauge-progress";
import { HtmlBagComponent } from "./controls/html-bag/html-bag";
import { HtmlButtonComponent } from "./controls/html-button/html-button";
import { HtmlChartComponent } from "./controls/html-chart/html-chart";
import { HtmlGraphComponent } from "./controls/html-graph/html-graph";
import { HtmlIframeComponent } from "./controls/html-iframe/html-ifame";
import { HtmlSwitchComponent } from "./controls/html-switch/html-switch";
import { DataTableComponent } from "./controls/html-table/data-table";
import { HtmlTableComponent } from "./controls/html-table/html-table";
import { PipeComponent } from "./controls/pipe/pipe";
import { ShapesComponent } from "./controls/shapes/shapes";
import { SliderComponent } from "./controls/slider/slider";
import { ValueComponent } from "./controls/value/value";
import { IotSliderComponent } from "./gui-helpers/IotSlider/IotSlider";

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
    HtmlBagComponent,
    SliderComponent,
    HtmlGraphComponent,
    HtmlTableComponent,
    HtmlIframeComponent,
    ShapesComponent
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

  // 中间件提供foreginObject渲染
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
    } else if (ga.type.startsWith(HtmlGraphComponent.TypeTag)) {
      let gauge: any = await HtmlGraphComponent.initElement(ga)
      if (gauge) {
        // this.setGraphPropety(gauge, ga.property)
        // gauge.onReload.addListener('onReload', (query: DaqQuery) => {
        //   this.hmiService.getDaqValues(query).subscribe(
        //     (result) => {
        //       gauge.setValues(query.sids, result)
        //     },
        //     (err) => {
        //       gauge.setValues(query.sids, null)
        //       console.error('get DAQ values err: ' + err)
        //     }
        //   )
        // })
        this.mapGauges[ga.id] = gauge
      }
      return gauge
    } else if (ga.type.startsWith(SliderComponent.TypeTag)) {
      let gauge: IotSliderComponent = SliderComponent.initElement(ga)
      this.mapGauges[ga.id] = gauge
      return gauge
    } else if (ga.type.startsWith(HtmlIframeComponent.TypeTag)) {
      HtmlIframeComponent.initElement(ga, isview)
      return true
    } else if (ga.type.startsWith(HtmlTableComponent.TypeTag)) {
      let gauge: DataTableComponent = HtmlTableComponent.initElement(ga)
      this.mapGauges[ga.id] = gauge
      return gauge
    }else if (ga.type.startsWith(HtmlBagComponent.TypeTag)) {
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
    let gs: GaugeSettings = null
    if (type) {
      for (let i = 0; i < GaugesManager.Gauges.length; i++) {
        console.log('查找配置', type, GaugesManager.Gauges[i].TypeTag, type.startsWith(GaugesManager.Gauges[i].TypeTag))
        if (type.startsWith(GaugesManager.Gauges[i].TypeTag)) {
          gs = new GaugeSettings(id, type)
          gs.label = GaugesManager.Gauges[i].LabelTag
          console.log('生成配置', gs)
          return gs
        }
      }
    }
    return gs
  }
}