const { SlashCommandBuilder, InteractionContextType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ComponentType } = require('discord.js');
const { missionsType, missionTierList, path } = require('../../database/fissure.js');
const cron = require('node-cron')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('enable_fissure')
		.setDescription('Configure Fissures Ping'),
    async execute(interaction) {
        const database = require('../../database/database.js');
        if (!database.mp_fissure[interaction.user.id]) {
            await interaction.reply("Vous devez d'abord créer une alert: /ping_me_fissure")
            return;
        }
        if (database.mp_fissure[interaction.user.id].active) {
            await interaction.reply("Déjà active")
            return;
        }
        database.mp_fissure[interaction.user.id].active = true
        database.save()
        interaction.reply('Activé')
    }
}