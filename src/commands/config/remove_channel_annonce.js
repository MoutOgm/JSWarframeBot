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
			await interaction.reply("Ce salon n'est pas configuré et ne peut pas être retiré");
			return;
		}
		delete database.annonce_channel[channel.id]
		database.save();

		await interaction.reply(`Salon d'annonce retiré`);
	},
    help: `Retire un saon des annonces de fissures et arbitrage`
};
