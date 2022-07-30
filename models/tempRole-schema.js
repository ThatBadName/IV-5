const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
    guildId: String,
    userId: String,
    roleId: String,
    expires: Date,
}, {
   timestamps: false
})

const name = 'tempRole'
module.exports = mongoose.models[name] || mongoose.model(name, schema)