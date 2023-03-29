import React, { RefObject } from "react";
import { GraphBaseComponent } from "./graph-base";

export class GraphPieComponent extends GraphBaseComponent {
  chartRef: RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.chartRef = React.createRef()

  }

  render(): React.ReactNode {
      return (
        <div className='mychart-panel' ref={this.chartRef} style={{ height: '100%', width: '100%' }}></div>
      )
  }
}