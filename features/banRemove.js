const setupSchema = require('../models/setup-schema')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
   client.on('guildBanRemove', async(ban, guild, user) => {
    const checkEnabledLogging = await setupSchema.findOne({guildId: ban.guild.id, loggingEnabled: false})
      if (checkEnabledLogging) return
        const result = await setupSchema.findOne({guildId: ban.guild.id})
        const channel = ban.guild.channels.cache.get(result.logChannelId)
        if (!result) return
        if (!channel) return

        const logEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`UNBAN`)
        .setDescription(`${ban.user} has been unbanned`)
        .setFooter({text: `User: ${ban.user.tag} | ID: ${ban.user.id}`})

        channel.send({embeds: [logEmbed]})
})
},

module.exports.config = {
   dbName: 'banRemove',
   displayName: 'ban remove',
}