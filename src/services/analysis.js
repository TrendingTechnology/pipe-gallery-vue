import {SYS_INFO,SUBTOP_INFO} from '@/services/api'
import {request, METHOD} from '@/utils/request'

/**
 * 登录服务
 * @param userAccount 账户名
 * @param userPassword 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(userAccount, userPassword) {
    return request(LOGIN, METHOD.POST, {
        userAccount: userAccount,
        userPassword: userPassword
    })
}

export async function getSysInfo() {
    return request(SYS_INFO,METHOD.GET)
}
export async function getSubTop(clientid) {
    return request(SUBTOP_INFO,METHOD.GET,{
        clientid: clientid
    })
}



export default {
    login,
    getSysInfo,
    getSubTop

}
