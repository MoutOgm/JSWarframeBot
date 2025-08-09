const { SlashCommandBuilder, InteractionContextType, PermissionFlagsBits, MessageFlags } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove_fissures_mp')
		.setDescription('Remove announce by MP')
		.setContexts([InteractionContextType.BotDM, InteractionContextType.Guild])
		,
	async execute(interaction) {
		const database = require('../../database/database.js');
		if (!database.mp_fissure[interaction.user.id]) {
			await interaction.reply({
                content: "You don't have any ping configure",
                flags: MessageFlags.Ephemeral
            });
			return;
		}
		delete database.mp_fissure[interaction.user.id]
		database.save();
		await interaction.reply({
            content: "Ping deleted",
            flags: MessageFlags.Ephemeral
        });
	},
};
