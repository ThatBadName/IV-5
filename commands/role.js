const { CommandInteraction, MessageEmbed } = require("discord.js");
const tempRoleSchema = require('../models/tempRole-schema')

module.exports = {
    name: "role",
    description: "Manage a user's roles.",
    category: 'Moderation',
    permissions: ["MANAGE_ROLES"],
    slash: true,
    guildOnly: true,
    options: [
        {
            name: "role",
            description: "Provide a role to add or remove.",
            type: "ROLE",
            required: true,
        },
        {
            name: "target",
            description: "Provide a user to manage.",
            type: "USER",
            required: false,
        },
        {
            name: 'duration',
            description: 'How long to give this role for (m=minutes, h=hours, d=days, w=weeks, m=months)',
            type: 'STRING',
            required: false
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
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
            }
        
        const { options } = interaction;
        const role = options.getRole("role");
        const target = options.getMember("target") || interaction.member;
        const embed = new MessageEmbed()
            .setColor(`#${interaction.guild.roles.cache.get(role.id).color.toString(16)}`)

        if (!role.editable || role.position === 0) {
            embed.setDescription(`I cannot give/remove ${role}`)
            .setTitle('Error')
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }
        if (role.position >= interaction.member.roles.highest.position) {
            embed.setDescription(`You do not have permission to give/remove ${role}`)
            .setTitle('Error')
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if (!target.roles.cache.has(role.id) && interaction.options.getString('duration')) {
            const duration = interaction.options.getString('duration')

            let time
            let type
            try {
                const split = duration.match(/\d+|\D+/g)
                time = parseInt(split[0])
                type = split[1].toLowerCase()

            } catch (e) {
                return "Invalid time format. Example format: \"10d\" where 'w' = weeks, 'd' = days, 'h = hours and 'm' = minutes"
            }

            if (type === 'w') {
                time *= 60 * 24 * 7
            }
            else if (type === 'h') {
                time *= 60
            } else if (type === 'd') {
                time *= 60 * 24
            } else if (type !== 'm') {
                return 'Please use "m" (minutes), "h" (hours), "d" (days), "w" (weeks)'
            }

            const expires = new Date()
            expires.setMinutes(expires.getMinutes() + time)

            await tempRoleSchema.create({
                guildId: interaction.guild.id,
                userId: target.id,
                roleId: role.id,
                expires: expires
            })
            target.roles.add(role)
            embed.setDescription(`Added the role ${role} to ${target} for ${duration}. I will remove it <t:${Math.round(expires.getTime() / 1000)}:R>`)
            const message = await interaction.reply({embeds: [embed], fetchReply: true});
            setTimeout(() => message.delete().catch(() => {}), 5000);

        } else if (!target.roles.cache.has(role.id)) {
            target.roles.add(role)

            embed.setDescription(`Added the role ${role} to ${target}.`)
            const message = await interaction.reply({embeds: [embed], fetchReply: true});
            setTimeout(() => message.delete().catch(() => {}), 5000);

        } else if (target.roles.cache.has(role.id)) {
            target.roles.remove(role)

            embed.setDescription(`Removed the role ${role} to ${target}.`)
            const message = await interaction.reply({embeds: [embed], fetchReply: true});
            setTimeout(() => message.delete().catch(() => {}), 5000);
        }
    }
}