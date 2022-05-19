$(function() {
    $('#link_reg').on('click', function(){
        $('.reg-box').show();
        $('.login-box').hide();;
    })
     $('#link_login').on('click', function(){
        $('.login-box').show();
        $('.reg-box').hide();;
    })

    //校验
    const form=layui.form
    form.verify(
        {
            //密码校验规则
         pwd:[/^[\S]{6,12}$/ ,'密码必须6到12位，且不能出现空格'] 
        ,
        // 确认密码规则
        repwd:(value)=>{
            const pwd = $(".reg-box [name=password").val()
            if ( pwd!==value) return '两次密码输入不一致'
        }
        }
    )
    const  layer=layui.layer
    //注册
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.ajax(
        {
            type: 'POST',
            url:'/api/reguser',
            data: {
            username: $("#form_reg [name=username").val(),
            password: $("#form_reg [name=password").val(),
            },
            success: (res)=>{
                if(res.status!==0)return layer.msg(res.message)
                layer.msg('注册成功');
                $('.link_login').click()
            }
        }
    )
    })
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax(
            {
                type:'POST',
                url: "/api/login",
                data:$(this).serialize(),
                success:(res)=>{
                    console.log(res);
                    if(res.status!==0)return layer.msg(res.message)
                    localStorage.setItem('token', res.token)
                    // location.href='/index.html'
                }
            }
        )
    })
})
 