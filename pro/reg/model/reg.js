"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function () {
    var Reg = function () {
        function Reg() {
            _classCallCheck(this, Reg);

            this.reg = document.getElementById("reg");
            this.tel = document.getElementById("tel");
            this.pwd = document.getElementById("pwd");
            this.log = document.getElementById("login");
            this.back = document.getElementById("back");
            this.war = document.querySelector(".war");
            // 手机号验证规则
            this.phoneReg = /^[1]([3-9])[0-9]{9}$/;
            // 密码正则
            this.pwdReg = /^[a-z0-9_-]{6,18}$/;
            this.init();
        }

        _createClass(Reg, [{
            key: "init",
            value: function init() {
                var that = this;
                this.reg.onclick = function () {
                    that.telV = that.tel.value;
                    that.pwdV = that.pwd.value;
                    if (!that.phoneReg.test(that.telV)) {
                        that.war.innerHTML = "号码不符合规范";
                    } else if (!that.pwdReg.test(that.pwdV)) {
                        that.war.innerHTML = "密码为6位英文和数字组合";
                    } else {
                        that.req();
                    }
                };
                this.back.onclick = function () {
                    location.href = "http://localhost/index/index.html";
                };
                this.log.onclick = function () {
                    location.href = "http://localhost/login/login.html";
                };
            }
        }, {
            key: "req",
            value: function req() {
                var that = this;
                $.ajax({
                    url: "http://localhost:81/common/reg",
                    data: {
                        user: that.telV,
                        pass: that.pwdV
                    },
                    type: "post",
                    success: function success(res, status) {
                        // console.log(JSON.parse(res))
                        that.res = JSON.parse(res);
                        that.load();
                    },
                    error: function error(res, status) {
                        console.log(status);
                        // console.loag(status);
                    }
                });
            }
        }, {
            key: "load",
            value: function load() {
                if (this.res.msg == "注册成功") {
                    location.href = "http://localhost/login/login.html";
                }
            }
        }]);

        return Reg;
    }();

    return Reg;
});