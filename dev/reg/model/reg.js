define(() => {
    class Reg{
        constructor(){
            this.reg = document.getElementById("reg");
            this.tel = document.getElementById("tel");
            this.pwd = document.getElementById("pwd");
            this.log = document.getElementById("login")
            this.back = document.getElementById("back");
            this.init();
        }   
        init(){
            var that = this;
            this.reg.onclick = () =>{
                that.telV = that.tel.value;
                that.pwdV = that.pwd.value;
                that.req();
            }
            this.back.onclick = () =>{
                location.href = "http://localhost/index/index.html";
            }
            this.log.onclick = function(){
                location.href = "http://localhost/login/login.html";
            }
        }
        req(){
            var that = this;
            $.ajax({
                url:"http://localhost:81/common/reg",
                data:{
                    user:that.telV,
                    pass:that.pwdV
                },
                type:"post",
                success:function(res,status){
                // console.log(JSON.parse(res))
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
            console.log(this.res)

        }
    }




    return Reg;



});
