import {DEVICECURRENT_INFO, DEVICELOG_INFO, STATE_CHANGE,QUERY_CMD} from '@/services/api'
import {request, METHOD} from '@/utils/request'


export async function getDCurrentInfo(queryDevice) {
    return request(DEVICECURRENT_INFO, METHOD.POST, queryDevice)
}

export async function letStateChange(deviceCurrent) {
    return request(STATE_CHANGE, METHOD.POST,
        deviceCurrent
    )
}

export async function letQuery(queryOption) {
    return request(QUERY_CMD, METHOD.POST,
        queryOption
    )
}


export async function getDLogInfo(day, queryDevice) {
    return request(DEVICELOG_INFO, METHOD.GET, {
        day: day,
        wsName: queryDevice.wsName,
        node: queryDevice.node
    })
}


export default {
    getDCurrentInfo,
    letStateChange,
    getDLogInfo,
    letQuery
}
