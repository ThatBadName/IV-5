const { MessageEmbed, MessageActionRow, MessageButton, MessageCollector } = require('discord.js')
const got = require('got')
const Minesweeper = require('discord.js-minesweeper')
const myGameSchema = require('../models/myGame-schema')
const botSchema = require('../models/bot-schema')

module.exports = {
name: 'fun',
aliases: [''],
description: 'Get a meme or a joke and have some fun',
category: 'Fun',
slash: true,
ownerOnly: false,
guildOnly: true,
testOnly: false,
options: [
    {
        name: 'meme',
        description: 'Get a meme',
        type: 'SUB_COMMAND'
    },
    {
        name: 'showerthought',
        description: 'Get a shower thought',
        type: 'SUB_COMMAND'
    },
    {
        name: 'tdtm',
        description: 'They Did The Maths',
        type: 'SUB_COMMAND'
    },
    {
        name: 'minesweeper',
        description: 'Play a game of minesweeper',
        type: 'SUB_COMMAND',
        options: [
            {
                name: 'rows',
                description: 'How many rows? (Max 9)',
                type: 'INTEGER',
                required: false
            },
            {
                name: 'columns',
                description: 'How many columns? (Max 9)',
                type: 'INTEGER',
                required: false
            },
            {
                name: 'mines',
                description: 'How many mines? (Max 20)',
                type: 'INTEGER',
                required: false
            },
        ],
    },
    {
        name: 'wutisthis',
        description: 'Play a game I came up with in my chemistry exam cause I was bored',
        type: 'SUB_COMMAND',
        // options: [
        //     {
        //         name: 'starting-number',
        //         description: 'The number to start with. WILL BE SUBTRACTED FROM YOUR BALANCE',
        //         type: 'INTEGER',
        //         required: true
        //     }
        // ],
    },
],
cooldown: '',
requireRoles: false,
permissions: ['SEND_MESSAGES'],

callback: async({interaction}) => {
    const blacklistSchema = require('../models/blacklist-schema')
    const blacklist = await blacklistSchema.findOne({userId: interaction.user.id})
    if (blacklist) {
        return
    }
    const maintenanceSchema = require('../models/mantenance-schema')
    const maintenance = await maintenanceSchema.findOne({maintenance: true})
        if (maintenance && interaction.user.id !== '804265795835265034') {
            interaction.reply ({content: `Maintenance mode is currently enabled. You are not able to run any commands or interact with the bot. || ${maintenance.maintenanceReason ? maintenance.maintenanceReason : 'No Reason Provided'}`, ephemeral: true,})
            return
        }

    if (interaction.options.getSubcommand() === 'meme') {
        const embed = new MessageEmbed();
        got('https://www.reddit.com/r/memes/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;

                const permalink = post.data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = post.data.url;
                const memeTitle = post.data.title;
                const memeUpvotes = post.data.ups;
                const memeNumComments = post.data.num_comments;

                embed.setTitle(`${memeTitle}`);
                embed.setURL(`${memeUrl}`);
                embed.setColor('RANDOM');
                embed.setImage(memeImage);
                embed.setFooter({text: `👍 ${memeUpvotes} 💬 ${memeNumComments}`});

                interaction.reply({embeds: [embed], components: [row]})
            })
            .catch(console.error);

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('New Meme')
            .setCustomId('newMeme')
            .setStyle('SUCCESS')
        )
        
        interaction.reply({embeds: [memeEmbed], components: [row]}) 
    } else if (interaction.options.getSubcommand() === 'minesweeper') {
        let rows = interaction.options.getInteger('rows') || 9
        let columns = interaction.options.getInteger('columns') || 9
        let mines = interaction.options.getInteger('mines') || 10
        if (rows > 9) rows = 9
        if (columns > 9) columns = 9
        if (mines > 20) mines = 10

        const game = new Minesweeper({rows, columns, mines})
        const matrix = game.start()

        interaction.reply({content: `${matrix ? matrix.replaceAll(' ', '') : 'Invalid data'}`})
    } else if (interaction.options.getSubcommand() === 'showerthought') {
        const embed = new MessageEmbed();
        got('https://www.reddit.com/r/showerthoughts/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;

                const permalink = post.data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = post.data.url;
                const memeTitle = post.data.title.slice(256)
                const memeUpvotes = post.data.ups;
                const memeNumComments = post.data.num_comments;

                embed.setTitle(`${memeTitle}`);
                embed.setURL(`${memeUrl}`);
                embed.setColor('RANDOM');
                embed.setImage(memeImage);
                embed.setFooter({text: `👍 ${memeUpvotes} 💬 ${memeNumComments}`});

                interaction.reply({embeds: [embed], components: [row]})
            })
            .catch(console.error);

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('New Thought')
            .setCustomId('newThought')
            .setStyle('SUCCESS')
        )   
    } else if (interaction.options.getSubcommand() === 'tdtm') {
        const embed = new MessageEmbed();
        got('https://www.reddit.com/r/theydidthemath/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;

                const permalink = post.data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = post.data.url;
                const memeTitle = post.data.title.slice(256)
                const memeUpvotes = post.data.ups;
                const memeNumComments = post.data.num_comments;

                embed.setTitle(`${memeTitle}`);
                embed.setURL(`${memeUrl}`);
                embed.setColor('RANDOM');
                embed.setImage(memeImage);
                embed.setFooter({text: `👍 ${memeUpvotes} 💬 ${memeNumComments}`});

                interaction.reply({embeds: [embed], components: [row]})
            })
            .catch(console.error);

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('New TDTM')
            .setCustomId('newTdtm')
            .setStyle('SUCCESS')
        )   
    } else if (interaction.options.getSubcommand() === 'wutisthis') {
        const botHighScore = await botSchema.findOne()
        let highestEverScore = botHighScore.highestScore
        // const start = interaction.options.getInteger('starting-number')
        // let checkNumber = start
        // if (checkNumber > 250 || checkNumber < 1) checkNumber = 100
        let checkNumber = 250
        const userCard = await myGameSchema.findOne({userId: interaction.user.id})
        if (!userCard) myGameSchema.create({userId: interaction.user.id})
        const rowStart = new MessageActionRow()
        .addComponents(
            new MessageButton().setCustomId('reroll').setLabel('START').setStyle('PRIMARY')
        )
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton().setCustomId('reroll').setLabel('AGAIN').setStyle('DANGER')
        )
        const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton().setCustomId('reroll').setLabel('AGAIN').setStyle('DANGER')
        )
        .addComponents(
            new MessageButton().setCustomId('boost').setLabel('BOOST').setStyle('DANGER')
        )
        let tips = ['Tip: This game is 100% luck based', 'Did You Know: I\'m planning on adding custom numbers with currency', 'Tip: Getting more than 6 is pretty impressive', 'This game can get very addictive', 'E', 'Hi', 'Yes I actually made this in an exam on my calculator', 'Why am I so addicted to this now', 'This do be a good game', 'Never gonn-- sorry i didn\'t mean to', 'Loosing is cringe', 'If you ever hold the position for the global champion', 'Getting a meme number (21, 69, 420) will give you a boost']
        const gameEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('What number will you get next?')
        .setFields({
            name: 'High Score',
            value: `\`${userCard.highScore}\``,
            inline: true
        }, {
            name: 'Current Score',
            value: `\`0\``,
            inline: true
        }, {
            name: 'Current Number',
            value: `\`${checkNumber}\``,
            inline: true
        }, {
            name: 'Starting Number',
            value: `\`${checkNumber}\``,
            inline: true
        }, {
            name: 'Global High Score',
            value: `\`${highestEverScore}\``,
            inline: true
        }, {
            name: 'Global Champion',
            value: `<@${botHighScore.highHumanId}> (\`${botHighScore.highHumanTag}\`)`,
            inline: true
        })
        .setFooter({text: `Press the button to begin`})
        const gameMessage = await interaction.reply({embeds: [gameEmbed], components: [rowStart], fetchReply: true})
        const collector = await gameMessage.createMessageComponentCollector({componentType:'BUTTON', time: 10000})
        let recentNum = checkNumber
        let count = 1
        let highScore = userCard.highScore
        collector.on('collect', async(i) => {
            if (i.user.id !== interaction.user.id) return interaction.reply({embeds: [new MessageEmbed().setColor('0xff0000').setTitle('This is not your game!')], ephemeral: true})
            let randNumber = Math.round((Math.random() * (recentNum + 1)))
            let previousNum = recentNum
            recentNum = randNumber
            if (i.customId === 'reroll') {
            if (randNumber <= 0) {
                const loseEmbed = new MessageEmbed()
                .setTitle('You Lost!')
                .setColor('0xff0000')
                .setFields({
                    name: 'High Score',
                    value: `\`${highScore}\``,
                    inline: true
                }, {
                    name: 'Final Score',
                    value: `\`${count}\``,
                    inline: true
                }, {
                    name: 'Starting Number',
                    value: `\`${checkNumber}\``,
                    inline: true
                }, {
                    name: 'Global High Score',
                    value: `\`${highestEverScore}\``,
                    inline: true
                }, {
                    name: 'Global Champion',
                    value: `<@${botHighScore.highHumanId}> (\`${botHighScore.highHumanTag}\`)`,
                    inline: true
                })
                .setFooter({text: tips[Math.round(Math.random() * tips.length)] === undefined ? 'Tip: I came up with this during an exam lol' : `${tips[Math.round(Math.random() * tips.length)]}`})
                collector.stop('game')
                return gameMessage.edit({embeds: [loseEmbed], components: []})
            } else {
                const successEmbed = new MessageEmbed()
                .setTitle('You did the good!')
                .setColor('GREEN')
                .setFields({
                    name: 'High Score',
                    value: `\`${highScore}\``,
                    inline: true
                }, {
                    name: 'Current Score',
                    value: `\`${count++}\``,
                    inline: true
                }, {
                    name: 'Current Number',
                    value: `\`${randNumber}\``,
                    inline: true
                }, {
                    name: 'Starting Number',
                    value: `\`${checkNumber}\``,
                    inline: true
                }, {
                    name: 'Global High Score',
                    value: `\`${highestEverScore}\``,
                    inline: true
                }, {
                    name: 'Global Champion',
                    value: `<@${botHighScore.highHumanId}> (\`${botHighScore.highHumanTag}\`)`,
                    inline: true
                })
                .setFooter({text: tips[Math.round(Math.random() * tips.length)] === undefined ? 'Tip: I came up with this during an exam lol' : `${tips[Math.round(Math.random() * tips.length)]}`})
                if (randNumber === 21 || randNumber === 69 || randNumber === 420) gameMessage.edit({embeds: [successEmbed], components: []}).then(msg => {setTimeout(() => msg.edit({embeds: [successEmbed], components: [row2]}), 500)})
                else gameMessage.edit({embeds: [successEmbed], components: []}).then(msg => {setTimeout(() => msg.edit({embeds: [successEmbed], components: [row]}), 2000)})
                i.deferUpdate()
                if (count > highScore) highScore++
                if (count > botHighScore.highestScore) highestEverScore++
                if (highScore > userCard.highScore) {
                    await myGameSchema.findOneAndUpdate({userId: interaction.user.id}, {highScore: highScore})
                }
                if (count > botHighScore.highestScore) await botSchema.findOneAndUpdate({}, {highestScore: highScore, highHumanId: i.user.id, highHumanTag: i.user.tag})
                collector.resetTimer()
            }
            } else if (i.customId === 'boost') {
                randNumber = previousNum * previousNum
                const successEmbed2 = new MessageEmbed()
                .setTitle('You did the good!')
                .setColor('GREEN')
                .setFields({
                    name: 'High Score',
                    value: `\`${highScore}\``,
                    inline: true
                }, {
                    name: 'Current Score',
                    value: `\`${count++}\``,
                    inline: true
                }, {
                    name: 'Current Number',
                    value: `\`${previousNum * previousNum}\``,
                    inline: true
                }, {
                    name: 'Starting Number',
                    value: `\`${checkNumber}\``,
                    inline: true
                }, {
                    name: 'Global High Score',
                    value: `\`${highestEverScore}\``,
                    inline: true
                }, {
                    name: 'Global Champion',
                    value: `<@${botHighScore.highHumanId}> (\`${botHighScore.highHumanTag}\`)`,
                    inline: true
                })
                .setFooter({text: tips[Math.round(Math.random() * tips.length)] === undefined ? 'Tip: I came up with this during an exam lol' : `${tips[Math.round(Math.random() * tips.length)]}`})
                gameMessage.edit({embeds: [successEmbed2], components: []}).then(msg => {setTimeout(() => msg.edit({embeds: [successEmbed2], components: [row]}), 2000)})
                i.deferUpdate()
                if (count > highScore) highScore++
                if (count > botHighScore.highestScore) highestEverScore++
                if (highScore > userCard.highScore) {
                    await myGameSchema.findOneAndUpdate({userId: interaction.user.id}, {highScore: highScore})
                }
                if (count > botHighScore.highestScore) await botSchema.findOneAndUpdate({}, {highestScore: highScore, highHumanId: i.user.id, highHumanTag: i.user.tag})
                collector.resetTimer()
            }
        })
        collector.on('end', async(collected, reason) => {
                if (reason !== 'game') gameMessage.edit({embeds: [new MessageEmbed().setColor('0xff0000').setTitle('This game has timed out')], components:[]})
        })
    }
    }
}