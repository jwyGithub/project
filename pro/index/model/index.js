define(() => {
    class load {
        constructor() {
            this.login = document.getElementById("login");
            // console.log(this.login)
            this.reg = document.getElementById("reg");
            this.con = document.querySelector(".contribute");
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
                    that.contribute = JSON.parse(res).contribute;
                    that.displayContribute();
                }
            });
        }
        displayContribute() {
            this.con.innerHTML = `<dl>
            <dt><img src="${this.contribute[0].firimg}" alt=""></dt>
            <dd><img src="${this.contribute[0].img1}" alt=""></dd>
            <dd><img src="${this.contribute[0].img2}" alt=""></dd>
            <dd><img src="${this.contribute[0].img3}" alt=""></dd>
            <dd><img src="${this.contribute[0].img4}" alt=""></dd>
            </dl>`;
            console.log(this.contribute[0].img1);
        }
    }

    return load;
});