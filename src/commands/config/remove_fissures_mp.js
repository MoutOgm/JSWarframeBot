const { SlashCommandBuilder, InteractionContextType, PermissionFlagsBits, MessageFlags } = require('discord.js');
const cron = require('node-cron');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove_fissures_mp')
		.setDescription('Retire les alertes par mp et la configuration faite')
		.setContexts([InteractionContextType.BotDM, InteractionContextType.Guild])
		,
	async execute(interaction) {
		const database = require('../../database/database.js');
		if (!database.mp_fissure[interaction.user.id]) {
			await interaction.reply({
                content: "La configuration n'existe pas",
                flags: MessageFlags.Ephemeral
            });
			return;
		}
		delete database.mp_fissure[interaction.user.id]
		database.save();
		let [task] = new Map([...cron.getTasks()].filter(([_, task]) => {
			return task.name == interaction.user.id;
		})).values();
		task.destroy()

		await interaction.reply({
            content: "Configuration supprimée",
            flags: MessageFlags.Ephemeral
        });
	},
    help: `Désactive et supprime la configuration d'alerte par mp`
};
