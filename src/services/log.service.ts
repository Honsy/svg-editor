import { enableLogs } from "@/utils/logger";

export class LogService {
  constructor() {
    enableLogs(true, "IV")
  }
}