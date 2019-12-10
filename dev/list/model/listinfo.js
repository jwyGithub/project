define(() => {
    class Info {
        constructor() {
            this.goods = document.querySelector(".goodslist");
            this.keyword = document.getElementById("keyword")
            this.search = document.getElementById("search");
            this.init();
        }
        init() {
            var that = this;
            this.key = getCookie("keyword");

            this.search.onclick = function () {
                that.key = that.keyword.value;
                that.load();
            }
            this.load();

        }
        load() {
            var that = this;
            // http://localhost:81/common/login
            $.ajax({
                url: "http://localhost:81/common/search",
                data: {
                    key: that.key
                },
                success: function (res) {
                    that.res = JSON.parse(res);
                    that.display();
                }
            })
        }
        display() {
            var str = "";
            for (var i = 0; i < this.res.length; i++) {
                str += `<li>
                            <img src="${this.res[i].imgurl}" >
                            <div class="items">
                                <img src="${this.res[i].imgurl}" alt="">
                            </div>
                            <p class="overmore">${this.res[i].title}</p>
                            <div class="price">${this.res[i].price}</div>
                        </li>`
            }
            console.log(str)
            if (str == "") {
                this.goods.innerHTML = `
                <span>没有找到符合条件的商品</span>`
            } else {
                this.goods.innerHTML = str;
            }

            // 清除cookie
            removeCookie("keyword",{path:"/"})
        }
    }

    function getCookie(key) {
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].split("=")[0] == key) {
                return arr[i].split("=")[1];
            }
        }
        return "";
    }

    function removeCookie(key, options) {
        options = options || {};
        setCookie(key, null, {
            expires: -1,
            path: options.path
        })
    }

    //设置cookie
    function setCookie(key, val, options) {
        options = options || {};
        var p = options.path ? ";path=" + options.path : "";
        var e = "";
        if (options.expires) {
            var d = new Date();
            d.setDate(d.getDate() + options.expires)
            e = ";expires=" + d;
        }
        document.cookie = key + "=" + val + e + p;
    }

    return Info;



})