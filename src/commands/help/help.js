const { SlashCommandBuilder, InteractionContextType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ComponentType, EmbedBuilder } = require('discord.js');
const log = require('log4js').getLogger()
log.level = "info"
const fs = require('fs')
const path = require('path')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Getting List of commands and help'),
    async execute(interaction) {
        const foldersPath = path.join(__dirname, '../../commands');
        const commandFolders = fs.readdirSync(foldersPath);
        let embed = new EmbedBuilder()
            .setTitle(`Help`)
            .setColor(0x62FF0C)

        for (const folder of commandFolders) {
            // Grab all the command files from the commands directory you created earlier
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath)
                embed.addFields({
                    name: `/${command.data.name}`,
                    value: command.help
                })
            }
        }
        interaction.reply({
            embeds: [embed]
        })
    },
    help: `Liste des aides`
}