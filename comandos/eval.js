const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "eval",
  description: "Evaluate a given code!",
  callback: async ({ client, message, args, text, instance }) => {
    
    if(String(message.author.id) !== "808098225952653373") return;
    
    try {
      const code = args.join(" ");
      if (!code) {
        return message.channel.send("What do you want to evaluate?");
      }
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      let embed = new MessageEmbed()
        .setAuthor("Eval", message.author.avatarURL())
        .setDescription(`\`\`\`${evaled.replace(/<ref \*[0-9]> /g, '').substr(0,4090)}\`\`\``)
        .setColor("BLUE");

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
    }
  }
};
