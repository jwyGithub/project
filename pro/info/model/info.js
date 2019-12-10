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
            var spanL = e.clientX - this.small.offsetLeft - this.span.offsetWidth / 2;
            var spanT = e.clientY - this.small.offsetTop - this.span.offsetHeight / 2;
            // 边界限定
            // 左边限定
            // if(spanL < 0){spanL = 0;}
            // 上边限定
            // if(spanT < 0){spanT = 0};
            // 右边限定
            // if(spanL > this.small.offsetWidth - this.span.offsetWidth){
            //     spanL = this.small.offsetWidth - this.sSpanW;
            // }
            // 下边限定
            // if(spanT > this.small.offsetHeight - this.sSpanH){
            //     spanT = this.small.offsetHeight - this.sSpanH;
            // }
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

    return info;
});