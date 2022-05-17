
export function filterMenu(data,role){
    //对路由表进行一个过滤
    //filter方法返回复合条件的每一项
    //筛选循环，这个权限在不在这个数组的每一项里面的role权限在不在这个数组的每一项中，
    //如果在，那么我就留在数组中，不在就过滤掉不要了
   return data.filter(item=>{
       return item.meta.role.indexOf(role)!==-1
   }).map(item=>{
       if(item.children){
            item.children=filterMenu(item.children,role)
       }
       return item
   })
}