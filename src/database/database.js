const fs = require('fs');

class Database {
    constructor(filePath) {
        this.filePath = filePath;
        this.alertedFissures = {};
        this.annonce_channel = []; // Initialize annonce_channel
        this.load();
    }

    load() {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf8');
            let parsedData = JSON.parse(data);
            this.alertedFissures = parsedData.alertedFissures || [];
            this.annonce_channel = parsedData.annonce_channel || [];

        }
    }
    save() {
        const data = {
            alertedFissures: this.alertedFissures,
            annonce_channel: this.annonce_channel,
        };
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    }
    addAlertedFissure(fissureId, channelId) {
        if (!this.alertedFissures.get(fissureId)) {
            this.alertedFissures.push({fissureId: [channelId]});
        }
        if (!this.alertedFissures.get(fissureId).includes(channelId)) {
            this.alertedFissures[fissureId].push(channelId)
        }
        // this.save():
    }
    isFissureAlerted(fissure) {
        return this.alertedFissures.includes(fissure);
    }
}

module.exports = new Database('database.json');