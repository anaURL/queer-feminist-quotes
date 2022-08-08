const mongoose = require ('mongoose')
const feministQuotesSchema = new mongoose.Schema( {
    author: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default:Date.now
    }
})
module.exports = mongoose.model('FeministQuote', feministQuotesSchema, 'quotes' )