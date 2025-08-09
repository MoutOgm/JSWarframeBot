const { EmbedBuilder, bold, underline, ChannelType } = require("discord.js");
const { get_arbitrage } = require("../callwf/mod");
const log = require('log4js').getLogger()
log.level = "info"

module.exports = {
    get: async (client) => {
        let database = require("../database/database")
        let { tier_list, images } = require("../database/arbitrage")
        log.info("Scanning arbitrages");

        if (Object.keys(database.annonce_channel).length == 0) {
            return ;
        }
        let arbitrage = await get_arbitrage()
        Object.entries(database.annonce_channel).map(async ([chanId, d]) => {
            let a = arbitrage
            if (d.tier_list) {
                let tier = tier_list.get(a.value) || true
                if (tier == true) {
                    return
                }
            }
            if (database.isArbitrageAlerted(a.timestamp)) {return;}
            if (arbitrage.length == 0) { return ; }
            let tier = ""
            if (d.tier_list == true) {
                tier = tier_list.get(a.value).tier + " Tier "
            }
            let embed = new EmbedBuilder()
                .setTitle(`Arbitrage ${tier}`)
                .setColor(0xFFFFFF)
                .setTimestamp()
                .setThumbnail(images.image)
            embed.addFields({
                name: `${a.type} - ${bold(a.value)}`,
                value: `
            Fin <t:${a.timestamp}:R>\n`,
                inline: false
            })
            let msg = await (await client.channels.fetch(chanId)).send({
                embeds: [embed]
            })
            if (msg.channel.type === ChannelType.GuildAnnouncement) {
                msg.crosspost()
                .then(r => log(info(r)))
                .catch(err => log.info(err))
            }
            database.addAlertedArbitrage(a.timestamp, chanId)
        })
    }
}