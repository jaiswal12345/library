var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
module.exports = {
    register:function(req,res){
        var user = new User(req.body);
        user.save(function(err,result){
            if (!err){
                res.status(201);
                res.send("registered");
            } else{
                res.status(500);
                res.send(err);
            }
        });
    },

    login :function(req,res){
        var user = new User(req.body);
        User.findOne({email:user.email,password:user.password})
        .exec()
        .then(function(user){
            if(user){
                res.status(200);
                let token = jwt.sign({email:user.email,role:'admin'},'secret',{expiresIn:"5m"});
                let response = {
                    'email':user.email,
                    'token':token
                }
                res.send(response);
            } else{
                res.status(404);
                res.send("username or password in wrong");
            }
           
        })
        .catch(function(err){
            res.status(501);
            res.send(err);
        })
    }

}