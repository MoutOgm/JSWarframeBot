const { EmbedBuilder, SlashCommandBuilder, InteractionContextType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ComponentType } = require('discord.js');
const { missionsType, missionTierList, path } = require('../../database/fissure');
const { get_drops, get_items, get_item } = require('../../callwf/mod')
const dbItems = require('../../database/items');
const log = require('log4js').getLogger()
log.level = "info"

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_drops')
		.setDescription('Montre les drops des items')
        .setContexts([InteractionContextType.BotDM, InteractionContextType.Guild])
        .addStringOption(option =>
            option.setName('item')
            .setDescription('Item to search')
            .setRequired(true)
            .setAutocomplete(true)
        )
        .addStringOption(option =>
            option.setName('language')
                .setDescription("Language de l'item")
                .addChoices(
                    {name: 'fr', value: 'fr'},
                    {name: 'en', value: 'en'},
                )
        )
		,
    async autocomplete(interaction) {
        let value = interaction.options.getFocused()
        if (value.length < 2) {
            await interaction.respond([])
            return;
        }
        let language = interaction.options.getString('language') ?? 'en'
        let searchBy = "name"
        let drops = (await get_items(value, language, searchBy))
            .filter(v => dbItems.category.includes(v.category))
            .flatMap(drop => drop.name)
            .map(v => ({ name: v, value: v }))
            .slice(0, 20);
        log.info(drops)
        await interaction.respond(
            drops
        )
    },
    async execute(interaction) {
        let language = interaction.options.getString('language') ?? 'en'
        let searchBy = "name"
        let item = (await get_item(interaction.options.getString('item'), language, searchBy))
        let embed = new EmbedBuilder()
            .setTitle(item.name)
            .setURL(item.wikiaUrl)
            .setColor(0x00FF00)
            .setImage(item.wikiaThumbnail)
        if (item.drops) {
            let betterdrop = item.drops
                .sort((a, b) => b.chance - a.chance)       // highest first
                .slice(0, Math.min(2, item.drops.length));
            betterdrop.forEach(drop => {
                embed.addFields({
                    name: drop.type,
                    value: `- chance: ${parseFloat(drop.chance * 100).toFixed(2)}%
- location: ${drop.location}`
                })
            })
        }
        if (item.components) {
            let betterdrop = item.components
                .map(c => {
                    if (!c.drops) return
                    return c.drops.sort((a, b) => b.chance - a.chance)[0]
                }).filter(Boolean)
            console.log(betterdrop)
            betterdrop.forEach(d => {
                embed.addFields({
                    name: d.type,
                    value: `- chance: ${parseFloat(d.chance * 100).toFixed(2)}%
- location: ${d.location}`
                })
            })
        }

        interaction.reply({
            embeds: [embed]
        })

    },
    help: `Affiche le taux de drops d’un objet (avec saisie semi-automatique) `
}