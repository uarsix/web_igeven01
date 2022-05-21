$(function() {
  const form = layui.form;

form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: (val) => {
        if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
    },
    rePwd: (val) => {
        if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
    },
});  
//充值密码
$(".layui-form").on("submit", function (e) {
    e.preventDefault();
    console.log(1);
    $.ajax({
        type: "POST",
        url: "/my/updatepwd",
        data:$(this).serialize(),
        success: (res) => {
            console.log(res);
            if (res.status !== 0) return layer.msg("更新密码失败！");
            layer.msg("更新密码成功！");
            // 重置表单
            localStorage.removeItem('token')
            window.parent.location.href='/login.html'
        },
    });
});
})