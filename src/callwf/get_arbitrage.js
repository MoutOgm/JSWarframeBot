
const {wf} = require("./wf.js");


module.exports = {
    get_arbitrage: async () => {
        let this_date = new Date().getTime();
        return wf.arbitration.then(arbitrations => {
            let arbitration = [...arbitrations].filter(([timestamp, _]) => {
                timestamp = parseInt(timestamp*1000)
                let afterOneHour = timestamp + 3600000;
                let isValidDate = this_date < afterOneHour && this_date >= timestamp;
                return isValidDate
            })[0]
            arbitration[1].timestamp = arbitration[0]
            arbitration = arbitration[1]
            return arbitration
        })
    }
}