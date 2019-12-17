let fs = require("fs");
let querystring = require("querystring");
// 注册接口
function loginApi(req, res) {
    // 处理接收到的参数
    let str = "";
    req.on("data", (chunk) => {
        str += chunk;
    })
    req.on("end", () => {
        var param = querystring.parse(str);
        console.log("接收到的user是:" + param.user)
        console.log("接收到的pwd是:" + param.pwd)
        // 读取本地文件
        fs.readFile('./node/data/userInfo.json', 'utf-8', (err, data) => {
            if (err) {
                return new Error(err);
            } else {
                // 解析json文件中的数据，因为读出来的是string类型
                let dataObj = JSON.parse(data);
                let accArr = [];
                let pwdArr = [];
                // 暂时用比较，后期改为数据库查询
                for (let i = 0; i < dataObj.length; i++) {
                    accArr.push(dataObj[i].account);
                    pwdArr.push(dataObj[i].pwd);
                }  
                // 账号比较
                var typeA = accArr.some((val)=>{
                    return val === param.user;
                })
                // 密码比较
                var typeB = pwdArr.some((val)=>{
                    return val === param.pwd;
                })
                if (typeA == false) {
					res.write('{"code":400,"msg":"账号不存在"}')
				} else if (typeA == true && typeB == false) {
					res.write('{"code":400,"msg":"密码错误"}')
				} else if (typeA == true && typeB == true) {
					res.write('{"code":200,"msg":"登录成功"}')
				}
                res.end();
            }
        })
    })
}
module.exports = loginApi;