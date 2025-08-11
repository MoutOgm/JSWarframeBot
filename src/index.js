const { get_fissure, get_arbitrage } = require("./callwf/mod.js");
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const { token } = require('../config.json');
const cron = require('node-cron');


const fs = require('node:fs');
const path = require('node:path');
const database = require("./database/database.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Create a new client instance

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, async readyClient => {
	let interval_fissures = require("./interval/fissures.js")
	let interval_arbitrage = require('./interval/arbitrage.js')
	let interval_mp_fissures = require('./interval/mp_fissures.js')
	cron.schedule('01 */5 * * * *', async () => {
		await interval_arbitrage.get(readyClient);
		await interval_fissures.get(readyClient);
	})
	for (const [userId, data] of Object.entries(database.mp_fissure)) {
		cron.schedule(data.cron, async () => {
			await interval_mp_fissures.get(readyClient, userId)
		})

	}
});

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {


		const command = interaction.client.commands.get(interaction.commandName);


		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}



		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
		}
	} else if (interaction.isAutocomplete()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.autocomplete(interaction);
		} catch (error) {
			console.error(error);
		}
	}
	return;
});

// Log in to Discord with your client's token
client.login(token);