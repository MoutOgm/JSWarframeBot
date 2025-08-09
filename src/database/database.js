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
        fs.writeFileSync(this.filePath, JSON.stringify(data), 'utf8');
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
        let aId = String("a"+arbitrageId)
        if (!this.alertedArbitrage[aId]) {
            this.alertedArbitrage[aId] = [channelId];
        }
        if (!this.alertedArbitrage[aId].includes(channelId)) {
            this.alertedArbitrage[aId].push(channelId)
        }
        // this.save();
    }
    isFissureAlerted(fissureId) {
        return this.alertedFissures[fissureId];
    }
    isArbitrageAlerted(arbitrageId) {
        return this.alertedArbitrage[String("a"+arbitrageId)];
    }
}

module.exports = new Database('database.json');