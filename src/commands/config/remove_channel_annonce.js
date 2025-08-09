const { SlashCommandBuilder, InteractionContextType } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove_channel_annonce')
		.setDescription('Remove announce channel')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to set as the announce channel')
				.setRequired(true))
		.setContexts(InteractionContextType.Guild)
		,
	async execute(interaction) {
		const channel = interaction.channel;
		const database = require('../../database/database.js');
		if (!database.annonce_channel[channel.id]) {
			await interaction.reply("This channel isn't set as the announce channel.");
			return;
		}
		delete database.annonce_channel[channel.id]
		database.save();

		await interaction.reply(`Announce channel removed`);
	},
};
