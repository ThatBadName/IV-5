const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js')
const roleMsgSchema = require('../models/roleMsg-schema')
const buttonStyles = ['primary', 'secondary', 'success', 'danger']
const prefix = 'button-roles-'

module.exports = {
name: 'buttonrole',
aliases: [''],
description: 'Manage this servers button roles',
category: 'Config',
slash: true,
ownerOnly: false,
guildOnly: true,
permissions: ['ADMINISTRATOR'],
options: [
    {
        name: 'message-create',
        description: 'Send the button role message',
        type: 'SUB_COMMAND',
        options: [
            {
                name: 'message',
                description: 'The message to send',
                type: 'STRING',
                required: true
            },
            {
                name: 'channel',
                description: 'The channel to send the message in',
                type: 'CHANNEL',
                channelTypes: ['GUILD_TEXT'],
                required: true,
            },
        ],
    },
    {
        name: 'message-delete',
        description: 'Delete the existing role message',
        type: 'SUB_COMMAND',
    },
    {
        name: 'role-add',
        description: 'Add a role to the message',
        type: 'SUB_COMMAND',
        options: [
            {
                name: 'role',
                description: 'The role to add',
                type: 'ROLE',
                required: true,
            },
            // {
            //     name: 'emoji',
            //     description: 'The emoji to go with the button',
            //     type: 'STRING',
            //     required: true,
            // },
            {
                name: 'button-style',
                description: 'The style of the button',
                type: 'STRING',
                choices: buttonStyles.map((style) => ({
                    name: style,
                    value: style.toUpperCase(),
                })),
                required: true
            },
            {
                name: 'button-label',
                description: 'The label on the button',
                type: 'STRING',
                required: true,
            },
            {
                name: 'messageid',
                description: 'The ID of the message to add the role to (MUST BE SENT BY THE BOT)',
                type: 'STRING',
                required: false,
            },
        ],
    },
    {
        name: 'remove-roles',
        description: 'Remove all the buttom roles from a message',
        type: 'SUB_COMMAND',
        options: [
            {
                name: 'messageid',
                description: 'The ID of the message to add the role to (MUST BE SENT BY THE BOT)',
                type: 'STRING',
                required: true,
            },
            {
                name: 'role',
                description: 'The role to remove from the message',
                type: 'ROLE',
                required: false
            },
        ],
    },
],

init: async(client) => {
    client.on("interactionCreate", async (interaction, message) => {
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

        if (!interaction.isButton()) return
        const { guild, customId } = interaction
        if (!guild || !customId.startsWith(prefix)) return

        const roleId = customId.replace(prefix, '')
        const member = interaction.member
        if (member.roles.cache.has(roleId)) {
            member.roles.remove(roleId).catch(err => {interaction.reply({content: 'There was an error while removing this role', ephemeral: true})})

            const embedRemove = new MessageEmbed()
            .setColor('RED')
            .setTitle('Removed a role')
            .setDescription(`I have removed the <@&${roleId}> role from you`)
            interaction.reply({embeds: [embedRemove], ephemeral: true})
        } else {
            member.roles.add(roleId).catch(err => {interaction.reply({content: 'There was an error while adding this role', ephemeral: true})})

            const embedAdd = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Added a role')
            .setDescription(`I have given the <@&${roleId}> role to you`)
            interaction.reply({embeds: [embedAdd], ephemeral: true})
        }
    }
    })
},
callback: async({guild, interaction}) => {
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

    if (interaction.options.getSubcommand() === 'message-create') {
        const msg = interaction.options.getString('message')
        const channel = interaction.options.getChannel('channel')
        const result = await roleMsgSchema.findOne({guildId: guild.id})

        if (result) {
            return 'This server already has a button message setup. To make a new one please delete it'
        }

        const sentMsg = await channel.send(msg)

        await new roleMsgSchema({
            guildId: guild.id,
            channelId: channel.id,
            messageId: sentMsg.id
        }).save()

    interaction.reply({content: 'Sent message', ephemeral: true})
    } else if (interaction.options.getSubcommand() === 'role-add') {

        if (interaction.options.getString('messageid')) {

            const channelId = interaction.channel.id
            const messageId = interaction.options.getString('messageid')

            let role = interaction.options.getRole('role')
            const buttonStyle = interaction.options.getString('button-style')
            const buttonLabel = interaction.options.getString('button-label')
            const channel = guild.channels.cache.get(channelId)
            const roleMessage = await channel.messages.fetch(messageId).catch(err => {interaction.reply('No message set').then(e => {})})

            const rows = roleMessage.components
            const button = new MessageButton()
            .setLabel(buttonLabel)
            .setStyle(buttonStyle)
            .setCustomId(`${prefix}${role.id}`)
            let added = false

            for (const row of rows) {
                if (row.components.length < 5) {
                    row.addComponents(button)
                    added = true
                    break
                }
            }

            if (!added) {
                if (rows.length >= 5) {
                    return 'Cannot add more buttons to this message lol'
                }

                rows.push(new MessageActionRow().addComponents(button))
            }

            roleMessage.edit({components: rows})
            return {
                custom: true,
                content: 'Added button to role message',
                ephemeral: true,
            }
        } else {
            const data = await roleMsgSchema.findOne({guildId: guild.id})
            if(!data) return 'No message set.'

            const { channelId, messageId } = data

            let role = interaction.options.getRole('role')
            const buttonStyle = interaction.options.getString('button-style')
            const buttonLabel = interaction.options.getString('button-label')
            const channel = guild.channels.cache.get(channelId)
            const roleMessage = await channel.messages.fetch(messageId).catch(err => {interaction.reply('No message set').then(e => {})})

            const rows = roleMessage.components
            const button = new MessageButton()
            .setLabel(buttonLabel)
            .setStyle(buttonStyle)
            .setCustomId(`${prefix}${role.id}`)
            let added = false

            for (const row of rows) {
                if (row.components.length < 5) {
                    row.addComponents(button)
                    added = true
                    break
                }
            }

            if (!added) {
                if (rows.length >= 5) {
                    return 'Cannot add more buttons to this message lol'
                }

                rows.push(new MessageActionRow().addComponents(button))
            }

            return {
                custom: true,
                content: 'Added button to role message',
                ephemeral: true,
            }
        }
    } else if (interaction.options.getSubcommand() === 'message-delete') {
        const data = await roleMsgSchema.findOneAndDelete({guildId: interaction.guild.id})
        if (!data) {
            return 'There was no message set'
        } else {
            return 'Removed the message. You may want to delete it to stop the roles from working'
        }
    } else if (interaction.options.getSubcommand() === 'remove-roles') {
            const channelId = interaction.channel.id
            const messageId = interaction.options.getString('messageid')

            const channel = guild.channels.cache.get(channelId)
            const roleMessage = await channel.messages.fetch(messageId).catch(err => {interaction.reply({content: 'Could not find this message', ephemeral: true}).then(e => {})})

            if (interaction.options.getRole('role')) {
                let added = false
                const role = interaction.options.getRole('role')
                const buttons = roleMessage.components[0].components.map(c => c.customId + ' ' + c.style + ' ' + c.label)
                const buttonArray = genButtonArray(buttons, role)
                if (buttonArray.length === buttons.length) return interaction.reply({embeds: [new MessageEmbed().setColor('0xff0000').setTitle('This message does have that button')]})
                const newButtons = new MessageActionRow()
                let newButtonsArray = []
                console.log(buttonArray)
                for (let i = 0; i < buttonArray.length; i =+ 25) {
                    k = 25
                    let current = buttonArray.slice(i, k)
                    current.map(button => {
                        const buttonInfo = button.trim().split(/\s+/)
                        console.log(buttonInfo)
                        const buttonCreate = new MessageButton()
                        .setCustomId(buttonInfo[0])
                        .setStyle(buttonInfo[1])
                        .setLabel(buttonInfo[2])
                        console.log(buttonCreate)

                        for (const row of roleMessage.components) {
                                row.addComponents(buttonCreate)
                                added = true
                                break
                        }
                        if (!added) {
                            if (newButtons.length >= 5) {
                                return interaction.reply({embeds: [new MessageEmbed().setTitle('There was an error while doing this')], ephemeral: true})
                            }
            
                            newButtonsArray.push(newButtons.addComponents(newButtons))
                            return newButtonsArray
                        }
                        
                    })
                }

                interaction.reply({embeds: [new MessageEmbed().setTitle('Removed a role from the menu').setDescription(`I have removed the ${role} from this menu`)]})
                console.log('new buttons array\n\n' + newButtonsArray + '\n\n-------------------------------')
                console.log('new buttons\n\n' + newButtons + '\n\n-------------------------------')
                roleMessage.edit({components: [buttonArray]})
                function genButtonArray(buttons, role) {
                    let buttonArray = []
                    let hasRole = false
                    k = 25
                    for (let i = 0; i < buttons.length; i += 25) {
                        let current = buttons.slice(i, k)
                        current.map(button => {
                            if (button.includes(role.id)) {
                                hasRole = true
                            } else {
                                if (hasRole !== true) hasRole = false
                                buttonArray.push(button)
                            }
                        })
                    }
                    return buttonArray
                }

            } else {
                roleMessage.edit({components: []})
                return interaction.reply({
                    custom: true,
                    content: 'Removed all roles from role message',
                    ephemeral: true,
                })
            }
    }
}
}
}