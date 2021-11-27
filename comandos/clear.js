const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Limpa o chat',
    callback: ({
        client,
        message,
        args
    }) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('Você não tem permissão para executar esse comando!');
        if (!args[0]) return message.reply('Você não especificou o número de mensagens a serem deletadas!');
        if (args[0] > 100) return message.reply('Você não pode deletar mais de 100 mensagens!');
        message.channel.bulkDelete(args[0]).then(() => {
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Limpeza de mensagens')
                .setDescription(`${args[0]} mensagens foram deletadas!`)
                .setTimestamp()
                .setFooter(message.author.username, message.author.avatarURL());
            message.channel.send({
                embeds: [embed]
            });
        });
    }
}