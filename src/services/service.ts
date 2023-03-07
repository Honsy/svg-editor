import EmitService from "./emit.service";
import { LogService } from "./log.service";
import { ProjectService } from "./project.service";
import { ThemeService } from "./theme.service";

export class Service {
  themeService: ThemeService;
  projectService: ProjectService;
  logService: LogService;
  emitService: EmitService = new EmitService();
  constructor() {
    this.logService = new LogService();
    this.projectService = new ProjectService(this.emitService);
    this.themeService = new ThemeService();
  }
}

export const service = new Service()