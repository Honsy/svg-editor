import { GaugeBaseComponent } from '@/gauge/gaugeBase'
import { Utils } from '@/helpers/utils'
import { GaugeSettings } from '@/models/hmi'

export class HtmlIframeComponent extends GaugeBaseComponent {
  static TypeTag = 'svg-ext-own_ctrl-iframe'
  static LabelTag = 'HtmlIframe'
  static prefixD = 'D-OXC_'

  constructor(props) {
    super(props)
  }

  static initElement(gaugeSettings: GaugeSettings, isview: boolean) {
    let ele = document.getElementById(gaugeSettings.id)
    if (ele) {
      let svgIframeContainer = Utils.searchTreeStartWith(ele, this.prefixD)
      if (svgIframeContainer) {
        svgIframeContainer.innerHTML = ''
        let iframe = document.createElement('iframe')
        iframe.setAttribute('name', gaugeSettings.name)
        iframe.style['width'] = '100%'
        iframe.style['height'] = '100%'
        iframe.style['border'] = 'none'
        iframe.style['background-color'] = '#F1F3F4'
        if (!isview) {
          svgIframeContainer.innerHTML = 'iframe'
          iframe.style['overflow'] = 'hidden'
          iframe.style['pointer-events'] = 'none'
        }
        iframe.setAttribute('title', 'iframe')
        if (gaugeSettings.property && gaugeSettings.property.address && isview) {
          iframe.setAttribute('src', gaugeSettings.property.address)
        }
        iframe.innerHTML = '&nbsp;'
        svgIframeContainer.appendChild(iframe)
      }
    }
  }
}
