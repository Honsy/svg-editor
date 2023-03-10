import { getStorageProject, saveStorageProject } from '@/apis/local.api'
import { Utils } from '@/helpers/utils'
import { Device, DeviceNetProperty, DeviceType, DEVICE_PREFIX } from '@/models/device'
import { View } from '@/models/hmi'
import { ProjectData } from '@/models/project'
import { logger } from '@/utils/logger'
import EmitService, { ServiceEvents } from './emit.service'

export enum SaveMode {
  Current,
  Save,
  SaveAs
}

export class ProjectService {
  projectData: ProjectData
  appService: any
  ready: any
  emit: EmitService
  constructor(emit: EmitService) {
    this.load()
    this.ready = true
    this.emit = emit
  }

  private load() {
    let proj = getStorageProject()
    if (!proj) {
      this.setNewProject()
    } else {
      this.projectData = JSON.parse(proj)
    }
  }

  setNewProject() {
    this.projectData = new ProjectData()
    let server = new Device(Utils.getGUID(DEVICE_PREFIX))
    server.name = 'FUXA'
    server.id = '0'
    server.type = DeviceType.FuxaServer
    server.enabled = true
    server.property = new DeviceNetProperty()
    this.save()
  }
  save() {
    saveStorageProject(this.projectData)
  }

  saveProject(mode = SaveMode.Save) {
    logger.log("保存项目")
    this.emit.trigger(ServiceEvents.SERVICE_SAVE_CURRENT, { mode })
  }
  /**
   * get hmi resource
   */
  getHmi() {
    return this.ready && this.projectData ? this.projectData.hmi : null
  }
  // 视图保存
  setView(view: View) {
    let v = null
    for (let i = 0; i < this.projectData.hmi.views.length; i++) {
      if (this.projectData.hmi.views[i].id === view.id) {
        v = this.projectData.hmi.views[i]
      }
    }
    if (v) {
      v = view
    } else {
      this.projectData.hmi.views.push(view)
    }
    console.log(this.projectData)
    saveStorageProject(this.projectData)
    // this.storage.setServerProjectData(ProjectDataCmdType.SetView, view, this.projectData).then(result => {
    // }, err => {
    //     console.error(err);
    //     // this.notifySaveError(err);
    // });
  }
  getLayoutTheme() {
    if (this.projectData.hmi.layout) {
      return this.projectData.hmi.layout.theme
    }
    return null
  }
  /**
   * Remove the View from Project
   * Delete from Server
   * @param view
   */
  removeView(view: View) {
    for (let i = 0; i < this.projectData.hmi.views.length; i++) {
      if (this.projectData.hmi.views[i].id === view.id) {
        this.projectData.hmi.views.splice(i, 1)
        break
      }
    }
    saveStorageProject(this.projectData)
  }
  // this.storage.setServerProjectData(ProjectDataCmdType.DelView, view, this.projectData).then(result => {
  // }).catch(err => {
  //     console.error(err);
  //     // this.notifySaveError(err);
  // });
}
