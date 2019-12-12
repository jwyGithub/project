define(() => {
    class Car {
        constructor() {
            this.goods = document.querySelector(".goods");
            this.allPrice = document.querySelector(".allPrice");
            this.init();
        }
        init() {
            this.items = getCookie("details", { path: '/' })
            $("#next").click((eve)=>{
                $(".msg").css("display","block")
            })
            this.load();
            this.addEvent();
        }
        load() {
            this.lists = JSON.parse(this.items)
            var str = "";
            for (var i = 0; i < this.lists.length; i++) {
                str += `
                <ul id ="${this.lists[i].id}">
                    <li><input type="checkbox" checked></li>
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
                    <li class="money">${this.lists[i].number * this.lists[i].price.slice(1, this.lists[i].price.length)}</li>
                    <li class="del">删除</li>
                </ul>
                `
            }
            // console.log(str)
            this.goods.innerHTML = str;
            this.aPrice();
        }
        addEvent() {
            var that = this;
            this.goods.addEventListener("click", function (eve) {
                var e = eve || window.event;
                // e.preventDefault();
                var target = e.target || e.srcElement;
                if (target.getAttribute("id") == "reduce") {
                    if (target.nextElementSibling.value == 1) {
                        target.nextElementSibling.value = 1;
                    } else {
                        target.nextElementSibling.value--;
                        target.parentElement.nextElementSibling.innerHTML =target.nextElementSibling.value * $(".unitPrice").html().slice(1, $(".unitPrice").html().length)
                        that.aPrice();
                    }
                } else if (target.getAttribute("id") == "add") {
                    target.previousElementSibling.value++;
                    target.parentElement.nextElementSibling.innerHTML = target.previousElementSibling.value * $(".unitPrice").html().slice(1, $(".unitPrice").html().length)
                    that.aPrice();
                }else if(target.getAttribute("class") == "del"){
                    target.parentElement.remove();
                    that.aPrice();
                    for(var i = 0;i<that.lists.length;i++){
                        if(that.lists[i].id == target.parentElement.getAttribute("id")){
                            that.lists.splice(i,1);
                            break;
                        }
                    }
                    setCookie("details",JSON.stringify(that.lists),{
                        path:"/"
                    })
                }
            })
        }
        aPrice() {
            this.all = document.querySelectorAll(".money");
            var a = 0;
            for (var i = 0; i < this.all.length; i++) {
                a = a + Number(this.all[i].innerHTML)
            }
            this.allPrice.innerHTML = a+ "元"
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
