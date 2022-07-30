const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
   guildId: String,
   userId: String,
   reason: String,
   time: Date,
}, {
   timestamps: false
})
const name = 'pakf'
module.exports = mongoose.models[name] || mongoose.model(name, schema)