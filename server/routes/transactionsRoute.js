const express = require("express");
const transactionsRouter = express.Router();
const Transaction = require("../models/transaction")
const User = require('../models/user');

//get all transactions
transactionsRouter.get('/', (req, res)=>{
    Transaction.find(req.query, (err, transactions)=>{
        if(err) return res.status(500).send(err);
        return res.send(transactions);
    });
});


transactionsRouter.get("/:transactionId/users", (req, res)=>{
    User.find({transactions:req.params.transactionId}, (err, users)=>{
        if(err) return res.status(500).send(err);
        return res.send(users);
    });
});

transactionsRouter.get('/users/:userId', (req,res)=>{
    Transaction.find({userId: req.params.userId},(err, transactions)=>{
        if(err) return res.status(500).send(err);
        return res.send(transactions)
    });
});

transactionsRouter.get('/:transactionId', (req, res)=>{
    Transaction.findOne({_id: req.params.transactionId}, (err, transaction)=>{
        if(err) return res.status(500).send(err);
        if(!transaction) return res.status(404).send("Transaction not found");
        return res.send(transaction);
    });
});

//BELOW POINT AND POINTS MIGHT NEED TO SWITCH

transactionsRouter.put("/:transactionId/points/:pointId", (req, res)=>{
    Transaction.findById(req.params.transactionId, (err, transaction)=>{
        if(err) return res.status(500).send(err)
        const point= transaction.points.id(req.params.pointId)
        point.set(req.body);
        transaction.save(function(err, newTransaction){
            if(err) return res.status(500).send(err);
            return res.status(201).send(newTransaction);

        });
    });
})

transactionsRouter.post('./:transactionID/points', (req,res)=>{
    Transaction.findByIdAndUpdate(req.params.transactionId,
        {$push: {points:req.body}},
        {new:true},
        (err, transaction)=>{
            if(err) return res.status(500).send(err);
            return res.send(transaction);
        })
})
module.exports= transactionsRouter;