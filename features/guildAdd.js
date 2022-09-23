const premuimGuildsSchema = require('../models/premiumGuild-schema')
const { MessageEmbed, WebhookClient } = require('discord.js')

module.exports = (client) => {
   client.on('guildCreate', async(guild) => {
    const result = await premuimGuildsSchema.findOne({guildId: guild.id})
    if (!result) {
        const giftEmbed = new MessageEmbed()
        .setTitle('I have left the server')
        .setDescription(`This server is not premium so I have left. If you believe this is a mistake please open a ticket in the [support server](https://discord.gg/ArpuxMEa55)`)
        .setColor('RED')

        const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES', 'EMBED_LINKS'))
        await channel.send({embeds: [giftEmbed]})
        guild.leave()
    }

    let channel = new WebhookClient({url: "https://discord.com/api/webhooks/992857616210473012/x70a8YcePEfqJtmJLvfG701fobJOgjUbmRLJPVHGE2oYq6lM809xAoo1MgFef1AdyAAB"})
    const embed = new MessageEmbed()
    .setColor('0xFF3D15')
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setTitle("New Server!")
    .addField("Server Name", guild.name, true)
    .addField("Server ID", guild.id, true)
    .addField("Owner ID", guild.ownerID ? guild.ownerID : 'Error', true)
    .addField("Owner Mention", `<@${guild.ownerID ? guild.ownerID : 'Error'}>`, true)

    await guild.channels.cache
    .filter(channel => channel.type === "GUILD_TEXT")
    .first()
    .createInvite({maxAge: 0})
    .then((invite) => embed.addField("Invite link", invite.url, true))
    .catch(() => embed.addField("Invite link", "Missing permissions", true))

channel.send({embeds: [embed]});
})
},

module.exports.config = {
   dbName: 'GUILDADD',
   displayName: 'Guild add to check premium',
}