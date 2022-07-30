const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
   userId: String,
   score: {type: Number, default: 0},
   highScore: {type: Number, default: 0}
}, {
   timestamps: false
})

const name = 'gameIMade'
module.exports = mongoose.models[name] || mongoose.model(name, schema)