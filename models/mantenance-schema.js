const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const maintenanceSchema = new mongoose.Schema({
    maintenance: Boolean,
    maintenanceReason: String
})

const name = 'pmaintenance'
module.exports = mongoose.models[name] || mongoose.model(name, maintenanceSchema, name)