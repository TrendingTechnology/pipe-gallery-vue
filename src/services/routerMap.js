// eslint-disable-next-line no-unused-vars
import {ROUTES_MAP} from './api'
// eslint-disable-next-line no-unused-vars
import {request, METHOD} from '@/utils/request'

//加载routesMap
export async function getRoutesMap() {
    return request(ROUTES_MAP, METHOD.GET)
}

export default {
    getRoutesMap
}