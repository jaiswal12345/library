var http =require('http');
var express = require('express');
var mongoose = require('mongoose');
var bookCtrl = require('./controllers/book.ctrl');
var bookRouter = require('./routers/book.router');
var userCtrl = require('./controllers/user.ctrl');
var userRouter = require('./routers/user.router');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const cors = require("cors");   

var app = express();
app.use(cors());
var port = process.env.PORT|| 3000;
app.use(bodyParser.json());
app.listen(port,function(){
    console.log("Server started");
});
mongoose.connection.openUri("mongodb://admin:admin@ds119070.mlab.com:19070/product-demo",{ useNewUrlParser: true } );
function authentication(req,res,next){
    var user = jwt.verify(req.headers['authorization'],'secret',function(err){
        if (!err){
            res.status(200);
            next();
        }else{
            res.status(401);
            res.send("Unauthorized");
        }
    });
}
app.use('/api/users',userRouter);
app.use(authentication);
app.use('/api/books',bookRouter);