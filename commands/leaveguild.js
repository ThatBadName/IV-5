const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "leaveguild",
    description: "Leave a guild the bot is in.",
    category: "Dev",
    slash: true,
    testOnly: true,
    ownerOnly: true,
    options: [
        {
          name: "guildid",
          description: "The ID of the guild to leave",
          required: true,
          type: "STRING",
        },
    ],
    
    callback: async({interaction, client}) => {
        const blacklistSchema = require('../models/blacklist-schema')
        const blacklist = await blacklistSchema.findOne({userId: interaction.user.id})
        if (blacklist) {
            return
        }
        const guildId = interaction.options.getString("guildid")
            const guild = client.guilds.cache.get(guildId);
            if(!guild) return interaction.reply("No guild was found.")
                guild.leave()
                return interaction.reply({embeds: [new MessageEmbed().setColor('0xa744f2').setDescription(`${client.user.username} has successfully left ${guild.name}`)]})  
    }
}