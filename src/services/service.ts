import { ProjectService } from "./project.service";
import { ThemeService } from "./theme.service";

export class Service {
  themeService: ThemeService;
  projectService: ProjectService;
  constructor() {
    this.projectService = new ProjectService();
    this.themeService = new ThemeService();
  }
  init() {}
}

export const service = new Service()