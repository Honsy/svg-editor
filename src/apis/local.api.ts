
// 读取项目
export function getStorageProject() {
  return localStorage.getItem("project")
}

// 保存项目
export function saveStorageProject(proj) {
  if (proj instanceof Object) {
    proj = JSON.stringify(proj);
  }
  return localStorage.setItem("project", proj)
}
