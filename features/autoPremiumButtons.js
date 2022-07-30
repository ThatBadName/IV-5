const { MessageEmbed } = require('discord.js')
const premiumCodeSchema = require('../models/premiumCode-schema')

module.exports = (client) => {
    client.on('interactionCreate', async(interaction) => {
     if (interaction.customId !== 'claimedPremium') return
     const notClaimedEmbed = new MessageEmbed()
     .setTitle('This code has not been claimed')
     .setColor('RED')
     const check = await premiumCodeSchema.findOne({code: interaction.channel.topic})
     if (check) return interaction.reply({embeds: [notClaimedEmbed], ephemeral: true})
     interaction.channel.delete()
 })
 },
 
 module.exports.config = {
    dbName: 'AUTO PREMIUM BUTTON',
    displayName: 'Auto premium button',
 }