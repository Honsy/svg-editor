import { GaugeBaseComponent } from "@/gauge/gaugeBase";
import { Utils } from "@/helpers/utils";
import { GaugeSettings } from "@/models/hmi";
import React from "react";
import ReactDOM from 'react-dom/client'
import { ChartUplotComponent } from "./chart-uplot/chart-uplot";

export class HtmlChartComponent extends GaugeBaseComponent {
  static TypeTag = 'svg-ext-html_chart'
  static LabelTag = 'HtmlChart'
  static prefixD = 'D-HXC_'

  constructor(props) {
    super(props)
  }

  static initElement(gab: GaugeSettings): any {
    return new Promise((resolve, reject) => {
      try {
        let ele = document.getElementById(gab.id)
        if (ele) {
          let htmlChart = Utils.searchTreeStartWith(ele, this.prefixD)
          let opt = { title: '', panel: { height: htmlChart.clientHeight, width: htmlChart.clientWidth } };
          if (htmlChart) {
            const elementRef = React.createRef()
            const element = React.createElement(ChartUplotComponent, { ref: (ref) => resolve(ref) })
            ReactDOM.createRoot(htmlChart).render(element)
            return elementRef
          }
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}