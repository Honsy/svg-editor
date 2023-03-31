import { service } from "@/utils";
import qs from "qs";

export function getPointTree(params) {
  return service({
    method: 'get',
    url: '/api/iot/category/tree',
    params
  })
}

export function getPointList(data) {
  return service({
    method: 'post',
    url: '/api/iot/item',
    data: qs.stringify(data)
  })
}

export function getRealDataList(data) {
  return service({
    method: 'post',
    url: '/api/iot/item/realDataList',
    data
  })
}