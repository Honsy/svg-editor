import React, { RefObject } from "react";
import { GraphBaseComponent } from "./graph-base";
import * as echarts from 'echarts';
interface GraphBarComponentProps {
  options: echarts.EChartsOption
}

interface GraphBarComponentState {
  options: echarts.EChartsOption
}

export class GraphBarComponent extends GraphBaseComponent<GraphBarComponentProps, GraphBarComponentState> {
  chartRef: RefObject<HTMLDivElement>;
  chart: echarts.ECharts;

  constructor(props) {
    super(props);
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


  defaultOptions() {
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
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