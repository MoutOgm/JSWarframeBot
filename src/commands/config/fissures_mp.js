const { SlashCommandBuilder, InteractionContextType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ComponentType } = require('discord.js');
const { missionsType, missionTierList, path } = require('../../database/fissure');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping_me_fissures')
		.setDescription('Configure Fissures Ping')
        .setContexts([InteractionContextType.BotDM, InteractionContextType.Guild])
		,
	async execute(interaction) {
        const database = require('../../database/database.js');
        const selectFissuresMissions = new StringSelectMenuBuilder()
            .setCustomId('fissures')
            .setPlaceholder('Select Missions One or More')
            .setMinValues(1)
            .setMaxValues(missionsType.length)
            .addOptions(missionsType.map(mission =>
                new StringSelectMenuOptionBuilder()
                    .setLabel(mission)
                    .setValue(mission)
            ))
        const selectFissuresTierList = new StringSelectMenuBuilder()
            .setCustomId('tier')
            .setPlaceholder('Select Tier List')
            .setMinValues(1)
            .setMaxValues(missionTierList.length)
            .addOptions(missionTierList.map(tier =>
                new StringSelectMenuOptionBuilder()
                    .setLabel(tier)
                    .setValue(tier)
            ))

        const selectPath = new StringSelectMenuBuilder()
            .setCustomId('path')
            .setPlaceholder('Select Path')
            .setMaxValues(path.length)
            .setMinValues(1)
            .addOptions(path.map(p =>
                new StringSelectMenuOptionBuilder()
                    .setLabel(p)
                    .setValue(p)
            ))

        const SelectionsMissions = new ActionRowBuilder()
            .addComponents(selectFissuresMissions)
        const SelectionsTier = new ActionRowBuilder()
            .addComponents(selectFissuresTierList)
        const SelectPath = new ActionRowBuilder()
            .addComponents(selectPath)

        const response = await interaction.reply({
            content: 'Fissures MP config :',
            components: [SelectionsMissions, SelectionsTier, SelectPath],
            withResponse: true,
        })

        const collector = response.resource.message.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 60_000 });
        let temp = {}
        collector.on('collect', async (i) => {
            temp[i.customId] = i.values
            if (temp['fissures'] && temp['tier'] && temp['path']) {
                database.mp_fissure[i.user.id] = temp
                database.save()
                await i.reply(`All configs selected finished`)
                return;
            }
            await i.reply({
                content: `${i.customId} selected`,
                flags: MessageFlags.Ephemeral
            });
        });
    },
};
