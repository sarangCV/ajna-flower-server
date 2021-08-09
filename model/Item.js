const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
        itemName: {
            type: String,
            required: true,  
            min: 6,
            max: 255
        },
        itemPrice: {
            type: String,
            required: true,  
            min: 6,
            max: 255
        },
        itemVendor: {
            type: String,
            required: true,      
            min: 6,
            max: 255      
        },
        itemDetails: {
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

const itemsSchema = new mongoose.Schema({ items: [itemSchema] });

module.exports = mongoose.model('Item', itemsSchema);