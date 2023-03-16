import { IotSwitch } from "@/gauge/gui-helpers/IotSwitch/IotSwitch"
import { Utils } from "@/helpers/utils"
import { GaugeSettings } from "@/models/hmi"
import React from "react"
import ReactDOM from "react-dom/client"

export class HtmlSwitchComponent {
  static TypeTag = 'svg-ext-html_switch'
  static LabelTag = 'HtmlSwitch'
  static prefix = 'T-HXT_'

  static initElement(gab: GaugeSettings) {
    return new Promise((resolve, reject) => {
      // 获取组件实例对象
      try {
        let ele = document.getElementById(gab.id)
        if (ele) {
          let htmlSwitch = Utils.searchTreeStartWith(ele, this.prefix)
          // 找到Switch Dom
          if (htmlSwitch) {
            const elementRef = React.createRef()
            const element = React.createElement(IotSwitch, { ref: (ref) => resolve(ref) })
            ReactDOM.createRoot(htmlSwitch).render(element)
    
            return elementRef;
          }
        }
      } catch (error) {
        reject(error);
      }
    })
  }
}