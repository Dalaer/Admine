/*
    1.判断有无localStorage
    2.传入数据 是否在本地存在 
                存在----》直接返回数据
                不存在---》回调函数 接取参数
*/
// ---------------------------------------------------------------不能用解构赋值
// export default {
//     storage(){
//         alert(navigator.userAgent)
//     }
// }
// --------------------------------------------------------------------可以用解构赋值
module.exports.storage = function(){
    alert(navigator.userAgent)
}
