const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
   guildId: String,
   channelId: String,
   messageId: String
}, {
   timestamps: false
})

const name = 'pbutton-role'
module.exports = mongoose.models[name] || mongoose.model(name, schema)