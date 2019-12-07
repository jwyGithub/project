let http = require("http");
let fs = require("fs");
//解析url的小模块,工具模块
let url = require("url");
//解析查询数据的小模块,工具模块
let querystring = require("querystring");

// 跨域允许访问的地址配置
let allowOrigin = {
	'http://localhost': true,
}
// let {origin}=req.headers;
//  if (allowOrigin[origin]) {
// 	res.setHeader('access-control-allow-origin', '*');
//  }

http.createServer((req, res) => {
	if (req.url != "/favicon.ico") {
		// 设置跨域请求头
		let { origin } = req.headers;
		if (allowOrigin[origin]) {
			res.setHeader('access-control-allow-origin', '*');
		}
		let urlObj = url.parse(req.url,true);
		// switch(urlObj.pathname){
		// 	case "/common/login":
		// 		loginApi(req,res);break;
		// 	default:
		// 		return;
		// }
		if(urlObj.pathname == "/common/login"){
			fs.readFile('data/userInfo.json', 'utf-8', (err, data) => {
				if (err) {
					console.log(err)
				} else {
					let obj = JSON.parse(data);
					for(var i = 0;i<obj.length;i++){
						if(obj[i].account == urlObj.query.user){
							res.write("200")
						}else{
							res.write("400")
						}
					}
				}
				res.end();
			})
		}

	}

}).listen("81", "127.0.0.1");



