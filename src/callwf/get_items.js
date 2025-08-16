const {wf} = require("./wf.js");

module.exports = {
    get_items: async (n, l, b) => {
        return wf.items(n, l, b).then(drops => {
            return drops;
        })
    },
    get_item: async (n, l, b) => {
        return wf.item(n, l, b).then(drop => {
            return drop
        })
    }
}