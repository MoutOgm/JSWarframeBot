const tier_list = new Map(Object.entries({
    "Seimeni (Ceres)": {
        tier: "S"
    },
    "Cinxia (Ceres)": {
        tier: "S"
    },
    "Casta (Ceres)": {
        tier: "S"
    },
    "Sechura (Pluto)": {
        tier: "A"
    },
    "Hydron (Sedna)": {
        tier: "A"
    },
    "Odin (Mercury)": {
        tier: "A"
    },
    "Helene (Saturn)": {
        tier: "A"
    },
    "Ose (Europa)": {
        tier: "B"
    },
    "Tessera (Venus)": {
        tier: "B"
    },
    "Hyf (Deimos)": {
        tier: "B"
    },
    "Outer Terminus (Pluto)": {
        tier: "B"
    }
}))

const images = new Map(Object.entries({
    "image": 'https://static.wikia.nocookie.net/warframe/images/b/b9/VitusEssence.png/revision/latest?cb=20221130055924'
}))

const missionsType = [
    "Survival",
    "Defense",
    "Interception",
    "Excavation",
    ""
]

module.exports = {
    tier_list,
    images
}