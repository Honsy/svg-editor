import { GaugesManager } from "@/gauge/gaugeManager"
import { Hmi, View } from "@/models/hmi"
import React, { useEffect } from "react"

declare var SVG: any

interface SvgViewProps {
  id?: string | null
  view: View
  hmi: Hmi
  gaugesManager: GaugesManager
}

const SvgView: React.FC<SvgViewProps> = (props) => {

  const dataContainer: React.RefObject<HTMLDivElement> = React.createRef()
  let id, view, child;

  const init = () => {
    loadHmi(props.view)
  }

  const loadHmi = (view: View) => {
    if (view) {
      id = view.id;
      view = view;
      dataContainer.current.innerHTML = view.svgcontent.replace('<title>Layer 1</title>', '')
      if (view.profile.bkcolor && child) {
        dataContainer.current.style.backgroundColor = view.profile.bkcolor
      }
    }

    loadWatch(view);
  }

  const loadWatch = (view: View) => {

  }

  useEffect(() => {
    init();
  }, [])

  return (
    <div ref={dataContainer} className="view-container" id="content"></div>
  )
}

export default React.memo(SvgView)
