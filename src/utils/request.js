import axios from 'axios'
import { message } from 'antd';
const service=axios.create({
    //后台接口地址
    baseURL:"http://47.98.219.152:3000",
})

//请求拦截器

service.interceptors.request.use(config=>{
    if(sessionStorage.getItem('token')){
        config.headers['Authorization']=`Bearer ${sessionStorage.getItem('token')}`
    }
    return config
})

//响应拦截器
service.interceptors.response.use(response=>{
    const data=response.data
    if(data.code===-1){
        message.error(data.msg || '操作失败');
        return Promise.reject(data.msg || '操作失败')
    }
    return data
})
export default service