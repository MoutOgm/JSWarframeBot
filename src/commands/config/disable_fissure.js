const { SlashCommandBuilder, InteractionContextType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ComponentType } = require('discord.js');
const { missionsType, missionTierList, path } = require('../../database/fissure.js');
const cron = require('node-cron')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('disable_fissure')
		.setDescription('Désactiver les envoies de fissures par mp (peut-être réactivé)'),
    async execute(interaction) {
        const database = require('../../database/database.js');
        if (!database.mp_fissure[interaction.user.id]) {
            await interaction.reply({
                content: "Vous devez d'abord créer une alert: /ping_me_fissure",
                flags: MessageFlags.Ephemeral
            })
            return;
        }
        if (!database.mp_fissure[interaction.user.id].active) {
            await interaction.reply({
                content: "Déjà désactivé",
                flags: MessageFlags.Ephemeral
            })
            return;
        }
        database.mp_fissure[interaction.user.id].active = false
        database.save()
        interaction.reply({
            content: 'Désactivé',
            flags: MessageFlags.Ephemeral
        })
    },
    help: `Désactiver les envoies de fissures par mp (peut-être réactivé) avec /enable_fissure en MP`
}