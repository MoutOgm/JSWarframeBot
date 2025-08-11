const {wf} = require("./wf.js");

module.exports = {
    get_drops: async (n) => {
        return wf.drops(n).then(drops => {
            return drops;
        })
    }
}