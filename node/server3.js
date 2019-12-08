var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'data')));

app.get('/login1', function(req, res, next) {
    res.writeHead(200,{'Content-Type':'images/png'})
    fs.readFile('./html/1.html','utf-8',function(err,data){
        if(err){
        throw err ;
        }
        res.end(data);
        });
});

app.listen(83);
console.log("监听端口 5000");