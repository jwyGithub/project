define(() => {
    class UserLogin{
        constructor(){
            this.tel = document.getElementById("tel");
            this.pwd = document.getElementById("pwd");
            this.btn = document.getElementById("login");
            this.back = document.getElementById("back");
            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.btn.onclick = () => {
                that.telV = that.tel.value;
                that.pwdV = that.pwd.value;
                that.login();
            }
            this.back.onclick = () =>{
                location.href = "http://localhost/index/index.html";
            }
         
        }
        login(){
            var that = this;
            $.ajax({
                url:"http://localhost:81/common/login",
                data:{
                    user:that.telV,
                    pass:that.pwdV
                },
                type:"post",
                success:function(res,status){
                // console.log(JSON.parse(res))
                    that.res = JSON.parse(res);
                    that.load();
                },
                error:function(res,status){
                    console.log(status);
                    // console.loag(status);
                }
            })
        }
        load(){
            if(this.res.code == 200 && this.res.msg == "登录成功"){
                console.log(1)
                location.href = "http://localhost/index/index.html";
            }
        }
    }




    


    return UserLogin;

//     function ajax(options){
//         options = options || {};  
//         options.type = options.type || "get";
//         data = options.data || {}; 
//         // 处理数据
//         var str = "";
//         for(var i in data){
//             //str += `${i}=${data[i]}&`;  //IE不兼容反引号写法 ----update by 12-02
// 　　　　　　　　　　　str = str + i + "=" + data[i] + "&";    9             }
//         // 判断type类型拼接url
//         if(options.type == "get" || options.type == "jsonp"){
//             var d = new Date();
//             //url = `${options.url}?${str}d=${d.getTime()}`; //IE不兼容反引号写法 ----update by 12-02
// 　　　　　　　　　　　url = options.url + "?" + str + "_jwy" + "=" + d.getTime();          
//         }else{
//             url = options.url;
//         }
//         // console.log(`拼接后的url是${url}`);
//         // 判断type类型走jsonp还是创建ajax
//         if(options.type == "jsonp" ){
//             var script = document.createElement("script");
//             script.src = url;
//             document.body.appendChild(script);
//             // console.log(`走了jsonp的方法,url是${url}`)
//             window[data[data.colmName]] = function(responseText){
//                 options.success(responseText);
//             }
//         }else{
//             var xhr;
//             //兼容性
//             if(window.XMLHttpRequest){
//                 xhr = new XMLHttpRequest();
//             }else if(window.ActiveObject){
//                 xhr = new ActiveXobject('Microsoft.XMLHTTP');
//             }
//             // 发送请求
//             if(options.type == "get"){
//                 // console.log(`走了get的方法,url是${url}`)
//                 xhr.open("get",url,true);
//                 xhr.send(null)
//             }else{
//                 // console.log(`走了post的方法,url是${options.url},参数是${str}`)
//                 xhr.open("post",url,true);
//                 xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//                 xhr.send(str.slice(0,str.length-1));
//             }
//             // 接收数据
//             xhr.onreadystatechange = function(){
//                 if(xhr.readyState == 4){
//                     var status = xhr.status;
//                     if(xhr.readyState == 4 && xhr.status == 200){
//                         options.success(xhr.responseText,xhr.status);
//                     }else{
//                         options.error(xhr.responseText,xhr.status)
//                     }
//                 }
//             }
//         }
//     }
});
