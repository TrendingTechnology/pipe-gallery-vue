import {PERM_GETLIST,PERM_DEL,PERM_CASLIST,PERM_ADD,PERM_UPDATE} from '@/services/api'
import {request, METHOD} from '@/utils/request'

/**
 * 获取菜单列表
 * @returns {Promise<*>}
 */
export async function getPermissionList() {
    return request(PERM_GETLIST,METHOD.GET)
}

//删除一个菜单
export async function delPermission(id) {
    return request(PERM_DEL, METHOD.POST, {
        id: id,
    })
}

//获取级联菜单
export async function getCasList() {
    return request(PERM_CASLIST,METHOD.GET)
}

//增加一个菜单
export async function addPermission(resource) {
    return request(PERM_ADD, METHOD.POST, {
        resource: resource,
    })
}

//修改一个菜单
export async function updatePermission(resource) {
    return request(PERM_UPDATE, METHOD.POST, {
        resource: resource,
    })
}