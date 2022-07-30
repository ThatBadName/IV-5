const { model, Schema } = require("mongoose");

module.exports = model("pPoll", new Schema({
    guildId: String,
    channelId: String,
    messageId: String,
    createdBy: String,
    users: [String],
    votes: {},
    title: String,
    button1: Number,
    button2: Number,
    button3: Number,
    button4: Number,
    button5: Number
}));