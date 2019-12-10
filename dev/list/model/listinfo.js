define(() => {
    class Info{
        constructor(){
            this.goods = document.querySelector(".goodslist");
            this.keyword = document.getElementById("keyword")
            this.search = document.getElementById("search");
            this.init();
        }
        init(){
            var that = this;
            this.key = getCookie("keyword");

            this.search.onclick = function(){
                that.listkey = that.keyword.value || this.key;
                that.load();
            }

            this.load();

        }
        load(){
            var that = this;
            // http://localhost:81/common/login
            $.ajax({
                url: "http://localhost:81/common/search",
                data:{
                    key:that.listkey
                },
                success: function (res) {
                    that.res = JSON.parse(res);
                    that.display();
                }
            })
        }
        display(){
            var str = "";
            for(var i = 0;i< this.res.length;i++){
                str += `<li>
                            <img src="${this.res[i].imgurl}" >
                            <div class="items">
                                <img src="${this.res[i].imgurl}" alt="">
                            </div>
                            <p>${this.res[i].title}</p>
                            <div class="price">${this.res[i].price}</div>
                        </li>`
            }
            // console.log(this.res)
           this.goods.innerHTML = str;
        }
    }

    function getCookie(key){
        var arr = document.cookie.split("; ");
        for(var i=0;i<arr.length;i++){
            if(arr[i].split("=")[0] == key){
                return arr[i].split("=")[1];
            }
        }
        return "";
    }

    return Info;



})