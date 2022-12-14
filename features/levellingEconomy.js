const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const levelrewardSchema = require('../models/levelreward-schema')
const levelSchema = require('../models/leveling-schema')
const maintenanceSchema = require('../models/mantenance-schema')
const blacklistSchema = require('../models/blacklist-schema')
const balanceSchema = require('../models/balance-schema')
const boosterSchema = require('../models/boost-schema')
const setupSchema = require('../models/setup-schema')
const today = new Date()

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        const maintenance = await maintenanceSchema.findOne({maintenance: true})
        if (maintenance && message.author.id !== '804265795835265034') {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setStyle('LINK')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=919242400738730005&permissions=1642824465782&scope=bot%20applications.commands')
                    .setLabel('Invite Me')
                )
                .addComponents(
                    new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Support Server')
                    .setURL('https://discord.gg/hK3gEQ2XUf')
                )
                .addComponents(
                    new MessageButton()
                    .setStyle('LINK')
                    .setURL('https://thatbadname.gitbook.io/iv-5-docs/')
                    .setLabel('Documentation')
                )
            if (message.content.startsWith('<@980386075014991912>')) message.reply({content: `The bot is currently down for maintenance. You are not able to run any commands other than \`/info\`.\nReason for maintenance:\`\`\`fix\n${maintenance.maintenanceReason}\n\`\`\``, components: [row]})
            return
        }
        const blacklist = await blacklistSchema.findOne({userId: message.author.id})
        if (blacklist) {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setStyle('LINK')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=919242400738730005&permissions=1642824465782&scope=bot%20applications.commands')
                    .setLabel('Invite Me')
                )
                .addComponents(
                    new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Support Server')
                    .setURL('https://discord.gg/hK3gEQ2XUf')
                )
                .addComponents(
                    new MessageButton()
                    .setStyle('LINK')
                    .setURL('https://thatbadname.gitbook.io/iv-5-docs/')
                    .setLabel('Documentation')
                )
            if (message.content.startsWith('<@980386075014991912>')) message.reply({content: `You are blacklisted from using the bot. You can only run the \`/info\` command.\n\nReason:\`\`\`fix\n${blacklist.reason}\n\`\`\``, components: [row]})
            return
        }
        
        if(message.channel.type === 'DM') return; 
        if(message.author.bot) return;
        const checkEnabledLevelling = await setupSchema.findOne({guildId: message.guild.id, levellingEnabled: true})
        const checkEnabledEconomy = await setupSchema.findOne({guildId: message.guild.id, economyEnabled: true})
    if (message.content.startsWith('<@980386075014991912>')) {
        const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setStyle('LINK')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=919242400738730005&permissions=1642824465782&scope=bot%20applications.commands')
                    .setLabel('Invite Me')
                )
                .addComponents(
                    new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Support Server')
                    .setURL('https://discord.gg/hK3gEQ2XUf')
                )
                .addComponents(
                    new MessageButton()
                    .setStyle('LINK')
                    .setURL('https://thatbadname.gitbook.io/iv-5-docs/')
                    .setLabel('Documentation')
                )

        const pingEmbed = new MessageEmbed()
        .setTitle(`I'm IV-4 (But better)`)
        .setDescription('If you need any help with the bot please join the [Support Server](https://discord.gg/hK3gEQ2XUf) or read the [Docs](https://thatbadname.gitbook.io/iv-4-docs/)')
        .setFields({
            name: 'Where are my commands?',
            value: 'I use /commands. Type `/` and you can see a list of them',
            inline: true,
        })
        .setColor('RANDOM')
        .setFooter({text: 'This message will only appear if your message starts with my tag'})
        message.reply({embeds: [pingEmbed], components: [row]})
        return
    }

    const checkBal = await balanceSchema.findOne({guildId: message.guild.id, userId: message.author.id})
    const checkLvl = await levelSchema.findOne({guildId: message.guild.id, userId: message.author.id})

    if (!checkBal || !checkLvl) {
        if (!checkBal && checkEnabledEconomy) {
            balanceSchema.create({
                guildId: message.guild.id,
                userId: message.author.id,
                amount: 0,
                bankAmount: 0
                })
        }
        if (!checkLvl && checkEnabledLevelling) {
            levelSchema.create({
                guildId: message.guild.id,
                userId: message.author.id,
                xp: 0,
                level: 0,
                role: 0
                })
        }
        return
    }

    if (checkEnabledEconomy) {
        balanceSchema.findOne({guildId: message.guild.id, userId: message.author.id}, async(err, doc)=>{
            if(!doc) {
            balanceSchema.create({
            guildId: message.guild.id,
            userId: message.author.id,
            amount: 0,
            bankAmount: 0
            })
            return
            }
            
            });
                    const give = Math.floor(Math.random() * 20)
                    const data = await balanceSchema.findOne({
                        guildId: message.guild.id,
                        userId: message.author.id
                    });
                        data.amount += give;
                        data.save();
    }
    if (checkEnabledLevelling) {
        const boost = await boosterSchema.findOne({guildId: message.guild.id, userId: message.author.id, type: 'xp'})

        levelSchema.findOne({guildId: message.guild.id, userId: message.author.id}, async(err, result)=>{
            if(!result) {
            levelSchema.create({
            guildId: message.guild.id,
            userId: message.author.id,
            xp: 0,
            level: 0,
            role: 0
            })
            return
            }
            
            });
            //console.log(today.getDay())
    
            if (boost) {

                if(today.getDay() == 6 || today.getDay() == 0) {
                        const give = Math.floor((Math.random() * 10) + 1) * boost.strength
                        //console.log(give, `mult`)
                        const data = await levelSchema.findOne({
                            guildId: message.guild.id,
                            userId: message.author.id
                        });
    
                        const requiredXp = data.level * 250 + 100
                        const xpBoosterWeekendEmbed = new MessageEmbed()
                        .setTitle('Level Up')
                        .setDescription(`${message.author}, You have leveled up to **Level ${data.level ? data.level + 1 : '1'}**`)
                        .setColor('RANDOM')
                        .setFooter({text: `Booster | Weekend XP booster`})

                        if (data.xp + give >= requiredXp) {
                            data.xp = 0;
                            data.level += 1
                            data.save()
                            message.channel.send({embeds: [xpBoosterWeekendEmbed]})
                        } else {
                            data.xp += give;
                            data.save();
                        }
                        const nextRoleCheck = await levelrewardSchema.findOne({guildId: message.guild.id, level: data.level})
                        if (nextRoleCheck) {
                            const levelRole = nextRoleCheck.role.replace(/[<@!&>]/g, '')
                            const userLevel = await levelSchema.findOne({guildId: message.guild.id, userId: message.author.id})
                            const prevRoleId = userLevel.role
                            if (message.member.roles.cache.has(levelRole)) {
                                return
                            } else {
                                message.member.roles.remove(prevRoleId).catch((err => {}))
                                message.member.roles.add(levelRole)
                            
                                userLevel.role = levelRole
                                userLevel.save()
                            }
                        }
                } else {
                        const give = Math.floor(Math.random() * 5) + 1 * boost.strength
                        //console.log(give, `norm`)
                        const data = await levelSchema.findOne({
                            guildId: message.guild.id,
                            userId: message.author.id
                        });
    
                        const requiredXp = data.level * 250 + 100
                        const xpBoosterEmbed = new MessageEmbed()
                        .setTitle('Level Up')
                        .setDescription(`${message.author}, You have leveled up to **Level ${data.level ? data.level + 1 : '1'}**`)
                        .setColor('RANDOM')
                        .setFooter({text: `Booster`})
                        if (data.xp + give >= requiredXp) {
                            data.xp = 0;
                            data.level += 1
                            data.save()
                            message.channel.send({embeds: [xpBoosterEmbed]})
                        } else {
                            data.xp += give;
                            data.save();
                        }
                        const nextRoleCheck = await levelrewardSchema.findOne({guildId: message.guild.id, level: data.level})
                        if (nextRoleCheck) {
                            const levelRole = nextRoleCheck.role.replace(/[<@!&>]/g, '')
                            const userLevel = await levelSchema.findOne({guildId: message.guild.id, userId: message.author.id})
                            const prevRoleId = userLevel.role
                            if (message.member.roles.cache.has(levelRole)) {
                                return
                            } else {
                                message.member.roles.remove(prevRoleId).catch((err => {}))
                                message.member.roles.add(levelRole)
                            
                                userLevel.role = levelRole
                                userLevel.save()
                            }
                        }
                }

            } else {
                if(today.getDay() == 6 || today.getDay() == 0) {
                        const give = Math.floor(Math.random() * 10) + 1
                        //console.log(give, `mult`)
                        const data = await levelSchema.findOne({
                            guildId: message.guild.id,
                            userId: message.author.id
                        });
    
                        const requiredXp = data.level * 250 + 100
                        const xpWeekendEmbed = new MessageEmbed()
                        .setTitle('Level Up')
                        .setDescription(`${message.author}, You have leveled up to **Level ${data.level ? data.level + 1 : '1'}**`)
                        .setColor('RANDOM')
                        .setFooter({text: `Weekend XP booster`})
                        if (data.xp + give >= requiredXp) {
                            data.xp = 0;
                            data.level += 1
                            data.save()
                            message.channel.send({embeds: [xpWeekendEmbed]})
                        } else {
                            data.xp += give;
                            data.save();
                        }
                        const nextRoleCheck = await levelrewardSchema.findOne({guildId: message.guild.id, level: data.level})
                        if (nextRoleCheck) {
                            const levelRole = nextRoleCheck.role.replace(/[<@!&>]/g, '')
                            const userLevel = await levelSchema.findOne({guildId: message.guild.id, userId: message.author.id})
                            const prevRoleId = userLevel.role
                            if (message.member.roles.cache.has(levelRole)) {
                                return
                            } else {
                                message.member.roles.remove(prevRoleId).catch((err => {}))
                                message.member.roles.add(levelRole)
                            
                                userLevel.role = levelRole
                                userLevel.save()
                            }
                        }
                } else {
                        const give = Math.floor(Math.random() * 5) + 1
                        const data = await levelSchema.findOne({
                            guildId: message.guild.id,
                            userId: message.author.id
                        });
    
                        const requiredXp = data.level * 250 + 100
                        const xpEmbed = new MessageEmbed()
                        .setTitle('Level Up')
                        .setDescription(`${message.author}, You have leveled up to **Level ${data.level ? data.level + 1 : '1'}**`)
                        .setColor('RANDOM')
                        if (data.xp + give >= requiredXp) {
                            data.xp = 0;
                            data.level += 1
                            data.save()
                            message.channel.send({embeds: [xpEmbed]})
                        } else {
                            data.xp += give;
                            data.save();
                        }
                        const nextRoleCheck = await levelrewardSchema.findOne({guildId: message.guild.id, level: data.level})
                        if (nextRoleCheck) {
                            const levelRole = nextRoleCheck.role.replace(/[<@!&>]/g, '')
                            const userLevel = await levelSchema.findOne({guildId: message.guild.id, userId: message.author.id})
                            const prevRoleId = userLevel.role
                            if (message.member.roles.cache.has(levelRole)) {
                                return
                            } else {
                                message.member.roles.remove(prevRoleId).catch((err => {}))
                                message.member.roles.add(levelRole)
                            
                                userLevel.role = levelRole
                                userLevel.save()
                            }
                        }
                        
                    }
                }
    }
})
}
module.exports.config = {
dbName: 'Levelling',
displayName: 'Levelling and economy'
}