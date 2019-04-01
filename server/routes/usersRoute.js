const express = require('express')
const expressJwt = require('express-jwt')
const usersRouter = express.Router();

const User = require('../models/user');

const auth = expressJwt({secret: process.env.SECRET});

usersRouter.use(auth);

usersRouter.get('/verify', (req, res) =>{
    User.findOne({_id: req.user._id})
    .populate("transactions")
    .exec((err, user)=>{
        if(err) return res.status(500).send(err);
        if(!user) return res.status(403).send({message:"User does not exist!"});
        res.status(200).send(user);
    });
})

usersRouter.get('/', (req, res) =>{
    User.find( req.query,(err, users)=>{
        if(err) return res.status(500).send(err);
        res.send(users);
    });
})

usersRouter.get('/transactions/:transactionId', (req, res) =>{
    User.find({transactions: req.params.transactionId},(err, users)=>{
        if(err) return res.status(500).send(err);
        res.send(users);
    });
});

usersRouter.get('/:transactionId', (req, res) =>{
    User.findById({_id: req.params.transactionId})
    .populate("transactions")
    .exec((err, user)=>{
        if(err) return res.status(500).send({success:false,err:"User not found!"});
        return res.status(200).send({success:true, user: user.withoutPassword()})
    });
});

module.exports= usersRouter;


