import { GaugeBaseComponent } from "@/gauge/gaugeBase";

// 通用shape配置
export class ShapesComponent extends GaugeBaseComponent {
  static TypeId = 'shapes';                                   // Standard shapes (General, Shapes)
  static TypeTag = 'svg-ext-' + ShapesComponent.TypeId;       // used to identify shapes type, binded with the library svgeditor
  static LabelTag = 'Shapes';
}