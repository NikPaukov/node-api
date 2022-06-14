
const mongoose = require('mongoose');


fightersSchema = new mongoose.Schema({
    _id: {type:String,required: true,},
    name: {type:String,required: true,},
    health: {type:Number,required: true,},
    attack: {type:Number,required: true,},
    defense: {type:Number,required: true,},
    source:{type:String,required: true,},
  })


module.exports = mongoose.model('Fighter', fightersSchema)
