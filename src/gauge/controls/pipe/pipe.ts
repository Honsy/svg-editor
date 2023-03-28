import { GaugeSettings } from '@/models/hmi'

export class PipeComponent {
  static TypeId = 'pipe'
  static TypeTag = 'svg-ext-' + PipeComponent.TypeId // used to identify shapes type, binded with the library svgeditor
  static LabelTag = 'Pipe'
  static prefixB = 'PIE_'

  static detectChange(gab: GaugeSettings) {
    let data = { id: gab.id, property: gab.property.options }
    let result = window.svgEditor.runExtension('pipe', 'initPipe', data)
    return result
  }
}
