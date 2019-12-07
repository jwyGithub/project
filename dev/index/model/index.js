define(()=>{
    class Login{
        constructor(){
            this.login = document.getElementById("login");
            // console.log(this.login)
            this.reg = document.getElementById("reg");
            this.init();
        }
        init(){
            this.login.onclick = () =>{
                location.href = "http://localhost/Production/login/login.html";
            }
            this.load();
        }
        load(){
            var that = this;
            // http://localhost:81/common/login
            $.ajax({
                url:"http://localhost:81/common/login",
                success:function(res){
                    that.res = JSON.parse(res)
                }
            })
        }
    }

    







    
    return Login;



})