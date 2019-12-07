"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function () {
    var Login = function () {
        function Login() {
            _classCallCheck(this, Login);

            this.login = document.getElementById("login");
            // console.log(this.login)
            this.reg = document.getElementById("reg");
            this.init();
        }

        _createClass(Login, [{
            key: "init",
            value: function init() {
                this.login.onclick = function () {
                    location.href = "http://localhost/Production/login/login.html";
                };
                this.load();
            }
        }, {
            key: "load",
            value: function load() {
                var that = this;
                // http://localhost:81/common/login
                $.ajax({
                    url: "http://localhost:81/common/login",
                    success: function success(res) {
                        that.res = JSON.parse(res);
                    }
                });
            }
        }]);

        return Login;
    }();

    return Login;
});