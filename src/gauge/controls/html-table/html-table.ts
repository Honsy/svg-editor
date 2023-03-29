import { Utils } from '@/helpers/utils'
import { GaugeSettings } from '@/models/hmi'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { DataTableComponent } from './data-table'

export class HtmlTableComponent {
  static TypeTag = 'svg-ext-own_ctrl-table'
  static LabelTag = 'HtmlTable'
  static prefixD = 'D-OXC_'

  static initElement(gab: GaugeSettings): any {
    
    return new Promise((resolve, reject) => {
      try {
        let ele = document.getElementById(gab.id)
        if (ele) {
          let htmlTable = Utils.searchTreeStartWith(ele, this.prefixD)
          // 找到Switch Dom
          if (htmlTable) {
            const elementRef = React.createRef()
            const element = React.createElement(DataTableComponent, { ref: (ref) => resolve(ref) })
            ReactDOM.createRoot(htmlTable).render(element)

            return elementRef
          }
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}
