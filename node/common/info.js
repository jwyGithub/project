let fs = require("fs");
let url = require("url");
// 详情接口
let detailsApi = (req, res) =>{
	fs.readFile('./node/data/details.json', 'utf-8', (err, data) => {
		if (err) {
			res.end(err)
		} else {
			let urlObj = url.parse(req.url, true);
			console.log("---------------details-----------")
			console.log(" 接收到的商品id是" , urlObj.query.goodsId)
			// 解析所有商品
			let goodList = JSON.parse(data);
			for (var i = 0; i < goodList.details.length; i++) {
				if(goodList.details[i].id == urlObj.query.goodsId){
					let goods = JSON.stringify(goodList.details[i])
                    res.write(goods);
                    res.end();
				}
			}
		}
	})
}

module.exports = detailsApi;