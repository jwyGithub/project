define(() => {
    class Banner {
        constructor() {
            this.items = $(".banner").find(".imgbox").find("img");
            this.left = document.getElementById("left");
            this.right = document.getElementById("right");
            // 初始显示哪张图片
            this.index = 0;
            this.iPrev = this.items.length - 1;
            this.init();

        }
        init() {
            var that = this;
            this.items.css({
                position: "absolute",
                left: this.items.eq(0).width(),
                top: 0
            }).eq(this.index).css({
                left: 0
            })
            this.left.onclick = () =>{
                console.log(111)
                that.btnL();
            }
            this.right.onclick = () =>{
                that.btnR();
            }

            

            this.autoplay();
        }
        btnL() {
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
        btnR(){
            //下一个
            if (this.index == this.items.length - 1) {
                this.index = 0;
                this.iPrev = this.items.length - 1
            } else {
                this.index++;
                this.iPrev = this.index - 1;
            }
            this.move(-1);
        }
        move(type) {
            this.items.eq(this.iPrev).css({
                left:0
            }).stop().animate({
				left:this.items.eq(0).width() * type
			}).end().eq(this.index).css({
				left:-this.items.eq(0).width() * type
			}).stop().animate({
				left:0
			});
        }
        autoplay(){
            var that = this;
            this.t = setInterval(()=>{
                that.btnR();
            },4000)
        }

    }




    return Banner;
});