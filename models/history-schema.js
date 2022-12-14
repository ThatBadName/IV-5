const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const historySchema = new mongoose.Schema({
    userId: reqString,
    staffId: reqString,
    guildId: reqString,
    type: reqString,
    reason: reqString,
    duration: String,
    punishmentId: String,
},
{
    timestamps: true,
})
const name = 'phistory'
module.exports = mongoose.models[name] || mongoose.model(name, historySchema, name)
