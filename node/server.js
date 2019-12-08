let http = require("http");
let fs = require("fs");
//解析url的小模块,工具模块
let url = require("url");
//解析查询数据的小模块,工具模块
let querystring = require("querystring");

let path = require("path");

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
		let urlObj = url.parse(req.url, true);

		if (urlObj.pathname == "/common/login") {
			loginApi(req, res);
		} else if (urlObj.pathname == "/common/index") {
			// indexApi(req, res);
			fs.readFile('data/index.json', 'utf-8', (err, data) => {
				if (err) {
					res.write(err);
				} else {
					res.write(data);
				}
				res.end();
			})
		}else if(urlObj.pathname == "/common/reg"){
			regApi(req, res);
		}

	}

}).listen("81", "127.0.0.1");


// 登录接口
function loginApi(req, res) {
	let urlObj = url.parse(req.url, true);
	fs.readFile('data/userInfo.json', 'utf-8', (err, data) => {
		if (err) {
			console.log(err)
		} else {
			let obj = JSON.parse(data);
			let userarr = [];
			let pwdarr = [];
			for (var i = 0; i < obj.data.length; i++) {
				userarr.push(obj.data[i].account);
				pwdarr.push(obj.data[i].pwd)
			}
			var postdata = '';//定义一个空的字符串
			req.addListener('data', function (chunk) {//一段一段的post请求体内容
				postdata += chunk;
			})
			req.addListener("end", function () {//全部输出触发
				var param = querystring.parse(postdata);
				var a = userarr.some((user) => {
					console.log("接收到的user是:" + param.user)
					return user == param.user;
				})
				var b = pwdarr.some((pwd) => {
					console.log("接收到的pwd是:" + param.pass)
					return pwd == param.pass;
				})
				if (a == false) {
					res.write('{"code":400,"msg":"账号不存在"}')
				} else if (a == true && b == false) {
					res.write('{"code":400,"msg":"密码错误"}')
				} else if (a == true && b == true) {
					res.write('{"code":200,"msg":"登录成功"}')
				}
				res.end();
			})
		}
	})
}

// 注册接口
function regApi(req,res){
	let urlObj = url.parse(req.url, true);
	fs.readFile('data/userInfo.json','utf-8', (err, data) => {
		var postdata = '';//定义一个空的字符串
		req.addListener('data', function (chunk) {//一段一段的post请求体内容
			postdata += chunk;
		})
		req.addListener("end", function () {//全部输出触发
			var param = querystring.parse(postdata);
			console.log("接收到的user是:" + param.user)
			console.log("接收到的pwd是:" + param.pass)
			var params = {
				"account":param.user,
				"pwd":param.pass
			}
			if(err){
			    return console.error(err);
			}
			var person = data.toString();//将二进制的数据转换为字符串
			person = JSON.parse(person);//将字符串转换为json对象
			person.data.push(params);//将传来的对象push进数组对象中
			person.total = person.data.length;//定义一下总条数，为以后的分页打基础
			console.log(person.data);
			var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
			fs.writeFile('data/userInfo.json',str,function(err){
			    if(err){
			        console.error(err);
			    }
			    console.log('----------新增成功-------------');
			})
			res.end('{"code":200,"msg":"注册成功"}');
		})
    })
}
