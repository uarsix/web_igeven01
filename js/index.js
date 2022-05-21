$(function() {
getUserInfo()
})
const layer=layui.layer
const getUserInfo=()=>{
    $.ajax({
        type: "GET",
        url:'/my/userinfo',
        
        success: res=>{
            console.log(res);
            if(res.status!==0) {layer.msg(res.message)} 
            else{
                layer.msg('请求成功')
            }
            renderAvatar(res.data)
        }
    })
}
const renderAvatar=(user)=>{
    //获取名字
    const name=user.nickname||user.username
    console.log(user.nickname)
    //欢迎文本
    $('#welcome').html(`欢迎${name}`)
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide();
        let firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName);
    }
}