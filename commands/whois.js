const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}whois gebruikt!`);
            console.log("----------------");

            let Embed = new discord.MessageEmbed();
    let roles = [];
    if (!message.mentions.users.first()) {
      message.member.roles.cache.forEach((role) => {
        roles.push(role.name);
      });
      Embed.setTitle(`Jouw informatie!`);
      Embed.setThumbnail(message.author.displayAvatarURL());
      Embed.setColor(`#0099ff`);
      Embed.setDescription(
        `**Joined:** \n ${message.member.joinedAt}\n\n**ID:** \n${
          message.author.id
        }\n\n**Roles:**\n ${roles}`
      )
      .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();
      return message.channel.send(Embed);
    } else {
      let User = message.mentions.members.first();
      User.roles.cache.forEach((role) => {
        roles.push(role.name);
      });
      Embed.setTitle(`Informatie van ${client.users.cache.get(User.id).tag}!`);
      Embed.setThumbnail(client.users.cache.get(User.id).displayAvatarURL());
      Embed.setColor(`#0099ff`);
      Embed.setDescription(
        `**Joined:** \n ${User.joinedAt}\n\n**ID:** \n${
          User.id
        }\n\n**Roles:** \n ${roles}`
      )
      .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();
      return message.channel.send(Embed);
    }
}

module.exports.help = {
    name: "whois",
    description: "Geeft iemands info weer.",
    category: "Fun"
}