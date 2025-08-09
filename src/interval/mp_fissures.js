const { EmbedBuilder, bold, underline, ChannelType } = require("discord.js");
const { get_fissure } = require("../callwf/mod");
const log = require('log4js').getLogger()
log.level = "info"

module.exports = {
    get: async (client) => {
        let database = require("../database/database")
        let { tier_list, images, missionTierList, missionsType } = require("../database/fissure")
        if (database.mp_fissure.length == 0) {
            return ;
        }
        let fissures = (await get_fissure()).filter(f => {
            return !f.isStorm
        });
        Object.entries(database.mp_fissure).map(([userId, data]) => {
            let fSteel = []
            let fNormal = []
            if (data.path.includes("SteelPath")) {
                fSteel = fissures.filter(f => f.isHard)
            }
            if (data.path.includes("NormalPath")) {
                fNormal = fissures.filter(f => !f.isHard)
            }
            let fissures_tiered = fSteel.concat(fNormal).filter(f => {
                if (data.tier.length == missionTierList.length) {
                    return true;
                }
                return tier_list.get(f.node) && data.tier.includes(tier_list.get(f.node).tier)
            })
            fissures_missionned = fissures_tiered.filter(f => {
                if (data.fissures.length == missionsType.length) {
                    return true;
                }
                return data.fissures.includes(f.type)
            })
            let fissures_filtered = fissures_missionned
            fissures_filtered.forEach(async f => {
                let tier = tier_list.get(f.node) ? tier_list.get(f.node).tier + " Tier " : ""
                let embed = new EmbedBuilder()
                    .setTitle(`Fissures ${tier}${f.isHard ? "SteelPath" : "Normal"}`)
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
                let user = await client.users.fetch(userId)
                let msg = await user.send({
                    embeds: [embed]
                })
            })
        })
    }
}