//引入常量
import {GET_USER_INFO,GET_MENU_INFO} from './constants'

//定义默认值
const initUser = {
    name:'',
    avatar:'',
    permissionValueList:'',
    permissionList:''
}
export default function user(prevState=initUser,action){
    switch(action.type){
        case GET_USER_INFO:
            return{
                ...prevState,
                ...action.data
            }
        case GET_MENU_INFO:
            return{
                ...prevState,
                permissionList:action.data
            }
        default:
        return prevState
    }
}