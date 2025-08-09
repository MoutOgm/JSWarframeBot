const tier_list = new Map(Object.entries({
    "E Prime (Earth)": {
        "tier": "S",
        "hard": true,
    },
    "Teshub (Void)": {
        "tier": "S",
        "hard": true,
    },
    "Casta (Ceres)": {
        "tier": "S",
        "hard": true,
    },
    "Helene (Saturn)": {
        "tier": "S",
        "hard": true,
    },
    "Stephano (Uranus)": {
        "tier": "S",
        "hard": true,
    },
    "Hydron (Sedna)": {
        "tier": "S",
        "hard": true,
    },
    "Tuvul Commons (Zariman)": {
        "tier": "S",
        "hard": true,
    },
    "Kala-azar (Eris)": {
        "tier": "S",
        "hard": true,
    },
    "Mariana (Earth)": {
        "tier": "S",
        "hard": true,
    },
    "Armaros (Europa)": {
        "tier": "S",
        "hard": true,
    },
    "Ukko (Void)": {
        "tier": "S",
        "hard": false,
    },
    "Hepit (Void)": {
        "tier": "S",
        "hard": false,
    },
    "Teshub (Void)": {
        "tier": "S",
        "hard": false,
    },
    "Oxomoco (Void)": {
        "tier": "S",
        "hard": false,
    },
    "Hellas (Mars)": {
        "tier": "A",
        "hard": true,
    },
    "Pallas (Ceres)": {
        "tier": "A",
        "hard": true,
    },
    "Telesto (Saturn)": {
        "tier": "A",
        "hard": true,
    },
    "Adaro (Sedna)": {
        "tier": "A",
        "hard": true,
    },
    "E Gate (Venus)": {
        "tier": "B",
        "hard": true,
    },
    "Baal (Europa)": {
        "tier": "B",
        "hard": true,
    },
    "Io (Jupiter)": {
        "tier": "B",
        "hard": true,
    },
    "Paimon (Europa)": {
        "tier": "B",
        "hard": true,
    },
	"Ultor (Mars)": {
        "tier": "C",
        "hard": true,
    },
	"Roche (Phobos)": {
        "tier": "C",
        "hard": true,
    },
	"Carpo (Jupiter)": {
        "tier": "C",
        "hard": true,
    },
	"Armaros (Europa)": {
        "tier": "C",
        "hard": true,
    },
	"Neso (Neptune)": {
        "tier": "C",
        "hard": true,
    },
	"Narcissus (Pluto)": {
        "tier": "C",
        "hard": true,
    },
	"Saxis (Eris)": {
        "tier": "C",
        "hard": true,
    },
	"Gulliver (Phobos)": {
        "tier": "F",
        "hard": true,
    },
	"Proteus (Neptune)": {
        "tier": "F",
        "hard": true,
    },
	"Outer Terminus (Pluto)": {
        "tier": "F",
        "hard": true,
    }
}));

const images = new Map(Object.entries({
    "Lith": "https://static.wikia.nocookie.net/warframe/images/d/df/LithRelicIntact.png/revision/latest?cb=20230224234350",
    "Meso": "https://static.wikia.nocookie.net/warframe/images/e/e0/MesoRelicIntact.png/revision/latest?cb=20230224234310",
    "Neo": "https://static.wikia.nocookie.net/warframe/images/9/97/NeoRelicIntact.png/revision/latest?cb=20230224234154",
    "Axi": "https://static.wikia.nocookie.net/warframe/images/b/bd/AxiRelicIntact.png/revision/latest?cb=20230224233954",
    "Omnia": "https://cdn.discordapp.com/attachments/1397281827684618422/1403791799197110303/Illustration_relique_warframe.png",
    "": "https://images-ext-1.discordapp.net/external/2KcKhWQ65J3bsMf4_Q9242c_LrltUA7h2nUg5Ryv_a0/https/cdn.warframestat.us/genesis/img/fissure-sm.png?format=webp&quality=lossless"
}));

const missionsType = [
    "Defense",
    "Survival",
    "Spy",
    "Interception",
    "Extermination",
    "Sabotage",
    "Rescue",
    "Mobile Defense",
    "Capture",
    "Excavation",
    "Void Cascade",
    "Assault",
    "Disruption",
    "Hive",
]

const missionTierList = [
    "S",
    "A",
    "B",
    "C",
    "F"
]

const path = [
    "SteelPath",
    "NormalPath"
]

module.exports = {
    tier_list,
    images,
    missionsType,
    missionTierList,
    path
}