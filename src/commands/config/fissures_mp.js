const { SlashCommandBuilder, InteractionContextType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ComponentType } = require('discord.js');
const { missionsType, missionTierList, path } = require('../../database/fissure');
const cron = require('node-cron')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping_me_fissures')
		.setDescription('Configure mp fissures alerts')
        .addStringOption(option =>
            option
            .setName('days')
            .setDescription("selections des jours d'envoie de la fissure (format = * ou 1-7 ou 1,4,7.. ou 1)")
        )
        .addStringOption(option =>
            option
            .setName('hours')
            .setDescription("selections des heures d'envoie de la fissure (format = * ou 01-23 ou 16,17,18 ou 07)")
        )
        .setContexts([InteractionContextType.BotDM, InteractionContextType.Guild])
		,
	async execute(interaction) {
        const database = require('../../database/database.js');
        const selectFissuresMissions = new StringSelectMenuBuilder()
            .setCustomId('fissures')
            .setPlaceholder('Missions')
            .setMinValues(1)
            .setMaxValues(missionsType.length)
            .addOptions(missionsType.map(mission =>
                new StringSelectMenuOptionBuilder()
                    .setLabel(mission)
                    .setValue(mission)
            ))
        const selectFissuresTierList = new StringSelectMenuBuilder()
            .setCustomId('tier')
            .setPlaceholder('Tier (tout -> list disable)')
            .setMinValues(1)
            .setMaxValues(missionTierList.length)
            .addOptions(missionTierList.map(tier =>
                new StringSelectMenuOptionBuilder()
                    .setLabel(tier)
                    .setValue(tier)
            ))

        const selectPath = new StringSelectMenuBuilder()
            .setCustomId('path')
            .setPlaceholder('Path')
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

        let already_exist = false
        if (database[interaction.user.id]) already_exist = true

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
                temp.cron = `*/10 * ${interaction.options.getString('hours')??'*'} * * ${interaction.options.getString('days')??'*'}`
                temp.active = true
                database.mp_fissure[i.user.id] = temp
                database.save()
                if (!already_exist) {
                    cron.schedule(temp.cron, async () => require('../../interval/mp_fissures.js').get(interaction.client, interaction.user.id), {name: i.user.id})
                }
                await i.reply(`Alertes configurées et activées`)
                return;
            }
            await i.reply({
                content: `${i.customId} selected`,
                flags: MessageFlags.Ephemeral
            });
        });
    },
    help: `Configure le système d'alerte des fissures par mp`
};
