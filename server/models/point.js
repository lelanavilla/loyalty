const mongoose = require('mongoose');
const {Schema} = mongoose;

const pointSchema = new Schema({
    point:{
        type:Number,
        default:0,
        required:true
    }

});

module.exports = mongoose.model("Point", pointSchema);