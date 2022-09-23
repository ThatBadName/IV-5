const premiumTimeoutSchema = require('../models/premiumExpiredTimeout-schema')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    const check = async () => {
        const query = {
            expires: { $lt: new Date() },
        }
        const results = await premiumTimeoutSchema.find(query)

        for (const result of results) {
            const { guildId } = result
            const guild = client.guilds.cache.get(guildId)
            if (!guild) return result.delete()

                const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Your premium has run out!')
                .setDescription(`Your premium has run out for this server. To top it up please go the [support server](https://discord.gg/ArpuxMEa55)`)
                .setFooter({text: `I have now left the server`})

                const channel = guild.channels.cache.find(channel => channel.permissionsFor(guild.me).has('SEND_MESSAGES') && channel.type === 'GUILD_TEXT')
                channel.createWebhook('IV-5', {avatar: client.user.displayAvatarURL()}).then(webhook => webhook.send({embeds: [embed]}))
                guild.leave()
        }

        await premiumTimeoutSchema.deleteMany(query)
        setTimeout(check, 1000 * 10)
    }
    check()
}

module.exports.config = {
    dbName: 'EXPIRED PREMIUMS',
    displayName: 'Expired Premiums' 
}
