define(() => {
    class Car {
        constructor() {
            this.goods = document.querySelector(".goods")
            this.init();
        }
        init() {
            this.items = getCookie("details", { path: '/' })
            // console.log(this.items)
            this.load();
            this.addEvent();
        }
        load() {
            this.lists = JSON.parse(this.items)
            var str = "";
            for (var i = 0; i < this.lists.length; i++) {
                str += `
                <ul>
                    <li><input type="checkbox" name="" id=""></li>
                    <li>
                        <img src="${this.lists[i].img}" alt="">
                        <a href="#">${this.lists[i].title}</a>
                    </li>
                    <li>${this.lists[i].pubYear.slice(0, this.lists[i].pubYear.length - 4)}</li>
                    <li>
                        <select name="saletime" cid="129360">
                            <option value="0" selected="">
                                2020年03月</option>
                            <option value="1">
                                2020年4月</option>
                            <option value="2">
                                2020年5月</option>
                        </select>
                    </li>
                    <li class="unitPrice">${this.lists[i].price}</li>
                    <li class="con">
                        <a href="#" id="reduce">-</a>
                        <input id="num" type="text" value="${this.lists[i].number}">
                        <a href="#" id="add">+</a>
                    </li>
                    <li class="money">￥${this.lists[i].number * this.lists[i].price.slice(1, this.lists[i].price.length)}</li>
                    <li>删除</li>
                </ul>
                `
            }
            // console.log(str)
            this.goods.innerHTML = str;
        }
        addEvent() {

            this.goods.addEventListener("click", function (eve) {
                var e = eve || window.event;
                e.preventDefault();
                var target = e.target || e.srcElement;
                if (target.getAttribute("id") == "reduce") {
                    if (target.nextElementSibling.value == 1) {
                        target.nextElementSibling.value = 1;
                    } else {
                        target.nextElementSibling.value--;
                        target.parentElement.nextElementSibling.innerHTML = "￥" + target.nextElementSibling.value * $(".unitPrice").html().slice(1, $(".unitPrice").html().length)
                    }
                } else if (target.getAttribute("id") == "add") {
                    target.previousElementSibling.value++;
                    target.parentElement.nextElementSibling.innerHTML = "￥" + target.previousElementSibling.value * $(".unitPrice").html().slice(1, $(".unitPrice").html().length)
                }
            })

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


    //删除cookie
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

    return Car;

});
