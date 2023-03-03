import axios from "axios";

export function getImage(url: string, params?: any) {
  return axios({
    method: 'get',
    url: url,
  })
}