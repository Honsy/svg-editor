import { GaugeDialogType } from "@/gauge/gauge-property/gaugeProperty";
import { GaugeBaseComponent } from "@/gauge/gaugeBase";
import { Utils } from "@/helpers/utils";
import { GaugeProperty, GaugeRangeProperty, GaugeSettings } from "@/models/hmi";

export class GaugeProgressComponent extends GaugeBaseComponent {
  static TypeTag = 'svg-ext-gauge_progress';
  static LabelTag = 'HtmlProgress';
  static prefixA = 'A-GXP_';
  static prefixB = 'B-GXP_';
  static prefixH = 'H-GXP_';
  static prefixMax = 'M-GXP_';
  static prefixMin = 'm-GXP_';
  static prefixValue = 'V-GXP_';
  static barColor = '#3F4964';
  constructor(props) {
    super(props);
  }

  static getDialogType(): GaugeDialogType {
    return GaugeDialogType.MinMax;
  }

  static initElement(ga: GaugeSettings, isview: boolean = false) {
    let ele = document.getElementById(ga.id);
    if (ele) {
      if (!ga.property) {
        ga.property = new GaugeProperty();
        let ip: GaugeRangeProperty = new GaugeRangeProperty();
        ip.type = this.getDialogType();
        ip.min = 0;
        ip.max = 100;
        ip.style = [true, true];
        ip.color = '#3F4964';
        ga.property.ranges = [ip];
      }
      if (ga.property.ranges.length > 0) {
        let gap: GaugeRangeProperty = ga.property.ranges[0];
        // label min
        let htmlLabel = Utils.searchTreeStartWith(ele, this.prefixMin);
        if (htmlLabel) {
          htmlLabel.innerHTML = gap.min.toString();
          htmlLabel.style.display = (gap.style[0]) ? 'block' : 'none';
        }
        // label max
        htmlLabel = Utils.searchTreeStartWith(ele, this.prefixMax);
        if (htmlLabel) {
          htmlLabel.innerHTML = gap.max.toString();
          htmlLabel.style.display = (gap.style[0]) ? 'block' : 'none';
        }
        // value
        let htmlValue = Utils.searchTreeStartWith(ele, this.prefixValue);
        if (htmlValue) {
          htmlValue.style.display = (gap.style[1]) ? 'block' : 'none';
        }
        // bar color
        let rect = Utils.searchTreeStartWith(ele, this.prefixB);
        if (rect) {
          rect.setAttribute('fill', gap.color);
        }
      }
    }
  }
}