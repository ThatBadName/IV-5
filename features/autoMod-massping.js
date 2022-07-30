const {MessageEmbed} = require('discord.js')
const setupSchema = require('../models/setup-schema')
const historySchema = require('../models/history-schema')
const strikeSchema = require('../models/strike-schema')

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        const maintenanceSchema = require('../models/mantenance-schema')
        const maintenance = await maintenanceSchema.findOne({maintenance: true})
            if (maintenance && message.author.id !== '804265795835265034') {
                return
            }
        if(message.author.bot) return;
        if(message.channel.type === 'DM') return;
        if(message.member.permissions.has("MANAGE_GUILD")) return
        if(message.channel.id === '963476714124632126') return;
        const database = await setupSchema.findOne({guildId: message.guild.id})
        const checkEnabledAutomod = await setupSchema.findOne({guildId: message.guild.id, automodEnabled: false})
        if (checkEnabledAutomod) return
        const checkEnabledLogging = await setupSchema.findOne({guildId: message.guild.id, loggingEnabled: false})
    
        try {
            
            if (message.mentions.members.size > database.massPingAmount) {
    
            try {
                const guild = message.guild
                const logChannel = message.guild.channels.cache.get(database.logChannelId)
                const user = message.author
                const member = message.guild.members.cache.get(user.id)
                var reason = `[AUTOMOD] Pinging too many users (${message.mentions.members.size} users) | You have also been put into timeout for 6 hours`
    
                member.timeout(21600000, reason).catch((err) => {
                    //console.log(err)
                })
                message.channel.send(`${message.author} Please don't mass ping users`)
    
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
                    type: 'timeout',
                    duration: '6h'
                })
    
                const logEmbed = new MessageEmbed()
                    .setColor('PURPLE')
                    .setTitle('STRIKE ADD')
                    .setDescription(`${user} has been striken`)
                    .addField("Staff:", `[AUTOMOD]`)
                    .addField("Reason:", `[AUTOMOD] Pinging too many users (${message.mentions.members.size} users) | You have also been put into timeout for 6 hours`)
                    .addField("ID:", `\`${strike.id}\``)
    
                logChannel.send({embeds: [logEmbed]})
    
                const embed = new MessageEmbed()
                    .setColor('DARK_RED')
                    .setTitle(`**You have been striken [AUTOMOD]**`)
                    .addField("Server:", `${guild}`)
                    .addField("Reason:", `[AUTOMOD] Pinging too many users (${message.mentions.members.size} users) | You have also been put into timeout for 6 hours`)
                    .addField("ID:", `\`${strike.id}\``)
                    .setDescription(`[Appeal here](${database.guildAppeal})`)
                    .setFooter({text: 'To view all strikes do \'/liststrikes\''})
    
                user.send({embeds: [embed]}).catch((err) => {
                    console.log(err)
                })
            } catch (err) {
                console.log(err)
            }
    
        }
        } catch (err) {
            //console.log(err)
        }
    })
}
module.exports.config = {
    dbName: 'AUTOMOD_FILTER',
    displayName: 'AutoMod - filter'
}