import React from "react";
import "./iot-slider.scss";

declare const noUiSlider: any
declare const wNumb: any

export class IotSliderOptions {
  orientation = 'vertical' //'horizontal';
  direction = 'ltr'
  fontFamily = 'Sans-serif'
  shape = { baseColor: '#cdcdcd', connectColor: '#262c3b', handleColor: '#3f4964' }
  marker = { color: '#222222', subWidth: 5, subHeight: 1, fontSize: 18, divHeight: 2, divWidth: 12 }
  range = { min: 0, max: 100 }
  step = 1
  pips = { mode: 'values', values: [0, 50, 100], density: 4 }
  tooltip = { type: 'none', decimals: 0, background: '#FFF', color: '#000', fontSize: 12 }
}


export class IotSliderComponent extends React.Component {
  public id: string
  public panel: React.RefObject<HTMLDivElement>
  public slider: React.RefObject<HTMLDivElement>
  public options: IotSliderOptions

  size = { w: 0, h: 0 }
  padding = 40
  defOptions = new IotSliderOptions()
  uiSlider: any
  onUpdate: any
  uiWorking = false
  uiWorkingTimeout: any

  constructor(props) {
    super(props)
    this.panel = React.createRef()
    this.slider = React.createRef()
  }

  componentDidMount(): void {
    this.options = Object.assign(this.defOptions, this.options);
  }

  resize(height?, width?) {
    this.size.h = height - 2 * this.padding
    this.size.w = width - 2 * this.padding
    this.init()
  }

  init() {
    if (this.options.orientation === 'vertical') {
      this.slider.current.style.height = this.size.h + 'px'
      this.slider.current.style.width = null
    } else {
      this.slider.current.style.width = this.size.w + 'px'
      this.slider.current.style.height = null
    }
    let tooltip = [false]
    if (this.options.tooltip.type === 'hide' || this.options.tooltip.type === 'show') {
      tooltip = [wNumb({ decimals: this.options.tooltip.decimals })]
    }
    if (this.uiSlider) {
      this.uiSlider.off()
      this.uiSlider.destroy()
    }
    this.uiSlider = noUiSlider.create(this.slider.current, {
      start: [this.options.range.min + Math.abs(this.options.range.max - this.options.range.min) / 2],
      connect: [true, false],
      orientation: this.options.orientation,
      direction: this.options.direction,
      tooltips: tooltip,
      range: this.options.range,
      step: this.options.step,
      pips: {
        mode: 'values',
        values: this.options.pips.values,
        density: this.options.pips.density
      },
      shape: this.options.shape,
      marker: this.options.marker
    })
    // tooltip
    if (this.options.tooltip.type === 'show') {
      var tp = this.uiSlider.target.getElementsByClassName('noUi-tooltip')
      if (tp && tp.length > 0) tp[0].style.display = 'block'
    } else if (this.options.tooltip.type === 'hide') {
      var tp = this.uiSlider.target.getElementsByClassName('noUi-active noUi-tooltip')
      if (tp && tp.length > 0) tp[0].style.display = 'block'
    }
    if (this.options.tooltip.type !== 'none') {
      var tp = this.uiSlider.target.getElementsByClassName('noUi-tooltip')
      if (tp && tp.length > 0) {
        tp[0].style.color = this.options.tooltip.color
        tp[0].style.background = this.options.tooltip.background
        tp[0].style.fontSize = this.options.tooltip.fontSize + 'px'
      }
    }

    let self = this
    this.uiSlider.on('slide', function (values, handle) {
      if (self.onUpdate) {
        self.resetWorkingTimeout()
        self.onUpdate(values[handle])
      }
    })
  }

  resetWorkingTimeout() {
    this.uiWorking = true
    if (this.uiWorkingTimeout) {
      clearTimeout(this.uiWorkingTimeout)
    }
    let self = this
    this.uiWorkingTimeout = setTimeout(function () {
      self.uiWorking = false
    }, 1000)
  }
  render(): React.ReactNode {
    return (
      <div style={{ margin: 40 }} ref={this.panel}>
        <div ref={this.slider} id="mySlider" className="myslider-container"></div>
      </div>
    )
  }
}