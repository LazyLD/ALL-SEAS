const dotenv = require('dotenv');
dotenv.config(); // Configurando o arquivo .env
const Discord = require('discord.js'); // Discord.js
const client = new Discord.Client({
    disableEveryone: true, // Desabilitando o @everyone
    intents: ["GUILDS",
        "GUILD_MEMBERS",
        'GUILD_BANS',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_INTEGRATIONS',
        'GUILD_WEBHOOKS',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_PRESENCES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGE_TYPING',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS',
        'DIRECT_MESSAGE_TYPING'
    ] // Configurando os intents
}); // Configurando o cliente
const WOKCommands = require("wokcommands"); // WokCommands
const path = require("path"); // Path
const db = require("quick.db")

client.on('ready', () => {
    console.log(`Logado como ${client.user.tag}!`); // Caso o bot esteja online
    let guild = client.guilds.cache.get("912029140625018941")

    if(db.get('akuma-drop')){

    }

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, "comandos"), // Configurando o diretório dos comandos
    }).setDefaultPrefix("-"); // Configurando o WokCommands
}); // Configurando o evento ready

client.login(process.env.TOKEN); // Login do bot