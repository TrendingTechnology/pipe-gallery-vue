import {ROLE_LIST,CURRENT_UATH,SET_AUTH,ADD_ROLE,ROLE_DEL,ROLE_UPDATE} from '@/services/api'
import {request, METHOD} from '@/utils/request'

/**
 * 获取列表
 * @returns {Promise<*>}
 */
export async function getRoleList() {
    return request(ROLE_LIST,METHOD.GET)
}

export async function getCurrentAuth(id) {
    return request(CURRENT_UATH,METHOD.POST,{
        id:id,
    })
}

export async function setAuth(auth) {
    return request(SET_AUTH,METHOD.POST,{
        auth:auth,
    })
}

//删除一个角色
export async function delRole(id) {
    return request(ROLE_DEL, METHOD.POST, {
        id: id,
    })
}

//增加一个菜单
export async function addRole(role) {
    return request(ADD_ROLE, METHOD.POST, {
        role: role,
    })
}
//修改一个角色
export async function updateRole(role) {
    return request(ROLE_UPDATE, METHOD.POST, {
        role: role,
    })
}