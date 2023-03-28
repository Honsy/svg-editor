import React, { LegacyRef, RefObject } from "react";
import "./chart-uplot.scss"
import * as echarts from 'echarts';

interface ChartUplotComponentProps {
  options: echarts.EChartsOption
}

interface ChartUplotComponentState {
  options: echarts.EChartsOption
}

export class ChartUplotComponent extends React.Component<ChartUplotComponentProps, ChartUplotComponentState> {
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
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
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