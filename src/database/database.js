const fs = require('fs');

class Database {
    constructor(filePath) {
        this.filePath = filePath;
        this.alertedFissures = new Map();
        this.alertedArbitrage = new Map();
        this.annonce_channel = new Map(); // Initialize annonce_channel
        this.mp_fissure = new Map();
        this.load();
    }

    load() {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf8');
            let parsedData = JSON.parse(data);
            this.alertedArbitrage = parsedData.alertedArbitrage || new Map();
            this.alertedFissures = parsedData.alertedFissures || new Map();
            this.annonce_channel = parsedData.annonce_channel || new Map();
            this.mp_fissure = parsedData.mp_fissure || new Map();

        }
    }
    save() {
        const data = {
            alertedFissures: this.alertedFissures,
            alertedArbitrage: this.alertedArbitrage,
            annonce_channel: this.annonce_channel,
            mp_fissure: this.mp_fissure,
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