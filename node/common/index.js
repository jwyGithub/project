let fs = require("fs");

let indexApi = (req,res) => {
    fs.readFile("./node/data/index.json", "utf8", (err, data) => {
        if (err) {
            res.write(err);
        } else {
            res.write(data);
        }
        res.end();
    })
}


module.exports = indexApi;