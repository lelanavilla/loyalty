const express = require('express')
const pointsRouter = express.Router();
const Point= require('../models/point');
const Transaction= require('../models/transaction');
const User = require('../models/user');

pointsRouter.get('/', (req,res)=>{
    Point.find(req.query, (err, points)=>{
        if(err) return res.status(500).send(err);
        return res.send(points);
    })
})


pointsRouter.get('/:pointsId', (req, res)=>{
Point.findOne({_id: req.params.pointId}, (err, point)=>{
    if(err) return res.status(500).send(err);
if(!point) return res.status(404).send("No Points found!");
return res.send(point);
});
});

pointsRouter.get('/users/:userId', (req, res)=>{
    Transaction.find({userId:req.params.userId}, (err, points)=>{
        if(err) return res.status(500).send(err);
    return res.send(points)
    });
    });

    pointsRouter.get('/:userId/transactions', (req, res)=>{
        User.find({userId:req.params.userId}, (err, transactions) =>{
            if(err) return res.status(500).send(err);
        return res.send(transactions.points);
        
        });
    });

    pointsRouter.post('/', (req,res)=>{
        const point = new Point(req.body);
        point.transaction = req.transaction;
        point.save(function (err, newPoint){
            if(err) return res.status(500).send(err);
            return res.status(201).send(newPoint);
        });
    });
    
    pointsRouter.post("/:transactionId/points", (req,res)=>{
        Transaction.findByIdAndUpdate(req.params.transactionId,
            {$push: {totalPoints: req.body}},
            {new: true},
            (err,transaction)=>{
                if(err) return res.status(500).send(err);
                return res.send(transaction);
            });
    });

    module.export= pointsRouter;
    

