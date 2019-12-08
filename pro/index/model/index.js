define(() => {
    class load {
        constructor() {
            this.login = document.getElementById("login");
            // console.log(this.login)
            this.reg = document.getElementById("reg");
            this.con = document.querySelector(".contribute");
            this.hot = document.querySelector(".wrapper-a");
            this.onefr = document.querySelector(".oneFright");
            this.twofr = document.querySelector(".twoFright");
            this.threefr = document.querySelector(".threeFright");
            this.fourfr = document.querySelector(".fourFright");
            this.init();
        }
        init() {
            this.login.onclick = () => {
                location.href = "http://localhost/login/login.html";
            };
            this.load();
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
        display() {
            // 小banner渲染
            this.con.innerHTML = `<dl>
            <dt><img src="${this.res.contribute.firimg}" alt=""></dt>
            <dd><img src="${this.res.contribute.img1}" alt=""></dd>
            <dd><img src="${this.res.contribute.img2}" alt=""></dd>
            <dd><img src="${this.res.contribute.img3}" alt=""></dd>
            <dd><img src="${this.res.contribute.img4}" alt=""></dd>
            </dl>`;

            // 热门推荐渲染
            var str = "";
            for (var i = 0; i < this.res.hot.length; i++) {
                str += `<li>
                        <a href="#">
                            <img src="${this.res.hot[i].img1url}" alt="">
                            <p>${this.res.hot[i].name}</p>
                        </a>
                        <span>商城价：￥${this.res.hot[i].price}</span>
                    </li>`;
            }
            this.hot.innerHTML = str;

            // 1f渲染
            var str = "";
            for (var i = 0; i < this.res.oneF[2].oneFr.length; i++) {
                str += `<a href="#">
                    <img src="${this.res.oneF[2].oneFr[i].imgurl}" alt="">
                    <p>${this.res.oneF[2].oneFr[i].name}</p>
                    <span>￥${this.res.oneF[2].oneFr[i].price}</span>
                    </a>`;
            }
            this.onefr.innerHTML = str;

            // 2f渲染
            var str = "";
            for (var i = 0; i < this.res.twoF[2].twoFr.length; i++) {
                str += `<a href="#">
                    <img src="${this.res.twoF[2].twoFr[i].imgurl}" alt="">
                    <p>${this.res.twoF[2].twoFr[i].name}</p>
                    <span>￥${this.res.twoF[2].twoFr[i].price}</span>
                    </a>`;
            }
            this.twofr.innerHTML = str;

            // 3f渲染
            var str = "";
            for (var i = 0; i < this.res.threeF[2].threeFr.length; i++) {
                str += `<a href="#">
                    <img src="${this.res.threeF[2].threeFr[i].imgurl}" alt="">
                    <p>${this.res.threeF[2].threeFr[i].name}</p>
                    <span>￥${this.res.threeF[2].threeFr[i].price}</span>
                    </a>`;
            }
            this.threefr.innerHTML = str;

            // 4f渲染
            var str = "";
            for (var i = 0; i < this.res.fourF[2].fourFr.length; i++) {
                str += `<a href="#">
                    <img src="${this.res.fourF[2].fourFr[i].imgurl}" alt="">
                    <p>${this.res.fourF[2].fourFr[i].name}</p>
                    <span>￥${this.res.fourF[2].fourFr[i].price}</span>
                    </a>`;
            }
            console.log(str);
            this.fourfr.innerHTML = str;
        }
    }

    return load;
});