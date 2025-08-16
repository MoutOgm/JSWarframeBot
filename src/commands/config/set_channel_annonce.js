const { SlashCommandBuilder, InteractionContextType, PermissionFlagsBits } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_channel_annonce')
		.setDescription("Configure un salon d'annonce des fissures et arbitrage")
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription("Salon d'annonce")
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('tierlist')
				.setDescription("Utilisation de la tier list pour filtrer les annonces")
				.setRequired(false)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
		.setContexts(InteractionContextType.Guild)
		,
	async execute(interaction) {
		const channel = interaction.channel;
		const database = require('../../database/database.js');
		if (database.annonce_channel[channel.id]) {
			await interaction.reply({
				content :'Ce salon est déjà configurer, veuillez utiliser /remove_channel',
				flags: MessageFlags.Ephemeral
			});
			return;
		}
		database.annonce_channel[interaction.options.getChannel('channel').id] = {tier_list: interaction.options.getBoolean('tierlist') || false};
		database.save();

		await interaction.reply({
			content : `Annonces configurées dans ${channel.name}`,
			flags: MessageFlags.Ephemeral
		});
	},
    help: `Configure un salon d'annonce des fissures et arbitrage`
};
