const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const botSchema = new mongoose.Schema({
    announcement: String,
    maintenance: Boolean,
    maintenanceReason: String,
    highestScore: {type: Number, default: 0},
    highHumanId: {type: String},
    highHumanTag: {type: String},
})

const name = 'pbot'
module.exports = mongoose.models[name] || mongoose.model(name, botSchema, name)