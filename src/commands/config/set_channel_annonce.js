const { SlashCommandBuilder, InteractionContextType } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_channel_annonce')
		.setDescription('Set announce channel')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to set as the announce channel')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('tierlist')
				.setDescription('Define announce from tier list')
				.setRequired(false)
		)
		.setContexts(InteractionContextType.Guild)
		,
	async execute(interaction) {
		const channel = interaction.channel;
		const database = require('../../database/database.js');
		if (database.annonce_channel[channel.id]) {
			await interaction.reply('This channel is already set as the announce channel.');
			return;
		}
		database.annonce_channel[interaction.options.getChannel('channel').id] = {tier_list: interaction.options.getBoolean('tierlist') || false};
		database.save();

		await interaction.reply(`Announce channel set to ${channel.name}`);
	},
};
