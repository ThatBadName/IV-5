const { MessageEmbed } = require("discord.js")
const configSchema = require('../models/setup-schema')

module.exports = (client) => {
   client.on('messageDelete', async(message) => {
    const maintenanceSchema = require('../models/mantenance-schema')
    const maintenance = await maintenanceSchema.findOne({maintenance: true})
        if (maintenance && message.author.id !== '804265795835265034') {
            return
        }
    const { channel, content, author, guild, mentions } = message
    const result = await configSchema.findOne({guildId: guild.id, ghostPingEnabled: true})
    const data = await configSchema.findOne({guildId: guild.id})

    if (author.bot || !author || mentions.members.size === 0 || !result) return
    const embed = new MessageEmbed()
    .setColor('0xFF0000')
    .setTitle('I have detected a possible ghost ping')
    .setFields({
        name: 'Message Author',
        value: `${author} \`(${author.tag})\``,
        inline: true
    }, {
        name: 'Message Content',
        value: `${content}`
    })
    const logEmbed = new MessageEmbed()
    .setColor('0xFFFF00')
    .setTitle('GHOST PING')
    .setFields({
        name: 'Message Author',
        value: `${author} \`(${author.tag})\``,
        inline: true
    }, {
        name: 'Channel',
        value: `${channel}`,
        inline: true
    }, {
        name: 'Message Content',
        value: `${content}`
    })
    .setFooter({text: `This may not be a ghost ping`})
    channel.send({embeds: [embed]})
    if (!data.logChannelId) return
    const logChannel = message.guild.channels.cache.get(data.logChannelId)
    if (!logChannel) return
    logChannel.send({embeds: [logEmbed]})
})
},

module.exports.config = {
   dbName: 'ANTI-GHOSTPING',
   displayName: 'Anti ghost ping',
}