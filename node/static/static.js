let fs = require("fs");

let static = ({
    req = null,
    res = null,
    defaultPage = "/index.html",
    adress = "./www"
}) => {
    if (!req || !res) {
        return new Error('req,res为必传参数')
    }
    let path = req.url === "/" ? defaultPage : req.url;
    try {
        let data = fs.readFileSync(adress + path);
        res.write(data);
        res.end();
    } catch (e) {
        // let error = fs.readFileSync("./www/error.html");
        // res.write(e);
        res.end();
    }
}
module.exports = static;