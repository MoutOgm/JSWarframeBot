const { EmbedBuilder, bold, underline, ChannelType } = require("discord.js");
const { get_fissure } = require("../callwf/mod");
const log = require('log4js').getLogger()
log.level = "info"


module.exports = {
    get: async (client) => {
        let database = require("../database/database")
        let { tier_list, images } = require("../database/fissure")
        log.info("Scanning fissures");

        if (Object.keys(database.annonce_channel).length == 0) {
            return ;
        }
        let fissures = (await get_fissure()).filter(f => {
            return !f.isStorm
        });
        Object.entries(database.annonce_channel).map(([chanId, d]) => {
            if (d.tier_list) {
                fissures = fissures.filter(f => {
                    let tier = tier_list.get(f.node) || true
                    if (tier == true) { return false }
                    return tier.hard == f.isHard
                })
            }
            let fissures_filtered = fissures.filter(f => {
                return !(database.alertedFissures[f.id] == chanId)
            })
            fissures_filtered.forEach(async f => {
                let tier = ""
                if (d.tier_list == true) {
                    tier = tier_list.get(f.node).tier + " Tier "
                }
                let embed = new EmbedBuilder()
                    .setTitle(`Fissures ${tier}${f.isHard ? "" : "-- Normal"}`)
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setThumbnail(images.get(f.tierClass) || images.get(""))
                embed.addFields({
                    name: `${f.type} - ${bold(f.node)}`,
                    value: `- ${bold(f.tierClass)}
- ${underline(f.enemy)}
                Fin <t:${Math.floor(f.until.getTime()/1000)}:R>\n`,
                    inline: false
                });
                let msg = await (await client.channels.fetch(chanId)).send({
                    embeds: [embed]
                })
                if (msg.channel.type === ChannelType.GuildAnnouncement) {
                    msg.crosspost()
                    .then(r => log(info(r)))
                    .catch(err => log.info(err))
                }
                database.addAlertedFissure(f.id, chanId)
            })
        });
    }
}