define(() => {
    class info {
        constructor() {
            this.span = document.getElementById("magnifier");
            this.big = document.querySelector(".big");
            this.small = document.querySelector(".small");
            this.smallImg = document.querySelector(".small img");
            this.bigImg = document.querySelector(".big img");
            //新增功能
            this.liImg = document.querySelectorAll(".items li a img");
            this.addEvent();
        }
        addEvent() {
            var that = this;
            //鼠标进入小图片显示span和计算span比例，显示大图片
            this.small.onmouseover = function (eve) {
                // 显示
                that.over();
            };
            this.small.onmousemove = function (eve) {
                var e = eve || window.event;
                // 移动
                that.move(e);
            };
            this.small.onmouseout = function () {
                // 隐藏
                that.out();
            };
            // 切换要显示的图片
            this.setImg();
        }
        over(e) {
            // 设置span和大图片为block
            this.span.style.display = "block";
            this.big.style.display = "block";
            // 根据比例计算span的宽高
            // 大框的宽度 / 大图片的宽度 * 小框的宽度
            this.sSpanW = this.big.offsetWidth / this.bigImg.offsetWidth * this.small.offsetWidth;
            this.sSpanH = this.big.offsetHeight / this.bigImg.offsetHeight * this.small.offsetHeight;
            this.span.style.width = this.sSpanW + "px";
            this.span.style.height = this.sSpanH + "px";
            // 提前存储值
            this.bigW = this.big.offsetWidth;
            this.bigH = this.big.offsetHeight;
            this.smallW = this.small.offsetWidth;
            this.smallH = this.small.offsetHeight;
            this.bigImgW = this.bigImg.offsetWidth;
            this.bigImgH = this.bigImg.offsetHeight;
        }
        move(e) {
            // span的位置计算 
            var spanT = e.clientY - this.span.offsetHeight - this.span.offsetHeight - this.span.offsetHeight / 2;
            var spanL = e.clientX - this.span.offsetWidth - this.span.offsetWidth / 2;
            // 边界限定
            // 左边限定
            if (spanL < 0) {
                spanL = 0;
            }
            // 上边限定
            if (spanT < 0) {
                spanT = 0;
            };
            // 右边限定
            if (spanL > this.small.offsetWidth - this.span.offsetWidth) {
                spanL = this.small.offsetWidth - this.sSpanW;
            }
            // 下边限定
            if (spanT > this.small.offsetHeight - this.sSpanH) {
                spanT = this.small.offsetHeight - this.sSpanH;
            }
            // 设置span的位置
            // console.log("---e.clientX-----" + e.clientX,"---e.offsetLeft-----"  + this.small.offsetLeft ,"---e.offsetWidth-----" + this.span.offsetWidth/2)
            this.span.style.left = spanL + "px";
            this.span.style.top = spanT + "px";
            // 设置大图移动
            // span的left / (小框的宽 - span的宽) * (大框宽 - 大图的宽)
            this.bigImg.style.left = spanL / (this.smallW - this.sSpanW) * (this.bigW - this.bigImgW) + "px";
            this.bigImg.style.top = spanT / (this.smallH - this.sSpanH) * (this.bigH - this.bigImgH) + "px";
        }
        // 隐藏
        out() {
            this.span.style.display = "none";
            this.big.style.display = "none";
        }
        // 切换图片--新增
        setImg(i) {
            var that = this;
            for (let i = 0; i < this.liImg.length; i++) {
                this.liImg[i].onclick = function () {
                    // 清空两个图片的src
                    that.bigImg.src = "";
                    that.smallImg.src = "";
                    // 在把当前点击的src给他们
                    that.bigImg.src = that.liImg[i].src;
                    that.smallImg.src = that.liImg[i].src;
                };
            }
        }
    }

    // 获取商品详情
    class Car {
        constructor() {
            // 先从cookie获取商品id
            this.id = getCookie("goodsId", { path: '/' });
            // 发起请求
            this.load();
        }
        load() {
            var that = this;
            $.ajax({
                url: "http://localhost:81/common/details",
                data: {
                    "goodsId": that.id
                },
                success: function (res) {
                    that.res = JSON.parse(res);
                    // 开始渲染界面
                    that.display();
                }
            });
        }
        display() {
            // 详情数据渲染
            let str = "";
            for (var i = 0; i < this.res.imgs.length; i++) {
                str += `<li><a href="#"><img src="${this.res.imgs[i]}" alt=""></a></li>`;
            }
            // 默认显示第一张图片
            $(".box").html(`<div class="small">
                                <img src="${this.res.imgs[0]}">
                                <span id="magnifier"></span>
                            </div>
                            <div class="big">
                                <img src="${this.res.imgs[0]}" alt="">
                            </div>
                            <ul class="items clearfix">
                                ${str}
                            </ul>`);
            // 价格
            $(".price").html(this.res.price + "元");
            // 商品详情
            $(".overmore").html(this.res.info);
            // 给商品的标题添加id,方便传cookie
            $(".right").find("h3").html(this.res.title).attr("id", this.res.id);
            // 渲染完成后添加监听事件--暂时为同步
            this.addEvent();
        }
        addEvent() {
            var that = this;
            // 起刊日期class
            var date = $(".date").find("dd");
            date.click(function () {
                $(this).addClass('checked').siblings().removeClass("checked");
            });
            // 订阅年数
            var date = $(".year").find("dd");
            date.click(function () {
                $(this).addClass('checked').siblings().removeClass("checked");
            });
            // 添加购物车
            $("#addCar").click(eve => {
                var e = eve || window.event;
                e.preventDefault();
                let user = getCookie("user");
                // 如果用户没登录则提示未登录，并且不允许添加购物车
                if (!user) {
                    $(".war").css("display", "block");
                    that.back();
                } else {
                    // 获取选择的值
                    var d = document.querySelectorAll(".date dd");
                    // 起刊日期的值
                    for (let i = 0; i < d.length; i++) {
                        if (d[i].className == "checked") {
                            var date = d[i].innerHTML;
                        }
                    }
                    // 订阅年数的值
                    var y = document.querySelectorAll(".year dd");
                    for (let i = 0; i < y.length; i++) {
                        if (y[i].className == "checked") {
                            var year = y[i].innerHTML;
                        }
                    }
                    // 获取cookie，因为要判断是新商品还是老商品
                    this.goodItems = getCookie("details") ? JSON.parse(getCookie("details")) : [];
                    // 判断是否第一次加入购物车
                    if (this.goodItems.length < 1) {
                        var goodsId = $(".right").find("h3").attr("id");
                        this.goodItems.push({
                            id: goodsId,
                            img: $(".small").find("img").attr("src"),
                            title: $(".right").find("h3").html(),
                            pubDate: date,
                            pubYear: year,
                            price: $(".price").text(),
                            number: $("#num").val()
                        });
                        // 不是就走这里
                    } else {
                        var onoff = true;
                        // 老商品，数量相加
                        for (var i = 0; i < this.goodItems.length; i++) {
                            if (this.goodItems[i].id === goodsId) {
                                // 这里有个bug，时间不够，暂时还未解决
                                this.goodItems[i].number++;
                                onoff = false;
                            }
                        }
                        var i = 0;
                        var onoff = this.goodItems.some((val, idx) => {
                            i = idx;
                            return val.id === this.id;
                        });
                        // 新商品, 增加
                        if (!onoff) {
                            var goodsId = $(".right").find("h3").attr("id");
                            this.goodItems.push({
                                id: goodsId,
                                img: $(".small").find("img").attr("src"),
                                title: $(".right").find("h3").html(),
                                pubDate: date,
                                pubYear: year,
                                price: $(".price").text(),
                                number: $("#num").val()
                            });
                        } else {
                            this.goodItems[i].number++;
                        }
                    }
                    setCookie("details", JSON.stringify(this.goodItems), {
                        path: "/"
                    });
                    location.href = "http://localhost/car/car.html";
                }
            });
        }
        back() {
            $("#login").click(() => {
                location.href = "http://localhost/login/login.html";
            });
            $("#reg").click(() => {
                $(".war").css("display", "none");
            });
        }

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

    let option = {
        banner: info,
        detail: Car
    };

    return option;
});