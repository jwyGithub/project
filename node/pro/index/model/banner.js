"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function () {
    var Banner = function () {
        function Banner(options) {
            _classCallCheck(this, Banner);

            this.items = options.banner || {};
            this.delaytime = options.delaytime || 5000;
            this.movetime = options.movetime || 2000;
            this.left = document.getElementById("left");
            this.right = document.getElementById("right");
            // 初始显示哪张图片
            this.index = 0;
            this.iPrev = this.items.length - 1;
            this.init();
        }

        _createClass(Banner, [{
            key: "init",
            value: function init() {
                var that = this;
                this.items.css({
                    position: "absolute",
                    left: this.items.eq(0).width(),
                    top: 0
                }).eq(this.index).css({
                    left: 0
                });
                this.left.onclick = function () {
                    console.log(111);
                    that.btnL();
                };
                this.right.onclick = function () {
                    that.btnR();
                };
                this.autoplay();
            }
        }, {
            key: "btnL",
            value: function btnL() {
                // 计算索引
                // 上一个
                if (this.index == 0) {
                    this.index = this.items.length - 1;
                    this.iPrev = 0;
                } else {
                    this.index--;
                    this.iPrev = this.index + 1;
                }
                //开始移动
                this.move(1);
            }
        }, {
            key: "btnR",
            value: function btnR() {
                //下一个
                if (this.index == this.items.length - 1) {
                    this.index = 0;
                    this.iPrev = this.items.length - 1;
                } else {
                    this.index++;
                    this.iPrev = this.index - 1;
                }
                this.move(-1);
            }
        }, {
            key: "move",
            value: function move(type) {
                this.items.eq(this.iPrev).css({
                    left: 0
                }).stop().animate({
                    left: this.items.eq(0).width() * type
                }, this.movetime).end().eq(this.index).css({
                    left: -this.items.eq(0).width() * type
                }).stop().animate({
                    left: 0
                }, this.movetime);
            }
            //自动播放

        }, {
            key: "autoplay",
            value: function autoplay() {
                var that = this;
                this.t = setInterval(function () {
                    that.btnR();
                }, that.delaytime);
            }
        }]);

        return Banner;
    }();

    return Banner;
});