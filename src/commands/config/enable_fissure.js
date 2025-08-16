const { SlashCommandBuilder, InteractionContextType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ComponentType } = require('discord.js');
const { missionsType, missionTierList, path } = require('../../database/fissure.js');
const cron = require('node-cron')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('enable_fissure')
		.setDescription('Active les fissures alertes configurées'),
    async execute(interaction) {
        const database = require('../../database/database.js');
        if (!database.mp_fissure[interaction.user.id]) {
            await interaction.reply({
                content: "Vous devez d'abord créer une alert: /ping_me_fissure",
                flags: MessageFlags.Ephemeral
            })
            return;
        }
        if (database.mp_fissure[interaction.user.id].active) {
            await interaction.reply({
                content: "Déjà active",
                flags: MessageFlags.Ephemeral
            })
            return;
        }
        database.mp_fissure[interaction.user.id].active = true
        database.save()
        interaction.reply({
            content: 'Activé',
            flags: MessageFlags.Ephemeral
        })
    },
    help: `Active les fissures alertes configurées en MP`
}