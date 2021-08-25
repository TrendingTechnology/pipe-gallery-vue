import {LOGIN,USER_INFO, ROUTES,LOG_INFO} from '@/services/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
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

export async function getRoutesConfig() {
  return request(ROUTES, METHOD.GET)
}
export async function getLogInfo() {
  return request(LOG_INFO,METHOD.GET)
}
/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}
export default {
  login,
  logout,
  getRoutesConfig,
  getUserInfo
}
