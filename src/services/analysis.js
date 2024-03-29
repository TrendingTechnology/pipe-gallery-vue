import {SYS_INFO,SUBTOP_INFO} from '@/services/api'
import {request, METHOD} from '@/utils/request'




export async function getSysInfo() {
    return request(SYS_INFO,METHOD.GET)
}
export async function getSubTop(clientid) {
    return request(SUBTOP_INFO,METHOD.GET,{
        clientid: clientid
    })
}



export default {
    getSysInfo,
    getSubTop

}
