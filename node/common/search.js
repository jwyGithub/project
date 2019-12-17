let fs = require("fs");
let url = require("url");

// 搜索接口
let searchApi = (req, res) => {
	let urlObj = url.parse(req.url, true);
	fs.readFile('./node/data/list.json', 'utf-8', (err, data) => {
		console.log("接收到的搜索词是：" , urlObj.query.key);
		if (err) {
			res.end(err)
		} else {
			let l = JSON.parse(data);
			let str = "";
			//判断接收到的keyword是否和json文件的title符合
			for (let i = 0; i < l.list.length; i++) {
				if ((l.list[i].title).includes(urlObj.query.key)) {
					str += `
							{	
								"goodsId":${l.list[i].goodsId},
								"imgurl":"${l.list[i].imgurl}",
								"title":"${l.list[i].title}",
								"price":"${l.list[i].price}"
							},`

				}
			}
			str1 = str.slice(0, str.length - 1)
			listStr = `[${str1}]`
			res.end(listStr);
		}
	})
}


module.exports = searchApi;