const hermit = require('../src/HermitPurple');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const Discord = require('discord.js');

async function _downloadPage(pageUrl) {
    const res = await fetch(pageUrl);
    return res.text();
}

module.exports = {
    name: 'extract',
    aliases: ['e'],
    description: 'Comando para extrair o conteúdo de uma wiki.',
    category: 'Utilidades',
    callback: async ({
        client,
        message,
        args,
        text
    }) => {

        text = args[0]
        var method = args[1];
        var timeout = args[2];

        console.log(method.toLowerCase() === 'post')

        if (message.author.id !== '808098225952653373') return message.channel.send('Você não tem permissão para usar este comando.');

        if (!text) {
            return message.channel.send('Você precisa informar o nome da categoria.');
        }

        const webPage = await _downloadPage('https://onepiece.fandom.com/pt/wiki/Categoria:' + text.replace(/\-/g, '_'));
        const $ = cheerio.load(webPage);

        var objects = [];



        var items = ($('a[class="category-page__member-link"]')).length;
        console.log(items)
        $('a[class="category-page__member-link"]').each((i, x) => {
            const wiki = new hermit('onepiece', 1);

            wiki.search($(x).text()).then(result => {
                objects.push(result[0]);

                if (objects.length == items) {

                    objects = objects.sort((a, b) => {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                        return 0;
                    });

                    if (!timeout) {
                        if (method.toLowerCase() === 'post') {
                            objects.forEach(o => {
                                const embed = new Discord.MessageEmbed()
                                    .setTitle(o.title)
                                    .setURL(o.url)
                                    .setDescription(o.article.substring(0, 500) + "...")
                                    .setColor('#0099ff')
                                    .setImage(o.img)
                                    .setFooter('Powered by Hermit Purple')
                                    .setTimestamp();

                                message.channel.send({
                                    embeds: [embed]
                                })
                            })
                        }

                        if (method.toLowerCase() === 'role') {
                            objects.forEach(o => {
                                message.guild.roles.create({
                                    name: "”🍈 ͎ᵎ " + o.title + ".",
                                    color: 'RANDOM',
                                }).then(role => {
                                    console.log(`✅ |  ${role.name} Criado`);
                                }).catch(err => {
                                    console.log(`❌ |  ${err}`);
                                })
                            })
                        }
                    }

                    if (!!timeout) {

                        if (method.toLowerCase() === 'post') {

                            objects.forEach((o, x) => {

                                setTimeout(() => {

                                    const embed = new Discord.MessageEmbed()
                                        .setTitle(o.title)
                                        .setURL(o.url)
                                        .setDescription(o.article.substring(0, 500) + "...")
                                        .setColor('#0099ff')
                                        .setImage(o.img)
                                        .setFooter('Powered by Hermit Purple')
                                        .setTimestamp();

                                    message.channel.send({
                                        embeds: [embed]
                                    })
                                }, x * 3000)
                            })
                        }

                        if (method.toLowerCase() === 'role') {

                            objects.forEach((o, x) => {

                                setTimeout(() => {
                                    message.guild.roles.create({
                                        name: "”🍈 ͎ᵎ " + o.title + ".",
                                        color: 'RANDOM',
                                    }).then(role => {
                                        console.log(`✅ |  ${role.name} Criado`);
                                    }).catch(err => {
                                        console.log(`❌ |  ${err}`);
                                    })
                                }, x * 3000)
                            })
                        }
                    }
                }
            })
        })
    }
}