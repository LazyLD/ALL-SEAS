module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: 'Comando para verificar o ping do bot.',
    category: 'Utilidades',
    callback: ({
        client,
        message,
    }) => {
        message.channel.send(`Pong! \`${client.ws.ping}\`ms`);
    }
}