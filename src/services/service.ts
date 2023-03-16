import { GaugesManager } from "@/gauge/gaugeManager";
import EmitService from "./emit.service";
import { LogService } from "./log.service";
import { ProjectService } from "./project.service";
import { ThemeService } from "./theme.service";

export class Service {
  themeService: ThemeService;
  projectService: ProjectService;
  logService: LogService;
  emitService: EmitService = new EmitService();
  gaugesManager: GaugesManager

  constructor() {
    this.logService = new LogService();
    this.projectService = new ProjectService(this.emitService);
    this.themeService = new ThemeService();
    this.gaugesManager = new GaugesManager();
  }
}

export const service = new Service()