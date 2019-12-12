define(() => {
    class load {
        constructor() {
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
        init() {
            var that = this;
            this.login.onclick = () => {
                location.href = "http://localhost/login/login.html";
            };
            this.reg.onclick = () => {
                location.href = "http://localhost/reg/reg.html";
            };
            this.search.onclick = () => {
                that.keywordV = this.keyword.value;
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
                location.href = "http://localhost/login/login.html";
            };

            for (let i = 0; i < this.list.length; i++) {
                $(this.list[i]).hover(function () {
                    $(that.list[i]).children(".items").show();
                }, function () {
                    $(that.list[i]).children(".items").hide();
                });
            }

            // 点击热门搜索关键词
            var a = $(".seaKeyword").find("dd").find("a");
            for (let i = 0; i < a.length; i++) {
                a[i].onclick = function () {
                    setCookie("keyword", a[i].innerHTML, {
                        path: "/"
                    });
                    location.href = "http://localhost/list/list.html";
                };
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
        scroll() {
            var that = this;
            onscroll = function () {
                that.lazyLoad();
            };
        }
        lazyLoad() {
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

        userInfo() {
            this.user = getCookie("user");
            this.wel.innerHTML = `杂志网欢迎${this.user}`;
            if (!this.user) {
                $(".top2").hide();
                $(".top").show();
            } else {
                $(".top2").show();
                $(".top").hide();
            }
        }
        load() {
            var that = this;
            // http://localhost:81/common/login
            $.ajax({
                url: "http://localhost:81/common/index",
                success: function (res) {
                    // console.log(typeof res)
                    that.res = JSON.parse(res);
                    // console.log(that.res)
                    that.display();
                }
            });
        }
        setCookie() {
            setCookie("keyword", this.keywordV, {
                path: "/"
            });

            location.href = "http://localhost/list/list.html";
        }
        display() {
            // 小banner渲染
            this.con.innerHTML = `<dl>
            <dt><img src="${this.res.contribute[0].imgurl}" alt=""></dt>
            <dd><img src="${this.res.contribute[1].imgurl}" alt=""></dd>
            <dd><img src="${this.res.contribute[2].imgurl}" alt=""></dd>
            <dd><img src="${this.res.contribute[3].imgurl}" alt=""></dd>
            <dd><img src="${this.res.contribute[4].imgurl}" alt=""></dd>
            </dl>`;

            // 热门推荐渲染
            var str = "";
            for (var i = 0; i < this.res.hot.length; i++) {
                str += `<li>
                <a href="#">
                <img src="${this.res.hot[i].imgurl}" alt="">
                <p>${this.res.hot[i].name}</p>
                </a>
                <span>商城价：￥${this.res.hot[i].price}</span>
                </li>`;
            }
            this.hot.innerHTML = str;

            // 1f渲染
            var str = "";
            for (var i = 0; i < this.res.oneFr.length; i++) {
                str += `<a href="#">
                    <img src="${this.res.oneFr[i].imgurl}" alt="">
                    <p>${this.res.oneFr[i].name}</p>
                    <span>￥${this.res.oneFr[i].price}</span>
                    </a>`;
            }
            this.onefr.innerHTML = str;

            // 2f渲染
            var str = "";
            for (var i = 0; i < this.res.twoFr.length; i++) {
                str += `<a href="#">
                <img src="${this.res.twoFr[i].imgurl}" alt="">
                <p>${this.res.twoFr[i].name}</p>
                <span>￥${this.res.twoFr[i].price}</span>
                </a>`;
            }
            this.twofr.innerHTML = str;

            // 3f渲染
            var str = "";
            for (var i = 0; i < this.res.threeFr.length; i++) {
                str += `<a href="#">
                    <img src="${this.res.threeFr[i].imgurl}" alt="">
                    <p>${this.res.threeFr[i].name}</p>
                    <span>￥${this.res.threeFr[i].price}</span>
                    </a>`;
            }
            this.threefr.innerHTML = str;

            // 4f渲染
            var str = "";
            for (var i = 0; i < this.res.fourFr.length; i++) {
                str += `<a href="#">
                    <img src="${this.res.fourFr[i].imgurl}" alt="">
                    <p>${this.res.fourFr[i].name}</p>
                    <span>￥${this.res.fourFr[i].price}</span>
                    </a>`;
            }
            // console.log(str)
            this.fourfr.innerHTML = str;
        }
    }

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
        setCookie(key, null, {
            expires: -1,
            path: options.path
        });
    }

    return load;
});