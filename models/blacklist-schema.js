const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const blacklistSchema = new mongoose.Schema({
    userId: reqString,
    reason: String,
}, {
    timestamps: true
})

const name = 'pblacklist'
module.exports = mongoose.models[name] || mongoose.model(name, blacklistSchema, name)