let fs = require("fs");
let querystring = require("querystring");
// 注册接口
function regApi(req, res) {
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
                for (let i = 0; i < dataObj.length; i++) {
                    // 判断是否已存在账号
                    if (dataObj[i].account === param.user) {
                        res.write(`{"code":401,"msg":"Account number already exists"}`);
                        res.end();
                        return;
                    }
                }
                // 将传过来的参数保存，添加到文件中
                let accountInfo = {
                    "account": param.user,
                    "pwd": param.pwd
                }
                // 将注册的账号密码push进数组中
                dataObj.push(accountInfo);
                // 以字符的形式传进去
                let str = JSON.stringify(dataObj);
                fs.writeFile("./node/data/userInfo.json", str, "utf8",()=>{
                    res.write(`{"code":200,"msg":"success"}`);
                    res.end();
                });
            }
        })
    })
}
module.exports = regApi;