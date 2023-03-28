import { GaugeBaseComponent } from '@/gauge/gaugeBase'
import { IotMeter } from '@/gauge/gui-helpers/IotMeter/IotMeter'
import { Utils } from '@/helpers/utils'
import { GaugeSettings } from '@/models/hmi'
import React from 'react'
import ReactDOM from 'react-dom/client'

export class HtmlBagComponent extends GaugeBaseComponent {
  static TypeTag = 'svg-ext-html_bag'
  static LabelTag = 'HtmlBag'
  static prefixD = 'D-BAG_'

  constructor(props) {
    super(props)
  }
  static initElement(gab: GaugeSettings): any {
    return new Promise((resolve, reject) => {
      // 获取组件实例对象
      // function getRef(ref, htmlBag) {
      //   //   ref.setOptions(opt);
      //   ref.resize(htmlBag.clientHeight, htmlBag.clientWidth)
      //   if (gab.property && gab.property.options) {
      //     ref.setOptions(gab.property.options)
      //     ref.init(gab.property.options.type)
      //   }
      //   resolve(ref)
      // }
      try {
        let ele = document.getElementById(gab.id)
        if (ele) {
          let htmlBag = Utils.searchTreeStartWith(ele, this.prefixD)
          if (htmlBag) {
            const elementRef = React.createRef()
            const element = React.createElement(IotMeter, { ref: (ref) => resolve(ref) })
            ReactDOM.createRoot(htmlBag).render(element)
            return elementRef
          }
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}
