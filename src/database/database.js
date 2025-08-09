const fs = require('fs');

class Database {
    constructor(filePath) {
        this.filePath = filePath;
        this.alertedFissures = new Map();
        this.alertedArbitrage = new Map();
        this.annonce_channel = new Map(); // Initialize annonce_channel
        this.load();
    }

    load() {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf8');
            let parsedData = JSON.parse(data);
            this.alertedArbitrage = parsedData.alertedArbitrage || [];
            this.alertedFissures = parsedData.alertedFissures || [];
            this.annonce_channel = parsedData.annonce_channel || [];

        }
    }
    save() {
        const data = {
            alertedFissures: this.alertedFissures,
            alertedArbitrage: this.alertedArbitrage,
            annonce_channel: this.annonce_channel,
        };
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    }
    addAlertedFissure(fissureId, channelId) {
        if (!this.alertedFissures[fissureId]) {
            this.alertedFissures[fissureId] = [channelId];
        }
        if (!this.alertedFissures[fissureId].includes(channelId)) {
            this.alertedFissures[fissureId].push(channelId)
        }
        this.save();
    }
    addAlertedArbitrage(arbitrageId, channelId) {
        if (!this.alertedArbitrage[fissureId]) {
            this.alertedArbitrage[fissureId] = [channelId];
        }
        if (!this.alertedArbitrage[fissureId].includes(channelId)) {
            this.alertedArbitrage[fissureId].push(channelId)
        }
        this.save();
    }
    isFissureAlerted(fissureId) {
        return this.alertedFissures.includes(fissureId);
    }
    isArbitrageAlerted(arbitrageId) {
        return this.alertedArbitrage.includes(arbitrageId);
    }
}

module.exports = new Database('database.json');