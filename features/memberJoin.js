const { MessageEmbed } = require('discord.js')
const setupSchema = require('../models/setup-schema')

module.exports = (client) => {
   client.on('guildMemberAdd', async(member) => {
      const checkEnabledLogging = await setupSchema.findOne({guildId: member.guild.id, loggingEnabled: false})
      if (checkEnabledLogging) return
        const { guild } = member 
        const result = await setupSchema.findOne({guildId: guild.id})
        const channel = guild.channels.cache.get(result.logChannelId)
        if (!result) return
        if (!channel) return

        const logEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Member Joined`)
        .setDescription(`${member} has joined the server`)
        .setThumbnail(member.displayAvatarURL({ dynamic: true}))
        .setFooter({text: `User: ${member.tag} | ID: ${member.id}`})

        channel.send({embeds: [logEmbed]})
   })
},

module.exports.config = {
   dbName: 'MEMBERADD',
   displayName: 'Member Add',
}