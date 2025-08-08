const { SlashCommandBuilder } = require('discord.js');
let database = require('../../database/database.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fissures')
		.setDescription('Replies with fissures!'),
	async execute(interaction) {
		const { get_fissure } = require('../../callwf/mod.js');
        try {
            const fissures = await get_fissure();
            fissures.forEach(element => {
                console.log(`Fissure: ${element.node} - Type: ${element.type} - Active: ${element.active}`);
            });
            await interaction.reply(`Current fissures: ${fissures.length}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('There was an error fetching the fissures.');
        }
	},
};
