import { ServiceEvents } from "@/services/emit.service";
import { service } from "@/services/service";
import React, { useEffect, useState } from "react"
import SvgView from "./components/SvgView";

const Preview: React.FC<any> = ({}) => {
  let hmi, gaugesManager = service.gaugesManager;
  const [labView, setLabView] = useState(null);
  const [currentView, setCurrentView] = useState(null);

  const loadHmi = () => {
    hmi = service.projectService.getHmi()
    if (hmi && hmi.views && hmi.views.length > 0) {
      let currentView = hmi.views[0]
      let labView = hmi.views[0]
      let oldsel = localStorage.getItem('@frango.webeditor.currentview')

      setCurrentView(currentView);
      setLabView(labView);
    }
  }

  const loadData = () => {
    let hmi = service.projectService.getHmi();
    if (!hmi) {
      service.emitService.on(ServiceEvents.SERVICE_HMI_LOADED, () => {
        loadHmi();
      })
    } else {
      loadHmi();
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div style={{ height: '100%' }}>
      {labView && <SvgView view={currentView} hmi={hmi} gaugesManager={gaugesManager}></SvgView>}
    </div>
  )
}

export default React.memo(Preview)