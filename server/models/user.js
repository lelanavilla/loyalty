const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const {Schema} = mongoose;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    transactions:[{
        type: Schema.Types.ObjectId,
        ref: "Transaction"
    }],

    points:[{
        type:Schema.Types.ObjectId,
        ref:"Point"
    }],
    isAdmin:{
        type:Boolean,
        default:false                                                                                                     
    }
});

userSchema.pre('save',function(next){
    const user= this;
    if(!user.isModified("password")) return next();
    bcrypt.hash(user.password, 10, (err, hash)=>{
        if(err) return next(err);
        user.password= hash;
        next();
    });
});

userSchema.methods.checkPassword = function (passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err,isMatch)=>{
        if(err) return callback(err);
        callback(null, isMatch);
    })
}

userSchema.methods.withoutPassword = function (){
    const user= this.toObject();
    delete user.password;
    return user;
}

module.exports= mongoose.model("User", userSchema);