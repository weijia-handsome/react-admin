//导入请求数据的方法
import { getInfo, getMenu } from '@api/acl/login'
import { GET_USER_INFO, GET_MENU_INFO } from './constants'

console.log(GET_USER_INFO, GET_MENU_INFO);
//定义获取用户信息的方法
function getUserInfoSync(data) {
    return { type: GET_USER_INFO, data }
}

//定义获取用户信息的异步方法
export function getUserInfo() {
    return dispatch => {
        return getInfo().then(res => {
            dispatch(getUserInfoSync(res))
            return res
        })
    }
}

//定义获取菜单数据的同步方法
function getMenuInfoSync(data) {
    return { type: GET_MENU_INFO, data }
}

//定义获取菜单信息的异步方法
export function getMenuInfo() {
    return dispatch => {
        return getMenu().then(res => {
            dispatch(getMenuInfoSync(res.permissionList))
            return res.permissionList
        })
    }
}
