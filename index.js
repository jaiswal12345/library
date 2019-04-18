var http =require('http');
var express = require('express');
var mongoose = require('mongoose');
var bookCtrl = require('./controllers/book.ctrl');
var bookRouter = require('./routers/book.router');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT|| 3000;
app.use(bodyParser.json());
app.listen(port,function(){
    console.log("Server started");
});
mongoose.connection.openUri("mongodb://admin:admin@ds119070.mlab.com:19070/product-demo",{ useNewUrlParser: true } );

app.use('/api/books',bookRouter);