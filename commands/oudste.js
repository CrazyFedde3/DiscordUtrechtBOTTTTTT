const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}oudste gebruikt!`);
            console.log("----------------");

            let mem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => a.user.createdAt - b.user.createdAt)
      .first();
    var Embed = new discord.MessageEmbed()
      .setTitle(`Het oudste lid in: ${message.guild.name}`)
      .setColor(`#0099ff`)
      .setFooter(`Datum formaat: MM/DD/YYYY`)
      .setThumbnail(client.users.cache.get(mem.user.id).displayAvatarURL())
      .setDescription(
        `${mem.user.tag} is het oudste lid ${
          message.guild.name
        }! \n\n Account creatie datum: ${mem.user.createdAt}`
      );
    message.channel.send(Embed);
}

module.exports.help = {
    name: "oudste",
    description: "Kijk wie de oudste van de server is.",
    category: "Fun"
}