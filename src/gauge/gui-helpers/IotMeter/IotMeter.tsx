import React, { LegacyRef, RefObject } from "react";
import * as echarts from 'echarts';

interface IotMeterProps {
  options: echarts.EChartsOption
}

interface IotMeterState {
  options: echarts.EChartsOption
}

export class IotMeter extends React.Component<IotMeterProps, IotMeterState> {
  chartRef: RefObject<HTMLDivElement>;
  chart: echarts.ECharts;
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
    const initOptions = props.options ? props.options : this.defaultOptions()
    this.state = {
      options: initOptions
    }
  }

  componentDidMount(): void {
    this.chart = echarts.init(this.chartRef.current)
    this.initChart();
  }

  
  initChart() {
    const { options } = this.state
    if (this.chart && options) {
      this.chart.setOption(options)
    }
  }

  public setOptions() {

  }

  defaultOptions() {
    return {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          detail: {
            formatter: '{value}'
          },
          data: [
            {
              value: 50,
              name: 'SCORE'
            }
          ]
        }
      ]
    }
  }

  render(): React.ReactNode {
      return (
        <div className='mychart-panel' ref={this.chartRef} style={{ height: '100%', width: '100%' }}></div>
      )
  }
}