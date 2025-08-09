
const {wf} = require("./wf.js");


module.exports = {
    get_arbitrage: async () => {
        let this_date = new Date().getTime();
        return wf.arbitration.then(arbitrations => {
            let arbitration = [...arbitrations].filter(([timestamp, _]) => {
                timestamp = parseInt(timestamp)*1000
                let afterOneHour = timestamp + 3600000;
                return this_date < afterOneHour && this_date >= timestamp;
            })[0]
            arbitration[1].timestamp = parseInt(arbitration[0])+3600
            arbitration = arbitration[1]
            return arbitration
        })
    }
}