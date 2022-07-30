const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const voucher_codes = require('voucher-code-generator')
const premiumCodeSchema = require('../models/premiumCode-schema')

module.exports = (client) => {
   client.on('guildMemberUpdate', async(oldMember, newMember) => {
        if (oldMember.guild.id !== '919242919829979136') return

        let plan
        const oldRoles1 = oldMember.roles.cache, newRoles1 = newMember.roles.cache
        const oldHas1 = oldRoles1.has('981116743265185822'), newHas1 = newRoles1.has('981116743265185822')
        if (!oldHas1 && newHas1) {
            plan = 'daily'
            let codes = []

            let amount = 1

            for (var i = 0; i < amount; i++) {
            const codePremium = voucher_codes.generate({
                pattern: "####-####-####",
            });

            const code = codePremium.toString().toUpperCase();

            const find = await premiumCodeSchema.findOne({
                code: code,
            });

            if (!find) {
                premiumCodeSchema.create({
                code: code,
                plan: plan,
                });

                codes.push(`${i + 1}- ${code}`);
            }

            const newCodeEmbed = new MessageEmbed()
            .setTitle('Thanks for buying premium!')
            .setDescription(`I have generated a code for you to use in your server. This will make your server premium.\nTo claim please use the command:\n\`/redeem code:${code}\` (Regular Bot)\n**or**\n\`/subscription redeem code:${code}\` (Premium Bot)\n**YOU MUST RUN THE COMMAND IN THE SERVER YOU WANT TO GET PPREMIUM IN.**`)
            .setColor('0xFF3D15')
            oldMember.roles.remove('981116743265185822')

            oldMember.send({embeds: [newCodeEmbed]}).catch(async(err) => {
                const guild = oldMember.guild
                const user = await client.users.fetch(oldMember).catch(() => null);
                const channel = await guild.channels.create(`${user.tag}`, {
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: oldMember.id,
                            deny: ['SEND_MESSAGES', 'CREATE_PUBLIC_THREADS', 'ADD_REACTIONS'],
                            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                        }
                    ],
                    type: 'GUILD_TEXT',
                    parent: '981125784217464852',
                    topic: code
                })
                const pleaseClaim = new MessageEmbed()
                .setTitle('Thanks for buying premium!')
                .setDescription(`I have generated a code for you to use in your server. This will make your server premium.\nTo claim please use the command:\n\`/redeem code:${code}\` (Regular Bot)\n**or**\n\`/subscription redeem code:${code}\` (Premium Bot)\n**YOU MUST RUN THE COMMAND IN THE SERVER YOU WANT TO GET PPREMIUM IN.**`)
                .setColor('0xFF3D15')
                .setFooter({text: `Once you have claimed your premium press the button bellow | If you press the button but have not claimed the premium please open a ticket`})

                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('claimedPremium')
                    .setEmoji('✨')
                    .setLabel('I have claimed this')
                    .setStyle('PRIMARY')
                )

                channel.send({content: `${oldMember}`, embeds: [pleaseClaim], components: [row]})
            })
            }
        }
        const oldRoles2 = oldMember.roles.cache, newRoles2 = newMember.roles.cache
        const oldHas2 = oldRoles2.has('981133008524423179'), newHas2 = newRoles2.has('981133008524423179')
        if (!oldHas2 && newHas2) {
            plan = 'weekly'
            let codes = []

            let amount = 1

            for (var i = 0; i < amount; i++) {
            const codePremium = voucher_codes.generate({
                pattern: "####-####-####",
            });

            const code = codePremium.toString().toUpperCase();

            const find = await premiumCodeSchema.findOne({
                code: code,
            });

            if (!find) {
                premiumCodeSchema.create({
                code: code,
                plan: plan,
                });

                codes.push(`${i + 1}- ${code}`);
            }

            const newCodeEmbed = new MessageEmbed()
            .setTitle('Thanks for buying premium!')
            .setDescription(`I have generated a code for you to use in your server. This will make your server premium.\nTo claim please use the command:\`\`\`/redeem code:${code}\`\`\`**YOU MUST RUN THE COMMAND IN THE SERVER YOU WANT TO GET PPREMIUM IN.**`)
            .setColor('0xFF3D15')
            oldMember.roles.remove('981133008524423179')

            oldMember.send({embeds: [newCodeEmbed]}).catch(async(err) => {
                const guild = oldMember.guild
                const user = await client.users.fetch(oldMember).catch(() => null);
                const channel = await guild.channels.create(`${user.tag}`, {
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: oldMember.id,
                            deny: ['SEND_MESSAGES', 'CREATE_PUBLIC_THREADS', 'ADD_REACTIONS'],
                            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                        }
                    ],
                    type: 'GUILD_TEXT',
                    parent: '981125784217464852',
                    topic: code
                })
                const pleaseClaim = new MessageEmbed()
                .setTitle('Thanks for buying premium!')
                .setDescription(`I have generated a code for you to use in your server. This will make your server premium.\nTo claim please use the command:\`\`\`/redeem code:${code}\`\`\`**YOU MUST RUN THE COMMAND IN THE SERVER YOU WANT TO GET PPREMIUM IN.**`)
                .setColor('0xFF3D15')
                .setFooter({text: `Once you have claimed your premium press the button bellow | If you press the button but have not claimed the premium please open a ticket`})

                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('claimedPremium')
                    .setEmoji('✨')
                    .setLabel('I have claimed this')
                    .setStyle('PRIMARY')
                )

                channel.send({content: `${oldMember}`, embeds: [pleaseClaim], components: [row]})
            })
            }
        }
        const oldRoles3 = oldMember.roles.cache, newRoles3 = newMember.roles.cache
        const oldHas3 = oldRoles3.has('981133025708503060'), newHas3 = newRoles3.has('981133025708503060')
        if (!oldHas3 && newHas3) {
            plan = 'monthly'
            let codes = []

            let amount = 1

            for (var i = 0; i < amount; i++) {
            const codePremium = voucher_codes.generate({
                pattern: "####-####-####",
            });

            const code = codePremium.toString().toUpperCase();

            const find = await premiumCodeSchema.findOne({
                code: code,
            });

            if (!find) {
                premiumCodeSchema.create({
                code: code,
                plan: plan,
                });

                codes.push(`${i + 1}- ${code}`);
            }

            const newCodeEmbed = new MessageEmbed()
            .setTitle('Thanks for buying premium!')
            .setDescription(`I have generated a code for you to use in your server. This will make your server premium.\nTo claim please use the command:\`\`\`/redeem code:${code}\`\`\`**YOU MUST RUN THE COMMAND IN THE SERVER YOU WANT TO GET PPREMIUM IN.**`)
            .setColor('0xFF3D15')
            oldMember.roles.remove('981133025708503060')

            oldMember.send({embeds: [newCodeEmbed]}).catch(async(err) => {
                const guild = oldMember.guild
                const user = await client.users.fetch(oldMember).catch(() => null);
                const channel = await guild.channels.create(`${user.tag}`, {
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: oldMember.id,
                            deny: ['SEND_MESSAGES', 'CREATE_PUBLIC_THREADS', 'ADD_REACTIONS'],
                            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                        }
                    ],
                    type: 'GUILD_TEXT',
                    parent: '981125784217464852',
                    topic: code
                })
                const pleaseClaim = new MessageEmbed()
                .setTitle('Thanks for buying premium!')
                .setDescription(`I have generated a code for you to use in your server. This will make your server premium.\nTo claim please use the command:\`\`\`/redeem code:${code}\`\`\`**YOU MUST RUN THE COMMAND IN THE SERVER YOU WANT TO GET PPREMIUM IN.**`)
                .setColor('0xFF3D15')
                .setFooter({text: `Once you have claimed your premium press the button bellow | If you press the button but have not claimed the premium please open a ticket`})

                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('claimedPremium')
                    .setEmoji('✨')
                    .setLabel('I have claimed this')
                    .setStyle('PRIMARY')
                )

                channel.send({content: `${oldMember}`, embeds: [pleaseClaim], components: [row]})
            })
            }
        }
        const oldRoles4 = oldMember.roles.cache, newRoles4 = newMember.roles.cache
        const oldHas4 = oldRoles4.has('981133028359303168'), newHas4 = newRoles4.has('981133028359303168')
        if (!oldHas4 && newHas4) {
            plan = 'yearly'
            let codes = []

            let amount = 1

            for (var i = 0; i < amount; i++) {
            const codePremium = voucher_codes.generate({
                pattern: "####-####-####",
            });

            const code = codePremium.toString().toUpperCase();

            const find = await premiumCodeSchema.findOne({
                code: code,
            });

            if (!find) {
                premiumCodeSchema.create({
                code: code,
                plan: plan,
                });

                codes.push(`${i + 1}- ${code}`);
            }

            const newCodeEmbed = new MessageEmbed()
            .setTitle('Thanks for buying premium!')
            .setDescription(`I have generated a code for you to use in your server. This will make your server premium.\nTo claim please use the command:\`\`\`/redeem code:${code}\`\`\`**YOU MUST RUN THE COMMAND IN THE SERVER YOU WANT TO GET PPREMIUM IN.**`)
            .setColor('0xFF3D15')
            oldMember.roles.remove('981133028359303168')

            oldMember.send({embeds: [newCodeEmbed]}).catch(async(err) => {
                const guild = oldMember.guild
                const user = await client.users.fetch(oldMember).catch(() => null);
                const channel = await guild.channels.create(`${user.tag}`, {
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: oldMember.id,
                            deny: ['SEND_MESSAGES', 'CREATE_PUBLIC_THREADS', 'ADD_REACTIONS'],
                            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                        }
                    ],
                    type: 'GUILD_TEXT',
                    parent: '981125784217464852',
                    topic: code
                })
                const pleaseClaim = new MessageEmbed()
                .setTitle('Thanks for buying premium!')
                .setDescription(`I have generated a code for you to use in your server. This will make your server premium.\nTo claim please use the command:\`\`\`/redeem code:${code}\`\`\`**YOU MUST RUN THE COMMAND IN THE SERVER YOU WANT TO GET PPREMIUM IN.**`)
                .setColor('0xFF3D15')
                .setFooter({text: `Once you have claimed your premium press the button bellow | If you press the button but have not claimed the premium please open a ticket`})

                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('claimedPremium')
                    .setEmoji('✨')
                    .setLabel('I have claimed this')
                    .setStyle('PRIMARY')
                )

                channel.send({content: `${oldMember}`, embeds: [pleaseClaim], components: [row]})
            })
            }
        }
})
},

module.exports.config = {
   dbName: 'AUTO PREMIUM',
   displayName: 'Auto Premium',
}