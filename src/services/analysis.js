import {LOGIN,USER_INFO, ROUTES,LOG_INFO} from '@/services/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'

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

export async function getUserInfo() {
    return request(USER_INFO,METHOD.GET)
}



export default {
    login,
    getUserInfo,

}
