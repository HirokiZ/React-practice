
//初始数据
const initState={role:"",nickname:""};
export function loginReducer(prevState=initState,action){
    const {type,payload}=action
    //首次不会触发
    if(type==='add'){
        //之前我们使用扩展运算符的原因：之前是改一个字段，所以用扩展运算符，
        //现在就这一个对象，所以直接return payload  
        return payload
    }
    //首次会默认返回值
    return prevState
}

const menu=[]
export function menuReducer(prevState=menu,action){
    const {type,payload}=action
    if(type==='generate'){
        return payload
    }
    return prevState
}