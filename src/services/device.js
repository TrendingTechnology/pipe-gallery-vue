import {DEVICECURRENT_INFO,STATE_CHANGE} from '@/services/api'
import {request, METHOD} from '@/utils/request'



export async function getDCurrentInfo() {
    return request(DEVICECURRENT_INFO,METHOD.GET)
}
export async function letStateChange(deviceCurrent) {
    return request(STATE_CHANGE,METHOD.POST,
        deviceCurrent
    )
}



export default {
    getDCurrentInfo,
    letStateChange

}
