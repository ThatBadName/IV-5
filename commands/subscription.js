const premiumGuildSchema = require('../models/premiumGuild-schema')
const premiumCodeSchema = require('../models/premiumCode-schema')
const premiumTimeoutSchema = require('../models/premiumExpiredTimeout-schema')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
name: 'subscription',
description: 'Manage your premium subscription',
category: 'Misc',
slash: true,
ownerOnly: false,
guildOnly: true,
testOnly: false,
options: [
    {
        name: 'redeem',
        description: 'Redeem a premium code',
        type: 'SUB_COMMAND',
        options: [
            {
                name: 'code',
                description: 'Enter the premium code',
                type: 'STRING',
                required: true
            },
        ],
    },
    {
        name: 'view',
        description: 'View your premium status',
        type: 'SUB_COMMAND'
    }
],
cooldown: '',
requireRoles: false,
permissions: ['SEND_MESSAGES'],

callback: async({interaction, guild}) => {
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

    if (interaction.options.getSubcommand() === 'redeem') {
        if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({embeds: [new MessageEmbed().setTitle('You do not have permission to use this')], ephemeral: true})
        let code = interaction.options.getString('code')

        let guild = await premiumGuildSchema.findOne({guildId: interaction.guild.id})

        const alreadyPremiumEmbed = new MessageEmbed()
        .setTitle('Could not give premium')
        .setDescription('This server is already premium')
        .setColor('RED')

        const invalidCodeEmbed = new MessageEmbed()
        .setTitle('Invalid code')
        .setDescription(`\`${code.toUpperCase()}\` is not a valid code. Please try again with a valid code`)
        .setColor('RED')

        if (guild) return interaction.reply({embeds: [alreadyPremiumEmbed]})

        const premiumCode = await premiumCodeSchema.findOne({code: code.toUpperCase()})
        if (!premiumCode) return interaction.reply({embeds: [invalidCodeEmbed]})

        const plan = premiumCode.plan
        const date = new Date()
        let time
        if (plan === 'daily') time = 1440
        if (plan === 'weekly') time = 60 * 24 * 7
        if (plan === 'monthly') time = 60 * 24 * 30
        if (plan === 'yearly') time = 60 * 24 * 365
        const duration = date.setMinutes(date.getMinutes() + time)

        const successEmbed = new MessageEmbed()
        .setTitle('You have claimed a code!')
        .setFields({
            name: 'Plan',
            value: `\`${premiumCode.plan}\``
        }, {
            name: 'Expires',
            value: `This servers premium will expire <t:${Math.round(duration / 1000)}:R>`
        }, {
            name: 'Code',
            value: `\`${code.toUpperCase()}\``
        })
        .setDescription(`Invite the premium bot [here](https://discord.com/api/oauth2/authorize?client_id=980386075014991912&permissions=1644971949559&scope=bot%20applications.commands)`)
        .setColor('GOLD')

        const confirmEmbed = new MessageEmbed()
        .setTitle('Are you sure?')
        .setDescription(`Are you 100% sure that you want to claim premium in the server **${interaction.guild.name}**`)
        .setFooter({text: `If you click confirm and it is the wrong server you WILL NOT get a refund`})
        .setColor('RED')

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('yesPremium')
            .setLabel('Confirm')
            .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('noPremium')
            .setLabel('Cancel')
            .setStyle('DANGER')
        )

        const cancelEmbed = new MessageEmbed()
        .setTitle('Canceled')
        .setDescription(`Premium has not been added to this server. The code is still valid`)
        .setColor('RED')

        const message = await interaction.reply({embeds: [confirmEmbed], components: [row], fetchReply: true, ephemeral: true})

        const filter = i => i.customId === 'yesPremium' || i.customId === 'noPremium' && i.user.id === interaction.user.id
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 })

        let collected = false

        collector.on('collect', async(i) => {
            if (i.customId === 'yesPremium') {
                if (i.user.id !== interaction.user.id) return
                const check = await premiumTimeoutSchema.findOne({guildId: interaction.guild.id})
                await premiumGuildSchema.create({
                    guildId: interaction.guild.id,
                    expires: duration
                })
                i.reply({embeds: [successEmbed], components: [], ephemeral: true})
                premiumCode.delete()
                collected = true
                collector.stop()
                if (!check) return
                check.delete()
            } else if (i.customId === 'noPremium') {
                if (i.user.id !== interaction.user.id) return
                i.reply({embeds: [cancelEmbed], components: [], ephemeral: true})
                collected = true
                collector.stop()
            }
        })
        collector.on('end' , async(i) => {
            if (collected = false) {
                i.reply({embeds: [cancelEmbed], components: [], ephemeral: true})
            }
        })
    } else if (interaction.options.getSubcommand() === 'view') {
        const result = await premiumGuildSchema.findOne({guildId: interaction.guild.id})
        interaction.reply({
            ephemeral: true,
            embeds: [new MessageEmbed()
            .setColor('GOLD')
            .setTitle('Premium Status')
            .setDescription(`**Premium:**\n${result ? `This server has premium. It expires <t:${Math.round(result.expires.getTime() / 1000)}:R>` : `This server does not have premium`}`)]
        })
    }
}
}