import { GaugeBaseComponent } from "@/gauge/gaugeBase";
import { Utils } from "@/helpers/utils";
import { GaugeSettings } from "@/models/hmi";
import React from "react";
import ReactDOM from 'react-dom/client'
import { GraphBarComponent } from "./graph-bar";
import { GraphPieComponent } from "./graph-pie";

export class HtmlGraphComponent extends GaugeBaseComponent {
  static TypeTag = 'svg-ext-html_graph';
  static LabelTag = 'HtmlGraph';
  static prefixD = 'D-HXC_';
  static suffixPie = '-pie';
  static suffixBar = '-bar';
  constructor(props) {
    super(props);
  }
  static initElement(gab: GaugeSettings): Promise<GaugeBaseComponent> {
    return new Promise((resolve, reject) => {
      function getRef(ref, htmlGraph) {
        // let opt = { panel: { height: htmlGraph.clientHeight, width: htmlGraph.clientWidth } };
        // opt = { ...GraphBarComponent.defaultOptions(), ...opt };
        // ref.setOptions(opt);
        resolve(ref)
      }

      let ele = document.getElementById(gab.id);

      if (ele) {
        let htmlGraph = Utils.searchTreeStartWith(ele, this.prefixD);
        if (htmlGraph) {
            const elementRef = React.createRef()
            let element;
            if (gab.type.endsWith(this.suffixBar)) {
                element = React.createElement(GraphBarComponent, { ref: (ref) => getRef(ref, htmlGraph) })
            } else {
                element = React.createElement(GraphPieComponent, { ref: (ref) => getRef(ref, htmlGraph) })
            }
            ReactDOM.createRoot(htmlGraph).render(element)
            return elementRef
          }
        return {} as any
    }
    })
  }
}