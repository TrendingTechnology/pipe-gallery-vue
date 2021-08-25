import {USER_GETLIST,USER_DEL,USER_ADD,USER_UPDATE,SET_USER_ROLE,GET_USER_ROLE} from '@/services/api'
import {request, METHOD} from '@/utils/request'

/**
 * 获取菜单列表
 * @returns {Promise<*>}
 */
export async function getUserList() {
    return request(USER_GETLIST,METHOD.GET)
}

//删除一个用户
export async function delUser(user) {
    return request(USER_DEL, METHOD.POST, {
        user: user,
    })
}
//
// //获取级联菜单
// export async function getCasList() {
//     return request(PERM_CASLIST,METHOD.GET)
// }
//
//增加一个用户
export async function addUser(user) {
    return request(USER_ADD, METHOD.POST, {
        user: user,
    })
}
//
//修改一个菜单
export async function updateUser(user) {
    return request(USER_UPDATE, METHOD.POST, {
        user: user,
    })
}

//设置用户角色
export async function setRole(userRole) {
    return request(SET_USER_ROLE, METHOD.POST, {
        userRole: userRole,
    })
}

//获取当前用户角色信息
export async function getUserRole(id) {
    return  request(GET_USER_ROLE, METHOD.GET,{
        userId: id,
    })
}