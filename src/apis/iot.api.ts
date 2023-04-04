import { request } from "@/utils/request";
import qs from "qs";

export function getPointTree(params) {
  return request({
    method: 'get',
    url: '/api/iot/category/tree',
    params
  })
}

export function getPointList(data) {
  return request({
    method: 'post',
    url: '/api/iot/item',
    data: qs.stringify(data)
  })
}

export function getRealDataList(data) {
  return request({
    method: 'post',
    url: '/api/iot/item/realDataList',
    data
  })
}