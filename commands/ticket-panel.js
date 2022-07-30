const { Client, Message, MessageEmbed,  MessageButton, MessageActionRow, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'ticket-panel',
    description: "Sends a ticket pannel to a channel.",
    category: "Config",
    permissions: ['ADMINISTRATOR'],
    slash: true,
    guildOnly: true,
    options: [
        {
            name: 'channel',
            description: 'The channel to send the panel in',
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT', 'GUILD_PRIVATE_THREAD', 'GUILD_PUBLIC_THREAD', 'GUILD_NEWS_THREAD', 'GUILD_NEWS'],
            required: true
        },
        {
            name: 'report-a-player-enabled',
            description: 'Choose whether you want this button enabled (Default true)',
            type: 'BOOLEAN',
            required: true
        },
        {
            name: 'report-a-bug-enabled',
            description: 'Choose whether you want this button enabled (Default true)',
            type: 'BOOLEAN',
            required: true
        },
        {
            name: 'send-some-feedback-enabled',
            description: 'Choose whether you want this button enabled (Default true)',
            type: 'BOOLEAN',
            required: true
        },
        {
            name: 'report-a-staff-member-enabled',
            description: 'Choose whether you want this button enabled (Default true)',
            type: 'BOOLEAN',
            required: true
        },
        {
            name: 'other-enabled',
            description: 'Choose whether you want this button enabled (Default true)',
            type: 'BOOLEAN',
            required: true
        },
        {
            name: 'colour',
            description: 'The colour of the embed (Use a hex colour)',
            type: 'STRING',
            required: false
        },
        {
            name: 'title',
            description: 'The title of the embed',
            type: 'STRING',
            required: false
        },
        {
            name: 'description',
            description: 'The description of the embed (use "/n/" for a new line)',
            type: 'STRING',
            required: false
        },

    ],
    callback: async ({interaction}) => {
        const blacklistSchema = require('../models/blacklist-schema')
        const blacklist = await blacklistSchema.findOne({userId: interaction.user.id})
        if (blacklist) {
            return
        }
        const maintenanceSchema = require('../models/mantenance-schema')
        const maintenance = await maintenanceSchema.findOne({maintenance: true})
            if (maintenance && interaction.user.id !== '804265795835265034') {
                return
            }
        const guild = interaction.guild;
        const channel = interaction.options.getChannel('channel')
        let colour = interaction.options.getString('colour') || 'FF3D15'
        let re = /[0-9A-Fa-f]{6}/g
        colour.replaceAll('#', '')

        const button1 = interaction.options.getBoolean('report-a-player-enabled')
        const button2 = interaction.options.getBoolean('report-a-bug-enabled')
        const button3 = interaction.options.getBoolean('send-some-feedback-enabled')
        const button4 = interaction.options.getBoolean('report-a-staff-member-enabled')
        const button5 = interaction.options.getBoolean('other-enabled')

        if (re.test(colour)) {
            const embed = new MessageEmbed()
            .setColor(`0x${colour}`)
            .setDescription(interaction.options.getString('description') ? `${interaction.options.getString('description').replaceAll('/n/', '\n')}` : "__**How to make a ticket**__\n" +
            "> Click on the button that relates to your issue\n" +
            "> Once the ticket is made you will be able to get the help you need\n" +
            "> Do not create a ticket if you don't need help. It will get you punished")
            .setTitle(interaction.options.getString('title') ? `${interaction.options.getString('title')}` : 'Open a ticket')

            const bt = new MessageActionRow()
            if (interaction.options.getBoolean('report-a-player-enabled') === true) {
                bt.addComponents(
                    new MessageButton()
                    .setCustomId('player')
                    .setLabel('Report a player')
                    .setEmoji('<:security:944350352797483059>')
                    .setStyle('SUCCESS'),
                )
            }
            if (interaction.options.getBoolean('report-a-bug-enabled') === true){
                bt.addComponents(
                    new MessageButton()
                    .setCustomId('bug')
                    .setLabel('Report a bug')
                    .setEmoji('<:dnd_status:923209325990801428>')
                    .setStyle('SUCCESS'),
                )
                
            }
            if (interaction.options.getBoolean('send-some-feedback-enabled') === true) {
                bt.addComponents(
                    new MessageButton()
                    .setCustomId('feed')
                    .setLabel('Send some feedback')
                    .setEmoji('<:boost:923209020607717437>')
                    .setStyle('SUCCESS'),
                )
            }
            if (interaction.options.getBoolean('report-a-staff-member-enabled') === true) {
                bt.addComponents(
                    new MessageButton()
                    .setCustomId('staff')
                    .setLabel('Report a staff member')
                    .setEmoji('<:discordstaff:923208049961869343>')
                    .setStyle('DANGER'),
                )
            }
            if (interaction.options.getBoolean('other-enabled') === true) {
                bt.addComponents(
                    new MessageButton()
                    .setCustomId('other')
                    .setLabel('Other')
                    .setEmoji('<:DiscordQuestion:923209094687522906>')
                    .setStyle('SECONDARY'),
                    )
            }
            if (button1 === false && button2 === false && button3 === false && button4 === false && button5 === false) {
                bt.addComponents(
                    new MessageButton()
                    .setCustomId('createATicket')
                    .setLabel('Create a ticket')
                    .setEmoji('✉️')
                    .setStyle('SECONDARY'),
                    )
            }

            interaction.reply({
                custom: true,
                content: 'Panel sent',
                ephemeral: true,
            })
            channel.send({embeds: [embed], components: [bt]}).catch((err) => {})
        } else {
            interaction.reply({content: 'That is not a valid hex', ephemeral: true})
        }
    }
}
