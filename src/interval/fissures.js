const { get_fissure } = require("../callwf/get_fissure");

module.exports = {
    get: async (client) => {
        let database = require("../database/database")
        let { tier_list, images } = require("../database/fissure")

        let fissures = (await get_fissure()).filter(f => {
            let tier = tier_list.get(f.node) || true
            if (tier == true) { return !tier }
            return !f.isStorm && tier.hard == f.isHard
        });
        database.annonce_channel.forEach(chanId => {
            fissures = fissures.filter(f => {
                return !(database.alertedFissures[f.id] == chanId)
            })
            fissures.forEach(f => {
                console.log(f)
                console.log(chan)
                database.addAlertedFissure(f.id, chanId)
            })
        });
    }
}