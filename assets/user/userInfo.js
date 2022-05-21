$(function() {
   const form=layui.form
   form.verify({
        nickname: (val) => {
            if (val.length > 6) {
                return "昵称长度必须在 1 ~ 6 个字符之间！";
        }
        } })
        const initUserinfo = () => {
            $.ajax({
                type: "GET",
                url:'/my/userinfo',
                success:(res)=>{
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    form.val("formUserInfo", res.data);
                }
            })
        }
        initUserinfo ()

        //点击重置
       $('#btnReset') .click((e) => {
           e.preventDefault()
          initUserinfo()
          $('.layui-form')[0].reset()
       })

       //提交按钮
       $('.layui-form').on('submit',function(e){
           e.preventDefault()
           console.log($(this).serialize());
          $.ajax({
              type:'POST',
              url:'/my/userinfo',
              data:$(this).serialize(),
              success:(res)=>{
                  if(res.status!==0){return layer.msg(res.message)}
                  layer.msg(res.message)
                  console.log(2);
                 window.parent.getUserInfo()
              }
          })
          
       })
         
})