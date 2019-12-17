"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function () {
    var Car = function () {
        function Car() {
            _classCallCheck(this, Car);

            // 添加内容的区域
            this.goods = document.querySelector(".goods");
            // 商品总价
            this.allPrice = document.querySelector(".allPrice");
            // 初始化页面
            this.init();
            // 添加监听事件
            this.addEvent();
        }

        _createClass(Car, [{
            key: "init",
            value: function init() {
                // 获取商品详情--->cookie
                this.items = getCookie("details", { path: '/' });
                // 渲染数据
                this.display();
            }
        }, {
            key: "addEvent",
            value: function addEvent() {
                var that = this;
                // 点击下一步：提示功能未开放
                $("#next").click(function (eve) {
                    $(".msg").css("display", "block");
                });
                // 列表区域监听点击事件
                this.goods.addEventListener("click", function (eve) {
                    var e = eve || window.event;
                    var target = e.target || e.srcElement;
                    // 减少数量事件
                    if (target.getAttribute("id") == "reduce") {
                        if (target.nextElementSibling.value == 1) {
                            target.nextElementSibling.value = 1;
                        } else {
                            target.nextElementSibling.value--;
                            // 同步计算小计的值
                            target.parentElement.nextElementSibling.innerHTML = target.nextElementSibling.value * parseInt($(".unitPrice").html()) + "元";
                            // 并更新总计的值
                            that.aPrice();
                        }
                        // 增加数量事件
                    } else if (target.getAttribute("id") == "add") {
                        target.previousElementSibling.value++;
                        // 同步计算小计的值
                        target.parentElement.nextElementSibling.innerHTML = target.previousElementSibling.value * parseInt($(".unitPrice").html()) + "元";
                        // 并更新总计的值
                        that.aPrice();
                        // 删除商品事件
                    } else if (target.getAttribute("class") == "del") {
                        // 先把当前商品从页面删除
                        target.parentElement.remove();
                        // 并更新总计的值
                        that.aPrice();
                        // 循环遍历当前cookie中的哪个商品符合被删除的商品
                        for (var i = 0; i < that.lists.length; i++) {
                            if (that.lists[i].id == target.parentElement.getAttribute("id")) {
                                // 如果符合，那么则从cookie中删除
                                that.lists.splice(i, 1);
                                break;
                            }
                        }
                        // 重新设置cookie
                        setCookie("details", JSON.stringify(that.lists), {
                            path: "/"
                        });
                    }
                });
            }
        }, {
            key: "display",
            value: function display() {
                this.lists = JSON.parse(this.items);
                var str = "";
                for (var i = 0; i < this.lists.length; i++) {
                    str += "<ul id =\"" + this.lists[i].id + "\">\n                    <li><input type=\"checkbox\" checked></li>\n                    <li>\n                        <img src=\"" + this.lists[i].img + "\" alt=\"\">\n                        <a href=\"#\">" + this.lists[i].title + "</a>\n                    </li>\n                    <li>" + this.lists[i].pubYear.slice(0, this.lists[i].pubYear.length - 4) + "</li>\n                    <li>\n                        <select name=\"saletime\" cid=\"129360\">\n                            <option value=\"0\" selected=\"\">\n                                2020年03月</option>\n                            <option value=\"1\">\n                                2020年4月</option>\n                            <option value=\"2\">\n                                2020年5月</option>\n                        </select>\n                    </li>\n                    <li class=\"unitPrice\">" + this.lists[i].price + "</li>\n                    <li class=\"con\">\n                        <a href=\"#\" id=\"reduce\">-</a>\n                        <input id=\"num\" type=\"text\" value=\"" + this.lists[i].number + "\">\n                        <a href=\"#\" id=\"add\">+</a>\n                    </li>\n                    <li class=\"money\">" + this.lists[i].number * parseInt(this.lists[i].price) + "元</li>\n                    <li class=\"del\">删除</li>\n                </ul>";
                }
                this.goods.innerHTML = str;
                // 当所有商品渲染完后，计算总价
                this.aPrice();
            }
        }, {
            key: "aPrice",
            value: function aPrice() {
                this.all = document.querySelectorAll(".money");
                var a = 0;
                for (var i = 0; i < this.all.length; i++) {
                    a = a + parseInt(this.all[i].innerHTML);
                }
                this.allPrice.innerHTML = a + "元";
            }
        }]);

        return Car;
    }();

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

    return Car;
});