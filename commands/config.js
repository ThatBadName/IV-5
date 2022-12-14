const { MessageEmbed } = require('discord.js')
const setupSchema = require('../models/setup-schema')
const levelrewardSchema = require('../models/levelreward-schema')
const welcomeSchema = require('../models/welcome-schema')

module.exports = {
    name: 'config',
    description: 'Configure the bot',
    category: 'Config',
    slash: true,
    permissions: ['ADMINISTRATOR'],
    guildOnly: true,
    options: [
        {
            name: 'view',
            description: 'View the current setup',
            type: 'SUB_COMMAND'
        },
        {
            name: 'reset',
            description: 'Reset the config',
            type: 'SUB_COMMAND',
        },
        {
            name: 'support-role',
            description: 'Set the support role for ticketing',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'role',
                    description: 'The support role for ticketing',
                    type: 'ROLE',
                    required: true,
                },
            ],
        },
        {
            name: 'support-category',
            description: 'Set the support category for ticketing',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'category',
                    description: 'The category where tickets will be opened',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_CATEGORY'],
                    required: true,
                },
                {
                    name: 'category-closed',
                    description: 'The category where locked tickets will be sent',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_CATEGORY'],
                    required: true,  
                },
            ],
        },
        {
            name: 'suggestion-channel',
            description: 'The channel where all server suggestions will be sent',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'channel',
                    description: 'The channel to send suggestions to',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT'],
                    required: true
                }
            ],
        },
        {
            name: 'log-channel',
            description: 'Set the log channel',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'channel',
                    description: 'The channel',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT'],
                    required: true,
                },
            ],
        },
        {
            name: 'advertising-channel',
            description: 'Set the advertising channel for the server (Will allow invites and large walls of text)',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'channel',
                    description: 'The channel',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT'],
                    required: true,
                },
                {
                    name: 'channel2',
                    description: 'The channel',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT'],
                    required: false,
                },
                {
                    name: 'channel3',
                    description: 'The channel',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT'],
                    required: false,
                },
            ]
        },
        {
            name: 'moderation-code',
            description: 'Set the code required to take a moderation action',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'set',
                    description: 'Set the code',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
        {
            name: 'rankcard',
            description: 'Change the servers levelling display',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'enabled',
                    description: 'Is the rank card enabled',
                    type: 'BOOLEAN',
                    required: true,
                },
            ],
        },
        {
            name: 'appeal-form',
            description: 'Set the appeal form',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'link',
                    description: 'The link to the form',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
        {
            name: 'invite-link',
            description: 'The link users should use to rejoin the server if they are punished',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'link',
                    description: 'The invite link',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
        {
            name: 'welcome-message',
            description: 'Setup the welcome message',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'channel',
                    description: 'The welcome channel',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT'],
                    required: true
                },
                {
                    name: 'message',
                    description: 'The message to send when someone joins the server',
                    type: 'STRING',
                    required: true
                },
            ],
        },
        {
            name: 'welcome-role',
            description: 'Setup the welcome role',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'role',
                    description: 'The role to give when a member joins the server',
                    type: 'ROLE',
                    required: true
                },
            ],
        },
        {
            name: 'welcome-reset',
            description: 'Reset welcome',
            type: 'SUB_COMMAND'
        },
        {
            name: 'enable-logging',
            description: 'Enable and disable logging',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'enabled',
                    description: 'Whether or not it is enabled',
                    type: 'BOOLEAN',
                    required: true
                }
            ]
        },
        {
            name: 'enable-automod',
            description: 'Enable and disable automod',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'enabled',
                    description: 'Whether or not it is enabled',
                    type: 'BOOLEAN',
                    required: true
                }
            ]
        },
        {
            name: 'enable-levelling',
            description: 'Enable and disable levelling',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'enabled',
                    description: 'Whether or not it is enabled',
                    type: 'BOOLEAN',
                    required: true
                }
            ]
        },
        {
            name: 'enable-economy',
            description: 'Enable and disable economy',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'enabled',
                    description: 'Whether or not it is enabled',
                    type: 'BOOLEAN',
                    required: true
                }
            ]
        },
        {
            name: 'enable-ghost-ping-detection',
            description: 'Enable and disable ghost ping detection',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'enabled',
                    description: 'Whether or not it is enabled',
                    type: 'BOOLEAN',
                    required: true
                }
            ]
        },
        {
            name: 'caps-percentage',
            description: 'Customize the amount of caps allowed in a message',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'percentage',
                    description: 'The percentage',
                    type: 'INTEGER',
                    required: true,
                }
            ]
        },
        {
            name: 'spam-threshold',
            description: 'Customize the amount of messages allowed',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'number',
                    description: 'The number',
                    type: 'INTEGER',
                    required: true,
                }
            ]
        },
        {
            name: 'message-length',
            description: 'Customize the amount of characters allowed in a message',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'length',
                    description: 'The length a message is allowed to be',
                    type: 'INTEGER',
                    required: true,
                }
            ]
        },
        {
            name: 'max-mentions',
            description: 'Customize the amount of mentions allowed in a message',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'number',
                    description: 'The number allowed',
                    type: 'INTEGER',
                    required: true,
                }
            ]
        },
        {
            name: 'level',
            description: 'Manage levelling rewards',
            type: 'SUB_COMMAND_GROUP',
            options: [
                {
                    name: 'add-reward',
                    description: 'Add a levelling reward',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'level',
                            description: 'The level required to get this role',
                            type: 'NUMBER',
                            required: true,
                        },
                        {
                            name: 'reward',
                            description: 'The reward for reaching this level',
                            type: 'ROLE',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'remove-reward',
                    description: 'Remove a leveling reward',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'role',
                            description: 'The role to remove',
                            type: 'ROLE',
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
    callback: async({interaction}) => {
        const blacklistSchema = require('../models/blacklist-schema')
        const blacklist = await blacklistSchema.findOne({userId: interaction.user.id})
        if (blacklist) {
            return
        }
        const maintenanceSchema = require('../models/mantenance-schema')
        const maintenance = await maintenanceSchema.findOne({maintenance: true})
            if (maintenance && interaction.user.id !== '804265795835265034') {
                return
            } else {
            
        if (interaction.options.getSubcommand() === 'support-role') {
            const role = interaction.options.getRole('role')
            const roleID = role.id

            const doc = await setupSchema.findOneAndUpdate({
                guildId: interaction.guild.id
            }, {
                supportId: roleID
            })
            if(!doc) {
                await setupSchema.create({guildId: interaction.guild.id})
            }
            interaction.reply({
                content: `Set the support role to <@&${roleID}>`,
                ephemeral: true,
            })
        }

        else if (interaction.options.getSubcommand() === 'support-category') {
            const cat = interaction.options.getChannel('category')
            const catClosed = interaction.options.getChannel('category-closed')
            const catId = cat.id
            const catIdClosed = catClosed.id

            const doc1 = await setupSchema.findOneAndUpdate({
                guildId: interaction.guild.id
            }, {
                supportCatId: catId,
                supportCatIdClosed: catIdClosed

            })
            if(!doc1) {
                await setupSchema.create({guildId: interaction.guild.id})
            }
            interaction.reply({
                content: `Set the support category to <#${catId}>`,
                ephemeral: true,
            })
        }
        else if (interaction.options.getSubcommand() === 'enable-logging') {
            const enabled = interaction.options.getBoolean('enabled')
            const update = await setupSchema.findOneAndUpdate({guildId: interaction.guild.id}, {loggingEnabled: enabled})
            if (!update) {
                await setupSchema.create({guildId: interaction.guild.id, loggingEnabled: true})
            }

            interaction.reply({content: `${enabled === true ? `I have enabled logging` : `I have disabled logging`}`})
        }
        else if (interaction.options.getSubcommand() === 'enable-automod') {
            const enabled = interaction.options.getBoolean('enabled')
            const update = await setupSchema.findOneAndUpdate({guildId: interaction.guild.id}, {automodEnabled: enabled})
            if (!update) {
                await setupSchema.create({guildId: interaction.guild.id, automodEnabled: true})
            }

            interaction.reply({content: `${enabled === true ? `I have enabled automod` : `I have disabled automod`}`})
        }
        else if (interaction.options.getSubcommand() === 'enable-levelling') {
            const enabled = interaction.options.getBoolean('enabled')
            const update = await setupSchema.findOneAndUpdate({guildId: interaction.guild.id}, {levellingEnabled: enabled})
            if (!update) {
                await setupSchema.create({guildId: interaction.guild.id, levellingEnabled: true})
            }

            interaction.reply({content: `${enabled === true ? `I have enabled levelling` : `I have disabled levelling`}`})
        }
        else if (interaction.options.getSubcommand() === 'enable-economy') {
            const enabled = interaction.options.getBoolean('enabled')
            const update = await setupSchema.findOneAndUpdate({guildId: interaction.guild.id}, {economyEnabled: enabled})
            if (!update) {
                await setupSchema.create({guildId: interaction.guild.id, economyEnabled: true})
            }

            interaction.reply({content: `${enabled === true ? `I have enabled economy` : `I have disabled economy`}`})
        }
        else if (interaction.options.getSubcommand() === 'enable-ghost-ping-detection') {
            const enabled = interaction.options.getBoolean('enabled')
            const update = await setupSchema.findOneAndUpdate({guildId: interaction.guild.id}, {ghostPingEnabled: enabled})
            if (!update) {
                await setupSchema.create({guildId: interaction.guild.id, ghostPingEnabled: true})
            }

            interaction.reply({content: `${enabled === true ? `I have enabled ghost ping detection` : `I have disabled ghost ping detection`}`})
        }
        else if (interaction.options.getSubcommand() === 'caps-percentage') {
            const num = interaction.options.getInteger('percentage')
            const update = await setupSchema.findOneAndUpdate({guildId: interaction.guild.id}, {percentage: num})
            if (!update) {
                await setupSchema.create({guildId: interaction.guild.id, percentage: num})
            }

            interaction.reply({content: `I have set the caps percentage to \`${num}\``})
        }
        else if (interaction.options.getSubcommand() === 'spam-threshold') {
            const num = interaction.options.getInteger('number')
            const update = await setupSchema.findOneAndUpdate({guildId: interaction.guild.id}, {spamThresh: num})
            if (!update) {
                await setupSchema.create({guildId: interaction.guild.id, spamThresh: num})
            }

            interaction.reply({content: `I have set the spam threshold to \`${num}\``})
        }
        else if (interaction.options.getSubcommand() === 'message-length') {
            const num = interaction.options.getInteger('length')
            const update = await setupSchema.findOneAndUpdate({guildId: interaction.guild.id}, {messageLength: num})
            if (!update) {
                await setupSchema.create({guildId: interaction.guild.id, messageLength: num})
            }

            interaction.reply({content: `I have set the max message length to \`${num}\``})
        }
        else if (interaction.options.getSubcommand() === 'max-mentions') {
            const num = interaction.options.getInteger('number')
            const update = await setupSchema.findOneAndUpdate({guildId: interaction.guild.id}, {massPingAmount: num})
            if (!update) {
                await setupSchema.create({guildId: interaction.guild.id, massPingAmount: num})
            }

            interaction.reply({content: `I have set the max mentions per message to \`${num}\``})
        }
        else if (interaction.options.getSubcommand() === 'log-channel') {
            const channel = interaction.options.getChannel('channel')

            const update = await setupSchema.findOneAndUpdate({guildId: interaction.guild.id}, {logChannelId: channel.id})
            if (!update) {
                await setupSchema.create({guildId: interaction.guild.id, logChannelId: channel.id})
            }

            interaction.reply({content: `Set the log channel to: ${channel}`})
        }

        else if (interaction.options.getSubcommand() === 'advertising-channel') {
            const channel = interaction.options.getChannel('channel')
            const channel2 = interaction.options.getChannel('channel2') || channel
            const channel3 = interaction.options.getChannel('channel3') || channel

            const update = await setupSchema.findOneAndUpdate({guildId: interaction.guild.id}, {advertisingChannelId: channel.id, advertisingChannelId2: channel2.id, advertisingChannelId3: channel3.id})
            if (!update) {
                await setupSchema.create({guildId: interaction.guild.id, advertisingChannelId: channel.id, advertisingChannelId2: channel2.id, advertisingChannelId3: channel3.id})
            }

            interaction.reply({content: `Set the advertising channel to: ${channel}`})
        }
        else if (interaction.options.getSubcommand() === 'invite-link') {
                const link = interaction.options.getString('link')
    
                const update = await setupSchema.findOneAndUpdate({
                    guildId: interaction.guild.id
                }, {
                    guildInvite: link
                })
                if(!update) {
                    await setupSchema.create({guildId: interaction.guild.id, guildInvite: link})
                }
                interaction.reply({content: `Set the invite to: ${link}`})
        }
        else if (interaction.options.getSubcommand() === 'appeal-form') {
                const link = interaction.options.getString('link')
                const update = await setupSchema.findOneAndUpdate({
                    guildId: interaction.guild.id
                }, {
                    guildAppeal: link
                })
                if(!update) {
                    await setupSchema.create({guildId: interaction.guild.id, guildAppeal: link})
                }
                interaction.reply({content: `Set the appeal form to: ${link}`})
        }
        else if (interaction.options.getSubcommand() === 'view') {
            const doc = await setupSchema.findOne({
                guildId: interaction.guild.id
            })
            const doc2 = await welcomeSchema.findOne({guildId: interaction.guild.id})
            if (!doc2) {
                welcomeSchema.create({guildId: interaction.guild.id})
                return `I couldn't find this server in my database. Please try again`
            }
            if (!doc) {
                setupSchema.create({guildId: interaction.guild.id})
                return `I couldn't find this server in my database. Please try again`
            }

            const rewards = await levelrewardSchema.find({guildId: interaction.guild.id})
            if (!rewards) {
                levelrewardSchema.create({guildId: interaction.guild.id})
                return `I couldn't find this server in my database. Please try again`
            }

            var description = `**Level Rewards**\n`
            for (const reward of rewards) {
                description += `Level ${reward.level} - ${reward.role}\n`
            }

            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Bot Settings')
            .setDescription(description)
            .setFields(
                {name: `Support Role`, value: `${doc.supportId ? `<@&${doc.supportId}>` : 'None'}`, inline: true},
                {name: `Support Category Open`, value: `${doc.supportCatId ? `<#${doc.supportCatId}>` : 'None'}`, inline: true},
                {name: `Support Category Closed`, value: `${doc.supportCatIdClosed ? `<#${doc.supportCatIdClosed}>` : 'None'}`, inline: true},
                {name: 'Moderation Code', value: `${doc.code ? `\`${doc.code}\`` : 'None'}`, inline: true},
                {name: 'Rank Card Enabled', value: `${doc.rankCard ? 'Yes' : 'No'}`, inline: true},
                {name: 'Server Invite', value: `${doc.guildInvite || 'None'}`, inline: true},
                {name: 'Server Appeal Form', value: `${doc.guildAppeal || 'None'}`},
                {name: 'Welcome Channel', value: `${doc2.wcId ? `<#${doc2.wcId}>` : 'None'}`, inline: true},
                {name: 'Welcome Role', value: `${doc2.wrId ? `<@&${doc2.wrId}>` : 'None'}`, inline: true},
                {name: 'Suggestions Channel', value: `${doc.suggestionChannelId ? `<#${doc.suggestionChannelId}>` : 'None'}`, inline: true},
                {name: 'Log Channel', value: `${doc.logChannelId ? `<#${doc.logChannelId}>` : 'None'}`, inline: true},
                {name: 'Advertising Channel 1', value: `${doc.advertisingChannelId ? `<#${doc.advertisingChannelId}>` : 'None'}`, inline: true},
                {name: 'Advertising Channel 2', value: `${doc.advertisingChannelId2 ? `<#${doc.advertisingChannelId2}>` : 'None'}`, inline: true},
                {name: 'Advertising Channel 3', value: `${doc.advertisingChannelId3 ? `<#${doc.advertisingChannelId3}>` : 'None'}`, inline: true},
                {name: 'Logging enabled', value: `${doc.loggingEnabled ? `${doc.loggingEnabled}` : 'True'}`, inline: true},
                {name: 'Automod enabled', value: `${doc.automodEnabled ? `${doc.automodEnabled}` : 'True'}`, inline: true},
                {name: 'Levelling enabled', value: `${doc.automodEnabled ? `${doc.automodEnabled}` : 'True'}`, inline: true},
                {name: 'Economy enabled', value: `${doc.automodEnabled ? `${doc.automodEnabled}` : 'True'}`, inline: true},
                {name: 'Ghost Ping Detection enabled', value: `${doc.ghostPingEnabled ? `${doc.ghostPingEnabled}` : 'True'}`, inline: true},
                {name: 'Caps Percentage', value: `${doc.percentage ? `${doc.percentage}` : 'Not set'}`, inline: true},
                {name: 'Max Mentions', value: `${doc.massPingAmount ? `${doc.massPingAmount}` : 'Not set'}`, inline: true},
                {name: 'Max Message Length', value: `${doc.messageLength ? `${doc.messageLength}` : 'Not set'}`, inline: true},
                {name: 'Spam threshold', value: `${doc.spamThresh ? `${doc.spamThresh}` : 'Not set'}`, inline: true},
                {name: 'Welcome Message', value: `${doc2.message ? `${doc2.message}` : 'None'}`, inline: false},
            )

            return embed
        }
        else if (interaction.options.getSubcommand() === 'rankcard') {
            const doc = await setupSchema.findOneAndUpdate({
                guildId: interaction.guild.id
            }, {
                rankCard: interaction.options.getBoolean('enabled')
            })
            if(!doc) {
                await setupSchema.create({guildId: interaction.guild.id})
            }
            interaction.reply({
                content: `Rank card set to: ${interaction.options.getBoolean('enabled')}`,
                ephemeral: true,
            })
        }
        else if (interaction.options.getSubcommand() === 'suggestion-channel') {
            const channel = interaction.options.getChannel('channel')
            const doc = await setupSchema.findOneAndUpdate({
                guildId: interaction.guild.id
            }, {
                suggestionChannelId: channel.id
            })
            if(!doc) {
                await setupSchema.create({guildId: interaction.guild.id, suggestionChannelId: channel.id})
            }
            interaction.reply({
                content: `Suggestions will be sent to ${channel}`,
                ephemeral: true,
            })
        }
        else if (interaction.options.getSubcommand() === 'moderation-code') {
            const newCode = interaction.options.getString('set')

            const doc = await setupSchema.findOneAndUpdate({
                guildId: interaction.guild.id
            }, {
                code: newCode,
            })
            if(!doc) {
                await setupSchema.create({guildId: interaction.guild.id, code: '0000'})
            }
            interaction.reply({
                content: `The moderation code has been updated to ||\`${newCode}\`||. It used to be ||\`${doc.code}\`||`,
                ephemeral: true,
            })
        }

        else if (interaction.options.getSubcommand() === 'reset') {
            const result = await setupSchema.findOne({guildId: interaction.guild.id})
            const result2 = await welcomeSchema.findOne({guildId: interaction.guild.id})
            if (result) {
                result.delete()
                result2.delete()
                levelrewardSchema.collection.deleteMany({guildId: interaction.guild.id})
                return 'Reset the config data'
            } else {
                return `There was no config set`
            }
        }
        else if (interaction.options.getSubcommand() === 'welcome-message') {
            const result = await welcomeSchema.findOne({guildId: interaction.guild.id})
            const channel = interaction.options.getChannel('channel')
            const message = interaction.options.getString('message')
            if (!result) {
                await welcomeSchema.create({
                    guildId: interaction.guild.id,
                    wcId: channel.id,
                    message: message
                })
                interaction.reply({content: 'Setup welcome message'})
            } else {
                await result.updateOne({wcId: channel.id || result.wcId, message: message || result.message})
                interaction.reply({content: 'Updated welcome message'})
            }
        }
        else if (interaction.options.getSubcommand() === 'welcome-role') {
            const result = await welcomeSchema.findOne({guildId: interaction.guild.id})
            const role = interaction.options.getRole('role')
            if (!result) {
                await welcomeSchema.create({
                    guildId: interaction.guild.id,
                    wrId: role.id,
                })
                interaction.reply({content: 'Setup welcome role'})
            } else {
                await result.updateOne({wrId: role.id || result.wrId})
                interaction.reply({content: 'Updated welcome role'})
            }
        }
        else if (interaction.options.getSubcommand() === 'welcome-reset') {
            const result = await welcomeSchema.findOne({guildId: interaction.guild.id})
            result.delete()
            interaction.reply({content: 'Reset all welcome stuff'})
        }



        else if (interaction.options.getSubcommandGroup() === 'level') {
            if (interaction.options.getSubcommand() === 'add-reward') {
                levelrewardSchema.create({
                    guildId: interaction.guild.id,
                    level: interaction.options.getNumber('level'),
                    role: interaction.options.getRole('reward')
                })
                interaction.reply({content: `Level ${interaction.options.getNumber('level')} will reward ${interaction.options.getRole('reward')}`, ephemeral: true})
            } else {
                const result = await levelrewardSchema.findOne({guildId: interaction.guild.id, role: interaction.options.getRole('role')})
                if (!result) {
                    return `Could not find a level reward with that role`
                }
                result.delete()
                return `Deleted that level reward`
            }
        }
    }
}
}