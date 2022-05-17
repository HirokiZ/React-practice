//教师管理页面的接口
import request from '../utils/request'
/*
    参数要求：
    name:""      姓名  非必填
    subject:""   学科  非必填
    tel:""       电话  非必填
    page:1       页码  必填
    pageSize:20  条数  必填

*/
export function getTeacherList(data){
    return request({
        url:'/teacher/teacherList',
        method:"post",
        data
    })
}
//新增教师接口
export function addTeacher(data){
    return request({
        url:'/teacher/addTeacher',
        method:"post",
        data
    })
}
//编辑教师接口  id：id  额外加id
export function editTeacher(data){
    return request({
        url:'/teacher/editTeacher',
        method:"post",
        data
    })
}

//删除单个教师接口
export function deletes(data){
    return request({
        url:'/teacher/delete',
        method:"post",
        data
    })
}

//批量删除教师接口 ids:[id数组]
export function batchDelete(data){
    return request({
        url:'/teacher/batchDelete',
        method:"post",
        data
    })
}