const premuimGuildsSchema = require('../models/premiumGuild-schema');
const premiumTimeoutSchema = require('../models/premiumExpiredTimeout-schema')
const { MessageEmbed } = require('discord.js');
const premiumGuildSchema = require('../models/premiumGuild-schema');

module.exports = (client) => {
    const check = async () => {
        const query = {
            expires: { $lt: new Date() },
        }
        const results = await premuimGuildsSchema.find(query)

        for (const result of results) {
            const { guildId, userId, type } = result
            const guild = client.guilds.cache.get(guildId)
            if (!guild) return result.delete()
            const date = new Date()
            const duration = date.setMinutes(date.getMinutes() + 720)

            premiumTimeoutSchema.create({
                guildId: guildId,
                expires: duration,
            })

                const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Your premium has run out!')
                .setDescription(`Your premium has run out for this server. To top it up please go the [support server](https://discord.gg/ArpuxMEa55)\nI will leave the server <t:${Math.round(duration / 1000)}:R>`)
                .setFooter({text: `I'm basically giving you an extra 12 hours of premium`})

                const channel = guild.channels.cache.find(channel => channel.permissionsFor(guild.me).has('SEND_MESSAGES') && channel.type === 'GUILD_TEXT')
                channel.createWebhook('IV-5', {avatar: client.user.displayAvatarURL()}).then(webhook => webhook.send({embeds: [embed]}))
        }

        await premiumGuildSchema.deleteMany(query)
        setTimeout(check, 1000 * 10)
    }
    check()
}

module.exports.config = {
    dbName: 'EXPIRED GUILDS',
    displayName: 'Expired Guilds' 
}
