const mongoose = require('mongoose')
const { Schema } = mongoose

const reqString = {
    type: String,
    required: true,
}

const schema = new Schema({
    guildId: reqString,
    code: {type: String, default: `0000`},
    supportId: String,
    supportCatId: String,
    supportCatIdClosed: String,
    guildInvite: {type: String, default: `https://google.com/`},
    guildAppeal: {type: String, default: `https://google.com/`},
    rankCard: {type: Boolean, default: true},
    suggestionChannelId: String,
    logChannelId: String,
    advertisingChannelId: String,
    advertisingChannelId2: String,
    advertisingChannelId3: String,
    loggingEnabled: {type: Boolean, default: false},
    automodEnabled: {type: Boolean, default: false},
    levellingEnabled: {type: Boolean, default: false},
    economyEnabled: {type: Boolean, default: false},
    ghostPingEnabled: {type: Boolean, default: false},
    percentage: {type: Number, default: 0},
    massPingAmount: {type: Number, default: 5},
    messageLength: {type: Number, default: 300},
    spamThresh: {type: Number, default: 4},
})

const name = 'psetupSchema'

module.exports = mongoose.models[name] || mongoose.model(name, schema)