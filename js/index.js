$(function () {
    getUserInfo()
    //退出登陆
    $("#btnLogout").click(() => {
        layui.layer.confirm(
            "确定退出登录？",
            { icon: 3, title: "" },
            function (index) {
                // 清空本地存储里面的 token
                localStorage.removeItem("token");
                // 重新跳转到登录页面
                location.href = "/login.html";
            }
        );
    });
})
// 获取layui
const layer = layui.layer
function  getUserInfo(){
    $.ajax({
        type: "GET",
        url: '/my/userinfo',

        success: res => {
            console.log(res);
            if (res.status !== 0) {return layer.msg(res.message) }
            else {
                layer.msg('请求成功')
            }
            renderAvatar(res.data)
        }   
    })
}
const renderAvatar = (user) => {
    //获取名字
    let name = user.nickname || user.username

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
        $(".text-avatar").html(firstName).show();
    }
}

