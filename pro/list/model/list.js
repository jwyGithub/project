"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function () {
    var Info = function () {
        function Info() {
            _classCallCheck(this, Info);

            this.goods = document.querySelector(".goodslist");
            this.keyword = document.getElementById("keyword");
            this.search = document.getElementById("search");
            this.aLi = document.querySelector(".goodslist");
            //初始化    
            this.init();
            this.addEvent();
        }

        _createClass(Info, [{
            key: "init",
            value: function init() {
                var that = this;
                // 获取从首页设置的keyword
                this.key = getCookie("keyword");
                // 点击搜索事件
                this.search.onclick = function () {
                    that.key = that.keyword.value;
                    that.load();
                };
                // 点击热门搜索关键词
                var a = $(".seaKeyword").find("dd").find("a");

                var _loop = function _loop(i) {
                    a[i].onclick = function () {
                        that.key = a[i].innerHTML;
                        that.keyword.value = a[i].innerHTML;
                        that.load();
                    };
                };

                for (var i = 0; i < a.length; i++) {
                    _loop(i);
                }
                // 从页面跳转后就加载一次
                if (this.key == "") {
                    return;
                }
                that.load();
            }
        }, {
            key: "addEvent",
            value: function addEvent() {
                this.aLi.addEventListener("click", function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    // if(target.tagName == "LI"){
                    //     var t = target;
                    // }
                    if (target.className == "overmore") {

                        setCookie("goodsId", target.parentElement.id, {
                            path: "/"
                        });
                        location.href = "http://localhost/info/info.html";
                    }
                });
            }
        }, {
            key: "load",
            value: function load() {
                // 请求数据
                var that = this;
                if (that.key == "") {
                    return;
                }
                $.ajax({
                    url: "http://localhost:81/common/search",
                    data: {
                        key: that.key
                    },
                    success: function success(res) {
                        that.res = JSON.parse(res);
                        that.display();
                    },
                    error: function error(res) {
                        that.res = res;
                    }
                });
            }
            //渲染界面

        }, {
            key: "display",
            value: function display() {
                var str = "";
                for (var i = 0; i < this.res.length; i++) {
                    str += "<li id=\"" + this.res[i].goodsId + "\">\n                            <img src=\"" + this.res[i].imgurl + "\" >\n                            <div class=\"items\">\n                                <img src=\"" + this.res[i].imgurl + "\" alt=\"\">\n                            </div>\n                            <p class=\"overmore\">" + this.res[i].title + "</p>\n                            <div class=\"price\">" + this.res[i].price + "</div>\n                        </li>";
                }
                // console.log(str)
                // 增加数据为空判断
                if (str == "") {
                    this.goods.innerHTML = "\n                <span>没有找到符合条件的商品</span>";
                } else {
                    this.goods.innerHTML = str;
                }
                // 清除cookie
                // removeCookie("keyword", { path: "/" })
            }
        }]);

        return Info;
    }();

    function getCookie(key) {
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].split("=")[0] == key) {
                return arr[i].split("=")[1];
            }
        }
        return "";
    }
    // 删除cookie
    function removeCookie(key, options) {
        options = options || {};
        setCookie(key, null, {
            expires: -1,
            path: options.path
        });
    }
    //设置cookie
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

    return Info;
});