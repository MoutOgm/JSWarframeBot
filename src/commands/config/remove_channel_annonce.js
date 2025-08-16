const { SlashCommandBuilder, InteractionContextType, PermissionFlagsBits } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove_channel_annonce')
		.setDescription("Retire un salon d'annonce")
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription("Salon d'annonce")
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
		.setContexts(InteractionContextType.Guild)
		,
	async execute(interaction) {
		const channel = interaction.channel;
		const database = require('../../database/database.js');
		if (!database.annonce_channel[channel.id]) {
			await interaction.reply({
				content :"Ce salon n'est pas configuré et ne peut pas être retiré",
				flags: MessageFlags.Ephemeral
			});
			return;
		}
		delete database.annonce_channel[channel.id]
		database.save();

		await interaction.reply({
			content: `Salon d'annonce retiré`,
			flags: MessageFlags.Ephemeral
		});
	},
    help: `Retire un salon des annonces de fissures et arbitrage`
};
