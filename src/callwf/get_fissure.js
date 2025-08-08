
const {wf} = require("./wf.js");


module.exports = {
    get_fissure: async () => {
        return wf.fissures.then(fissures => {
            return fissures;
        })
    }
}