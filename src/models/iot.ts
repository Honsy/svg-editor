

export class IotPoint {
  code: string; // 点位编码
  crtType: string; // 点位类型
  dataSource: string;
  constructor(code: string) {
      this.code = code
  }
}