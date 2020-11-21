const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}jongste gebruikt!`);
            console.log("----------------");

            let mem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => b.user.createdAt - a.user.createdAt)
      .first();
    var Embed = new discord.MessageEmbed()
      .setTitle(`De jongste member in ${message.guild.name}:`)
      .setColor(`#0099ff`)
      .setThumbnail(client.users.cache.get(mem.user.id).displayAvatarURL())
      .setFooter(`Datum Formaat: MM/DD/YYYY`)
      .setDescription(
        `${mem.user.tag} is het jongste lid in ${
          message.guild.name
        }! \n\n**Account creatie datum:** \n${mem.user.createdAt}`
      );
    message.channel.send(Embed);
}

module.exports.help = {
    name: "jongste",
    description: "Check wie de jongste uit de server is.",
    category: "Fun"
}