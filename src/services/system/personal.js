import {USER_UPDATE_PERSON,USER_PASS} from '@/services/api'
import {request, METHOD} from '@/utils/request'


//修改个人信息
export async function setPersonal(user) {
    return request(USER_UPDATE_PERSON, METHOD.POST, {
        user: user,
    })
}

//修改密码
export async function setPass(oldPass,newPass) {
    return request(USER_PASS, METHOD.POST, {
        oldPass: oldPass,
        newPass: newPass,
    })
}