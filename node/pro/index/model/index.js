"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function () {
    var load = function () {
        function load() {
            _classCallCheck(this, load);

            this.login = document.getElementById("login");
            this.reg = document.getElementById("reg");
            this.con = document.querySelector(".contribute");
            this.hot = document.querySelector(".wrapper-a");
            this.onefr = document.querySelector(".oneFright");
            this.twofr = document.querySelector(".twoFright");
            this.threefr = document.querySelector(".threeFright");
            this.fourfr = document.querySelector(".fourFright");
            this.search = document.getElementById("search");
            this.keyword = document.getElementById("keyword");
            this.list = document.querySelectorAll(".list");
            var aimg = document.querySelectorAll("img[lazySrc]");
            this.aA = document.querySelectorAll("a");
            this.clientH = document.documentElement.clientHeight;
            this.logout = document.getElementById("logout");
            this.wel = document.querySelector(".wel");
            this.arr = Array.from(aimg);
            this.init();
        }

        _createClass(load, [{
            key: "init",
            value: function init() {
                var _this = this;

                var that = this;
                this.login.onclick = function () {
                    location.href = "http://localhost/pro/login/login.html";
                };
                this.reg.onclick = function () {
                    location.href = "http://localhost/pro/reg/reg.html";
                };
                this.search.onclick = function () {
                    that.keywordV = _this.keyword.value;
                    that.setCookie();
                };

                this.logout.onclick = function () {
                    removeCookie("user", {
                        path: "/"
                    });
                    removeCookie("details", {
                        path: "/"
                    });
                    removeCookie("goodsId", {
                        path: "/"
                    });
                    removeCookie("keyword", {
                        path: "/"
                    });
                    location.href = "http://localhost/pro/login/login.html";
                };

                var _loop = function _loop(i) {
                    $(_this.list[i]).hover(function () {
                        $(that.list[i]).children(".items").show();
                    }, function () {
                        $(that.list[i]).children(".items").hide();
                    });
                };

                for (var i = 0; i < this.list.length; i++) {
                    _loop(i);
                }

                // 点击热门搜索关键词
                var a = $(".seaKeyword").find("dd").find("a");

                var _loop2 = function _loop2(_i) {
                    a[_i].onclick = function () {
                        _setCookie("keyword", a[_i].innerHTML, {
                            path: "/"
                        });
                        location.href = "http://localhost/pro/list/list.html";
                    };
                };

                for (var _i = 0; _i < a.length; _i++) {
                    _loop2(_i);
                }

                $(".linkfloor li").click(function () {
                    var i = $(this).index();
                    var t = $(".floorstyle").eq(i).offset().top;
                    $("html").animate({
                        scrollTop: t
                    });
                });

                this.userInfo();
                this.lazyLoad();
                this.load();
                this.scroll();
            }
        }, {
            key: "scroll",
            value: function scroll() {
                var that = this;
                onscroll = function onscroll() {
                    that.lazyLoad();
                };
            }
        }, {
            key: "lazyLoad",
            value: function lazyLoad() {
                var scrollT = document.documentElement.scrollTop;
                for (var i = 0; i < this.arr.length; i++) {
                    if (this.arr[i].offsetTop - this.clientH < scrollT) {
                        this.arr[i].src = this.arr[i].getAttribute("lazySrc");
                        // console.log(this.arr[i].src)
                        this.arr.splice(i, 1);
                        i--;
                    }
                }
            }
        }, {
            key: "userInfo",
            value: function userInfo() {
                this.user = getCookie("user");
                this.wel.innerHTML = "杂志网欢迎" + this.user;
                if (!this.user) {
                    $(".top2").hide();
                    $(".top").show();
                } else {
                    $(".top2").show();
                    $(".top").hide();
                }
            }
        }, {
            key: "load",
            value: function load() {
                var that = this;
                // http://localhost:81/common/login
                $.ajax({
                    url: "http://localhost/common/index",
                    success: function success(res) {
                        // console.log(typeof res)
                        that.res = JSON.parse(res);
                        // console.log(that.res)
                        that.display();
                    }
                });
            }
        }, {
            key: "setCookie",
            value: function setCookie() {
                _setCookie("keyword", this.keywordV, {
                    path: "/"
                });

                location.href = "http://localhost/pro/list/list.html";
            }
        }, {
            key: "display",
            value: function display() {
                // 小banner渲染
                this.con.innerHTML = "<dl>\n            <dt><img src=\"" + this.res.contribute[0].imgurl + "\" alt=\"\"></dt>\n            <dd><img src=\"" + this.res.contribute[1].imgurl + "\" alt=\"\"></dd>\n            <dd><img src=\"" + this.res.contribute[2].imgurl + "\" alt=\"\"></dd>\n            <dd><img src=\"" + this.res.contribute[3].imgurl + "\" alt=\"\"></dd>\n            <dd><img src=\"" + this.res.contribute[4].imgurl + "\" alt=\"\"></dd>\n            </dl>";

                // 热门推荐渲染
                var str = "";
                for (var i = 0; i < this.res.hot.length; i++) {
                    str += "<li>\n                <a href=\"#\">\n                <img src=\"" + this.res.hot[i].imgurl + "\" alt=\"\">\n                <p>" + this.res.hot[i].name + "</p>\n                </a>\n                <span>商城价：￥" + this.res.hot[i].price + "</span>\n                </li>";
                }
                this.hot.innerHTML = str;

                // 1f渲染
                var str = "";
                for (var i = 0; i < this.res.oneFr.length; i++) {
                    str += "<a href=\"#\">\n                    <img src=\"" + this.res.oneFr[i].imgurl + "\" alt=\"\">\n                    <p>" + this.res.oneFr[i].name + "</p>\n                    <span>￥" + this.res.oneFr[i].price + "</span>\n                    </a>";
                }
                this.onefr.innerHTML = str;

                // 2f渲染
                var str = "";
                for (var i = 0; i < this.res.twoFr.length; i++) {
                    str += "<a href=\"#\">\n                <img src=\"" + this.res.twoFr[i].imgurl + "\" alt=\"\">\n                <p>" + this.res.twoFr[i].name + "</p>\n                <span>￥" + this.res.twoFr[i].price + "</span>\n                </a>";
                }
                this.twofr.innerHTML = str;

                // 3f渲染
                var str = "";
                for (var i = 0; i < this.res.threeFr.length; i++) {
                    str += "<a href=\"#\">\n                    <img src=\"" + this.res.threeFr[i].imgurl + "\" alt=\"\">\n                    <p>" + this.res.threeFr[i].name + "</p>\n                    <span>￥" + this.res.threeFr[i].price + "</span>\n                    </a>";
                }
                this.threefr.innerHTML = str;

                // 4f渲染
                var str = "";
                for (var i = 0; i < this.res.fourFr.length; i++) {
                    str += "<a href=\"#\">\n                    <img src=\"" + this.res.fourFr[i].imgurl + "\" alt=\"\">\n                    <p>" + this.res.fourFr[i].name + "</p>\n                    <span>￥" + this.res.fourFr[i].price + "</span>\n                    </a>";
                }
                // console.log(str)
                this.fourfr.innerHTML = str;
            }
        }]);

        return load;
    }();

    function _setCookie(key, val, options) {
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

    //获取cookie
    function getCookie(key) {
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].split("=")[0] == key) {
                return arr[i].split("=")[1];
            }
        }
        return "";
    }

    //删除cookie
    function removeCookie(key, options) {
        options = options || {};
        _setCookie(key, null, {
            expires: -1,
            path: options.path
        });
    }

    return load;
});