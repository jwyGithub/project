"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function () {
    var UserLogin = function () {
        function UserLogin() {
            _classCallCheck(this, UserLogin);

            this.tel = document.getElementById("tel");
            this.pwd = document.getElementById("pwd");
            this.btn = document.getElementById("login");
            this.reg = document.getElementById("reg");
            this.back = document.getElementById("back");
            this.tip = document.querySelector(".tip");
            this.forget = document.querySelector(".forget");

            this.addEvent();
        }

        _createClass(UserLogin, [{
            key: "addEvent",
            value: function addEvent() {
                var that = this;
                this.btn.onclick = function () {
                    that.telV = that.tel.value;
                    that.pwdV = that.pwd.value;
                    if (that.telV == "" || that.pwdV == "") {
                        that.tip.innerHTML = "提示：请输入账号或密码";
                    } else {
                        that.login();
                    }
                };
                this.back.onclick = function () {
                    location.href = "http://localhost/pro/index/index.html";
                };
                this.reg.onclick = function () {
                    location.href = "http://localhost/pro/reg/reg.html";
                };
                this.forget.onclick = function () {
                    that.tip.innerHTML = "提示：此功能暂未开放";
                };
            }
        }, {
            key: "login",
            value: function login() {
                var that = this;
                $.ajax({
                    url: "http://localhost/common/login",
                    data: {
                        user: that.telV,
                        pwd: that.pwdV
                    },
                    type: "post",
                    success: function success(res, status) {
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
                if (this.res.code == 400 && this.res.msg == "账号不存在") {
                    this.tip.innerHTML = "提示：账号不存在";
                } else if (this.res.code == 400 && this.res.msg == "密码错误") {
                    this.tip.innerHTML = "提示：密码错误";
                } else if (this.res.code == 200 && this.res.msg == "登录成功") {
                    setCookie("user", this.telV, {
                        path: "/"
                    });
                    location.href = "http://localhost/pro/index/index.html";
                }
            }
        }]);

        return UserLogin;
    }();

    function setCookie(key, val, options) {
        options = options || {};
        var p = options.path ? ";path=" + options.path : "";
        var e = "";
        if (options.expires) {
            var d = new Date();
            d.setDate(d.getDate() + options.expires);
            e = ";expires=" + d;
        }
        document.cookie = key + "=" + val + e + p;
    }

    return UserLogin;
});