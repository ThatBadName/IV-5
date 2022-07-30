const { MessageEmbed } = require('discord.js')
const historySchema = require('../models/history-schema')
const strikeSchema = require('../models/strike-schema')
const setupSchema = require('../models/setup-schema')

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        const maintenanceSchema = require('../models/mantenance-schema')
        const maintenance = await maintenanceSchema.findOne({maintenance: true})
            if (maintenance && message.author.id !== '804265795835265034') {
                return
            }

            
            if(message.channel.type === 'DM') return; 
            if(message.author.bot) return;
            if(message.channel.name === 'spam') return;
            if(message.member.permissions.has("MANAGE_GUILD")) return
            const database = await setupSchema.findOne({guildId: message.guild?.id}).catch(err => {})
            if (!database) return setupSchema.create({guildId: message.guild.id})
            const checkEnabledAutomod = await setupSchema.findOne({guildId: message.guild.id, automodEnabled: false})
            if (checkEnabledAutomod) return
            const checkEnabledLogging = await setupSchema.findOne({guildId: message.guild.id, loggingEnabled: false})
            if(message.channel.id === database.advertisingChannelId) return
            if(message.channel.id === database.advertisingChannelId2) return
            if(message.channel.id === database.advertisingChannelId3) return

        if (message.content.length > database.messageLength) {
        message.channel.send(`${message.author} You have been muted for sending very long messages`)

        try {
            const guild = message.guild
            const logChannel = message.guild.channels.cache.get(database.logChannelId)
            const user = message.author
            const member = message.guild.members.cache.get(user.id)
            var reason = `[AUTOMOD] Sending a large block of text | You have also been put into timeout for 2 hours`

            member.timeout(7200000, reason).catch((err) => {
                //console.log(err)
            })

            const strike = await strikeSchema.create({
                userId: user?.id,
                staffId: '980386075014991912',
                guildId: guild?.id,
                reason,
            })

            historySchema.create({
                userId: user?.id,
                staffId: '980386075014991912',
                guildId: guild?.id,
                reason,
                punishmentId: strike.id,
                type: 'strike',
            })
            
            historySchema.create({
                userId: user?.id,
                staffId: '980386075014991912',
                guildId: guild?.id,
                reason,
                duration: '2h',
                type: 'timeout',
            })

            if (checkEnabledLogging) return

            const logEmbed = new MessageEmbed()
                .setColor('PURPLE')
                .setTitle('STRIKE ADD')
                .setDescription(`${user} has been striken`)
                .addField("Staff:", `[AUTOMOD]`)
                .addField("Reason:", `[AUTOMOD] Sending a large block of text | You have also been put into timeout for 2 hours`)
                .addField("ID:", `\`${strike.id}\``)

            logChannel.send({embeds: [logEmbed]})

            const embed = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle(`**You have been striken [AUTOMOD]**`)
                .addField("Server:", `${guild}`)
                .addField("Reason:", `[AUTOMOD] Sending a large block of text | You have also been put into timeout for 2 hours`)
                .addField("ID:", `\`${strike.id}\``)
                .setDescription(`[Appeal here](${database.guildAppeal})`)
                .setFooter({text: 'To view all strikes do \'/liststrikes\''})

            user.send({embeds: [embed]}).catch((err) => {
                console.log(err)
            })
            message.delete()
        } catch (err) {
            console.log(err)
        }
        }
    })
}
module.exports.config = {
    dbName: 'AUTOMOD_TEXTWALL',
    displayName: 'Automod - textwall'
}