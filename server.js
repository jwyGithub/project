let http = require("http");
let urlLib = require("url");
let static = require("./node/static/static");
let reg = require("./node/common/reg");
let login = require("./node/common/login");
let index = require("./node/common/index");
let search = require("./node/common/search");
let detail = require("./node/common/info");

let server = http.createServer((req, res) => {
    if (req.url.indexOf("/common") !== -1) {
        let urlobj = urlLib.parse(req.url, true);
        if (urlobj.pathname == "/common/reg") {
            reg(req, res);
        } else if (urlobj.pathname == "/common/login") {
            login(req, res);
        } else if (urlobj.pathname == "/common/index") {
            index(req, res);
        } else if (urlobj.pathname == "/common/search") {
            search(req, res);
        } else if (urlobj.pathname == "/common/detail") {
            detail(req,res);
        }
    } else {
        // 静态资源托管
        static({ req, res,defaultPage:"/pro/index/index.html",adress:"./node"});
    }
});
server.listen(80, () => {
    console.log("server is running")
});