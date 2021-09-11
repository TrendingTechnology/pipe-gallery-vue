import {DEVICECURRENT_INFO,SUBTOP_INFO} from '@/services/api'
import {request, METHOD} from '@/utils/request'



export async function getDCurrentInfo() {
    return request(DEVICECURRENT_INFO,METHOD.GET)
}
export async function getSubTop(clientid) {
    return request(SUBTOP_INFO,METHOD.GET,{
        clientid: clientid
    })
}



export default {
    getDCurrentInfo,
    getSubTop

}
