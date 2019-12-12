define(() => {
    class Reg {
        constructor() {
            this.reg = document.getElementById("reg");
            this.tel = document.getElementById("tel");
            this.pwd = document.getElementById("pwd");
            this.log = document.getElementById("login")
            this.back = document.getElementById("back");
            this.war = document.querySelector(".war");
            // 手机号验证规则
            this.phoneReg = /^[1]([3-9])[0-9]{9}$/;
            // 密码正则
            this.pwdReg = /^(?![0-9]+)(?![a−zA−Z]+)(?![a−zA−Z]+)[0-9A-Za-z]{8,20}$/;
            this.init();
        }
        init() {
            var that = this;
            this.reg.onclick = () => {
                that.telV = that.tel.value;
                that.pwdV = that.pwd.value;
                console.log(that.phoneReg.test(that.telV))
                if(!(that.phoneReg.test(that.telV))){
                    that.war.innerHTML = "号码不符合规范"
                }else{
                    that.req();
                }
            }

            this.back.onclick = () => {
                location.href = "http://localhost/index/index.html";
            }
            this.log.onclick = function () {
                location.href = "http://localhost/login/login.html";
            }
        }
        req() {
            var that = this;
            $.ajax({
                url: "http://localhost:81/common/reg",
                data: {
                    user: that.telV,
                    pass: that.pwdV
                },
                type: "post",
                success: function (res, status) {
                    // console.log(JSON.parse(res))
                    that.res = JSON.parse(res);
                    that.load();
                },
                error: function (res, status) {
                    console.log(status);
                    // console.loag(status);
                }
            })
        }
        load() {
            if (this.res.msg == "注册成功") {
                // location.href = "http://localhost/login/login.html"
            }
        }
    }




    return Reg;



});
