var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path')

var server = http.createServer(function (req, res) {

	if (req.url != "/favicon.ico") {
		var staticPath = path.join(__dirname, 'data');

		var pathObj = url.parse(req.url, true);

		var filePath = path.join(staticPath, pathObj.pathname);

		var fileContent = fs.readFileSync(filePath);


		res.write(fileContent);
		res.end();
	}
});

server.listen(82);
console.log('server is running');
