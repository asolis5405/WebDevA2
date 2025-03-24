const { number } = require('joi')
const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
        max:100

    },
    description:{
        type:String,
        require:true,
        max:500
    },
    likes:{
        type:Number,
        default:0
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    }
})

module.exports = mongoose.model('posts',postSchema)