define(() => {
    class UserLogin{
        constructor(){
            this.tel = document.getElementById("tel");
            this.pwd = document.getElementById("pwd");
            this.btn = document.getElementById("login");
            this.reg = document.getElementById("reg")
            this.back = document.getElementById("back");
            this.tip = document.querySelector(".tip");
            this.forget = document.querySelector(".forget");
            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.btn.onclick = () => {
                that.telV = that.tel.value;
                that.pwdV = that.pwd.value;
                that.login();
            }
            this.back.onclick = () =>{
                location.href = "http://localhost/index/index.html";
            }
            this.reg.onclick = () =>{
                location.href = "http://localhost/reg/reg.html";
            }
            this.forget.onclick = () =>{
                that.tip.innerHTML = "提示：此功能暂未开放"
            }
        }
        login(){
            var that = this;
            $.ajax({
                url:"http://localhost:81/common/login",
                data:{
                    user:that.telV,
                    pass:that.pwdV
                },
                type:"post",
                success:function(res,status){
                    that.res = JSON.parse(res);
                    that.load();
                },
                error:function(res,status){
                    console.log(status);
                    // console.loag(status);
                }
            })
        }
        load(){
            if(this.res.code == 400 && this.res.msg == "账号不存在"){
                this.tip.innerHTML = "提示：账号不存在";
            }else if(this.res.code == 400 && this.res.msg == "密码错误"){
                this.tip.innerHTML = "提示：密码错误";
            }else if(this.res.code == 200 && this.res.msg == "登录成功"){
                setCookie("user",this.telV,{
                    path:"/"
                })
                location.href = "http://localhost/index/index.html";
            }
        }
    }

    function setCookie(key, val, options) {
        options = options || {};
        var p = options.path ? ";path=" + options.path : "";
        var e = "";
        if (options.expires) {
            var d = new Date();
            d.setDate(d.getDate() + options.expires)
            e = ";expires=" + d;
        }
        document.cookie = key + "=" + val + e + p;
    }
    


    return UserLogin;

});
