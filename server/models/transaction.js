const mongoose = require("mongoose");

const {Schema} = mongoose;

const transactionSchema = new Schema({
    date:{
        type: Date,
        required: true
    },
    total:[{
        amount:{
            type:Number,
            default:0
         },
        points:{
            type: Schema.Types.ObjectId,
            ref: 'Point'
        }
    }] 
})

module.exports= mongoose.model("Transaction", transactionSchema)