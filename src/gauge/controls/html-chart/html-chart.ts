import { GaugeBaseComponent } from "@/gauge/gaugeBase";

export class HtmlChartComponent extends GaugeBaseComponent {
  static TypeTag = 'svg-ext-html_chart'
  static LabelTag = 'HtmlChart'
  static prefixD = 'D-HXC_'

  constructor(props) {
    super(props)
  }
}