const DB = require('../models/setup-schema')
const strikeSchema = require('../models/strike-schema')
const historySchema = require('../models/history-schema')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
   client.on('messageCreate', async(message) => {
    const maintenanceSchema = require('../models/mantenance-schema')
    const maintenance = await maintenanceSchema.findOne({maintenance: true})
        if (maintenance && message.author.id !== '804265795835265034') {
            return
        }
    if (message.channel.type === "DM") return;
    if (message.author.bot) return;
    if (message.member.permissions.has('MANAGE_GUILD')) return
    if(message.channel.name === 'spam') return;
    const member = message.guild.members.cache.get(message.author.id)
    const checkEnabledLogging = await DB.findOne({guildId: message.guild.id, loggingEnabled: false})
    const checkEnabledAutomod = await DB.findOne({guildId: message.guild.id, automodEnabled: false})
    if (checkEnabledAutomod) return
    
    const data = await DB.findOne({ GuildID: message.guild.id });
    if (!data) return;
    const logChannel = message.guild.channels.cache.get(data.logChannelId)

        if (message.content.length < 10) return;
        let count = 0;
        let messageContent = message.content.replace(/[^a-zA-Z]/gm, "");

        for (let i = 0; i < message.content.length; i++) {
            const isUppercase = (messageContent.charAt(i) === messageContent.charAt(i).toUpperCase());
            if (isUppercase) count++;
        }

        const percentage = (count / messageContent.length) * 100;
        if (percentage === Infinity || percentage > 100) return
        if (percentage >= data.percentage) {
            await message.delete();
            message.channel.send({ content: `${message.member}, please do not excessively use uppercase characters`});
            member.timeout(10000).catch(err => {})
                try {
                    const reason = `[AUTOMOD] Using too many caps: \`\`\`${message.content}\`\`\``
  
                    const strike = await strikeSchema.create({
                        userId: message.author.id,
                        staffId: '980386075014991912',
                        guildId: message.guild?.id,
                        reason,
                    })
        
                    historySchema.create({
                        userId: message.author?.id,
                        staffId: '980386075014991912',
                        guildId: message.guild?.id,
                        reason,
                        punishmentId: strike.id,
                        type: 'strike',
                    })
                    
                    historySchema.create({
                    userId: message.author?.id,
                    staffId: '980386075014991912',
                    guildId: message.guild?.id,
                    reason,
                    duration: '10s',
                    type: 'timeout',
                })

                const embed = new MessageEmbed()
                    .setColor('DARK_RED')
                    .setTitle(`**You have been stricken [AUTOMOD]**`)
                    .addField("Server:", `${message.guild}`)
                    .addField("Reason:", `[AUTOMOD] Using too many caps: \`\`\`${message.content}\`\`\``)
                    .addField("ID:", `\`${strike.id}\``)
                    .setDescription(`[Appeal here](${DB.guildAppeal})`)
                    .setFooter({text: 'To view all strikes do \'/liststrikes\''})
    
                await member.send({embeds: [embed]}).catch((err) => {
                    console.log(err)
                })
                if (checkEnabledLogging) return
        
                    const logEmbed = new MessageEmbed()
                        .setColor('PURPLE')
                        .setTitle('STRIKE ADD')
                        .setDescription(`${message.author} has been stricken`)
                        .addField("Staff:", `[AUTOMOD]`)
                        .addField("Reason:", `[AUTOMOD] Using too many caps: \`\`\`${message.content}\`\`\``)
                        .addField("ID:", `\`${strike.id}\``)
        
                    logChannel.send({embeds: [logEmbed]})
        
                } catch (err) {
                    console.log(err)
                }
        }

    },)}
module.exports.config = {
   dbName: 'AUTOMOD_CAPS',
   displayName: 'Automod-caps',
}