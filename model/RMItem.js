const mongoose = require('mongoose');

const RMItemSchema = new mongoose.Schema({
        rmParticular: {
            type: String,
            required: true,  
            min: 6,
            max: 255
        },
        rmPrice: {
            type: String,
            required: true,  
            min: 6,
            max: 255
        },
        rmQuantity: {
            type: String,
            required: true,      
            min: 6,
            max: 255      
        },
        rmCommission: {
            type: String,
            required: true,     
            min: 6,
            max: 255       
        },
        rmNote: {
            type: String,
            required: true,     
            min: 6,
            max: 255       
        },
        date: {
            type: Date,
            default: Date.now
        }
})

module.exports = mongoose.model('RMItem', RMItemSchema);