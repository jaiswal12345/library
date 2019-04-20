var mongoose = require('mongoose');

var userModel = mongoose.model("Users",{
    email: {type:String,required:true,unique:true},
    password:{type:String,required:[true,"password is mandatory field"], minlength:[4,"minimun length should be 4 characters"]},
    active:{type:Boolean,default:false},
    lastUpdated:{type:Date,default:Date.now},
    phone: {type:String,validate:{
        validator:function(val){
            return /[0-9]{10}/.test(val);
            }
        }
    }
});

module.exports = userModel;