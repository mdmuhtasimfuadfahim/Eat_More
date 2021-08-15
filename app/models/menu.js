const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    image:{type: String, required: true},
    typeName:{type: String, required: true},
    foodName:{type: String, required: true},
    price:{type: Number, required: true},
    description:{type: String, required: true}
})

module.exports = mongoose.model('Menu', menuSchema)