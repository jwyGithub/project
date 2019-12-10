define(() => {
    class Info {
        constructor() {
            this.goods = document.querySelector(".goodslist");
            this.keyword = document.getElementById("keyword");
            this.search = document.getElementById("search");
            //初始化
            this.init();
        }
        init() {
            var that = this;
            // 获取从首页设置的keyword
            this.key = getCookie("keyword");
            // 点击搜索事件
            this.search.onclick = function () {
                that.key = that.keyword.value;
                that.load();
            }
            // 点击热门搜索关键词
            var a = $(".seaKeyword").find("dd").find("a");
            for(let i = 0;i<a.length;i++){
                a[i].onclick = function(){
                    that.key = a[i].innerHTML;
                    that.keyword.value = a[i].innerHTML;
                    that.load();
                }
            }
            // 从页面跳转后就加载一次
            if(this.key == ""){
                return;
            }
            that.load();
        }
        load() {
            // 请求数据
            var that = this;
            if(that.key == ""){
                return;
            }
            $.ajax({
                url: "http://localhost:81/common/search",
                data: {
                    key: that.key
                },
                success: function (res) {
                    that.res = JSON.parse(res);
                    that.display();
                },
                error: function (res) {
                    that.res = res;
                }
            })
        }
        //渲染界面
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
            // console.log(str)
            // 增加数据为空判断
            if (str == "") {
                this.goods.innerHTML = `
                <span>没有找到符合条件的商品</span>`
            } else {
                this.goods.innerHTML = str;
            }
            // 清除cookie
            removeCookie("keyword", { path: "/" })
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
    // 删除cookie
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