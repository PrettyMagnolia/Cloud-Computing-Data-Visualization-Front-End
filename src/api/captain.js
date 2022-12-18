import request from '@/utils/request'

export function getOverallConsumption() {
  return request({
    url: '/api/getOverallConsumption',
    method: 'get',
  })
}

export function getUserGender() {
  return request({
    url: '/api/getUserGender',
    method: 'get',
  })
}

export function getUserAge() {
  return request({
    url: '/api/getUserAge',
    method: 'get',
  })
}

export function getUserMarry() {
  return request({
    url: '/api/getUserMarry',
    method: 'get',
  })
}

export function getTopOrder() {
  return request({
    url: '/api/getTopOrder',
    method: 'get',
  })
}

export function getTopPay() {
  return request({
    url: '/api/getTopPay',
    method: 'get',
  })
}