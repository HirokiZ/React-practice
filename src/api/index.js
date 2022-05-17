import request from '../utils/request'

//登录接口
export function login(data){
    //一定要return  因为then()要拿到结果
    return request({
        url:"/user/login",
        method:"post",
        data
    })
}

//根据token获取用户权限
export function getInfo(){
    return request({
        url:'/user/getInfo',
        method:"get"
    })
}
