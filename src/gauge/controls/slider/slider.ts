import { IotSliderComponent } from "@/gauge/gui-helpers/IotSlider/IotSlider";
import { Utils } from "@/helpers/utils";
import { GaugeSettings } from "@/models/hmi";
import React from "react";
import ReactDOM from "react-dom/client"

export class SliderComponent {
  static TypeId = 'html_slider';
  static TypeTag = 'svg-ext-' + SliderComponent.TypeId;
  static LabelTag = 'HtmlSlider';
  static prefix = 'D-SLI_';
  static initElement(gab: GaugeSettings): any {
    let ele = document.getElementById(gab.id);
    if (ele) {

    }
    return new Promise((resolve, reject) => {
      // 获取组件实例对象
      function getRef(ref, htmlSlider) {
          ref.resize(htmlSlider.clientHeight, htmlSlider.clientWidth);
          if (gab.property && gab.property.options) {
              if (!ref.setOptions(gab.property.options)) {
                  ref.init();
              }
          }
        resolve(ref)
      }
      try {
        let ele = document.getElementById(gab.id)
        if (ele) {
          let htmlSlider = Utils.searchTreeStartWith(ele, this.prefix)
          if (htmlSlider) {
            const elementRef = React.createRef()
            const element = React.createElement(IotSliderComponent, { ref: (ref) => getRef(ref, htmlSlider) })
            ReactDOM.createRoot(htmlSlider).render(element)
            return elementRef
          }
        }
      } catch (error) {
        reject(error)
      }
    })
}
}