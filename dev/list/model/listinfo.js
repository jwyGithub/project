define(() => {
    class Info{
        constructor(){
            this.goods = document.querySelector(".goods");
            this.init();
        }
        init(){
            let key = getCookie(keyword);
            console.log(key)
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