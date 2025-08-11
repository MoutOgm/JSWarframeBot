const { SlashCommandBuilder, InteractionContextType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ComponentType } = require('discord.js');
const { missionsType, missionTierList, path } = require('../../database/fissure');
const { get_drops, get_items } = require("../../callwf/mod");
const log = require('log4js').getLogger()
log.level = "info"

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_drops')
		.setDescription('Show drop of')
        .setContexts([InteractionContextType.BotDM, InteractionContextType.Guild])
        .addStringOption(option =>
            option.setName('item')
            .setDescription('Item to search')
            .setRequired(true)
            .setAutocomplete(true)
        )
        .addStringOption(option =>
            option.setName('language')
                .setDescription('Language option')
                .addChoices(
                    {name: 'fr', value: 'fr'},
                    {name: 'en', value: 'en'},
                )
        )
		,
    async autocomplete(interaction) {
        let value = interaction.options.getFocused()
        if (value.length < 6) {
            await interaction.respond([])
            return;
        }
        let language = interaction.options.getString('language') ?? 'fr'
        let by = "name"
        let drops = (await get_items(value, language, by)).filter((_,i)=>i<2).map(drop => {
            return [drop.name].concat(drop.components.map(c => {
                if (c.drops[0]) {
                    return c.drops[0].type
                }
                return ''
            }))
        }).map(v => v.filter(n => n!='').map(v => { return {name: v, value: v} })).flat()
        log.info(drops)
        await interaction.respond(
            drops
        )
    },
    async execute(interaction) {

    }
}