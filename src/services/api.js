//跨域代理前缀
//const API_PROXY_PREFIX='/api'
//const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
//const BASE_URL = process.env.VUE_APP_API_BASE_URL
const request_url = 'http://192.168.2.219:9998'
module.exports = {
  LOGIN: `${request_url}/auth/login`,
  USER_INFO: `${request_url}/auth/user/info`,
  ROUTES: `${request_url}/routes`,
  GOODS: `${request_url}/goods`,
  GOODS_COLUMNS: `${request_url}/columns`,
  ROUTES_MAP: `${request_url}/routesMap`,
  PERM_GETLIST: `${request_url}/permission/getList`,
  PERM_DEL: `${request_url}/permission/del`,
  PERM_CASLIST: `${request_url}/permission/getCascader`,
  PERM_ADD: `${request_url}/permission/add`,
  PERM_UPDATE: `${request_url}/permission/update`,
  USER_GETLIST:`${request_url}/userMgr/getList`,
  USER_DEL:`${request_url}/userMgr/del`,
  USER_ADD:`${request_url}/userMgr/add`,
  USER_UPDATE:`${request_url}/userMgr/update`,
  ROLE_LIST:`${request_url}/role/getList`,
  ADD_ROLE:`${request_url}/role/add`,
  ROLE_DEL:`${request_url}/role/del`,
  ROLE_UPDATE:`${request_url}/role/update`,
  SET_USER_ROLE:`${request_url}/userMgr/setRole`,
  CURRENT_UATH:`${request_url}/role/currentAuth`,
  SET_AUTH:`${request_url}/role/setAuth`,
  USER_UPDATE_PERSON:`${request_url}/userMgr/setUserPerson`,
  USER_PASS:`${request_url}/userMgr/setUserPass`,
  GET_USER_ROLE:`${request_url}/role/getUserRole`,
  LOG_INFO:`${request_url}/info/logInfo`,
  SYS_INFO:`${request_url}/info/sysInfo`,
  SUBTOP_INFO:`${request_url}/info/emqSubtopInfo`,
  DEVICECURRENT_INFO:`${request_url}/device/getDeviceCurrent`,
}
