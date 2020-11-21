const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}dm gebruikt!`);
            console.log("----------------");

            var bericht = args.slice(1).join(" ");
            var persoon = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

            var author = new discord.MessageEmbed()
            .setTitle("Fout melding")
            .setColor("#0099ff")
            .setDescription("Je kunt geen bericht naar jezelf sturen! ❌");

            if (persoon == message.author) return message.reply(author);

            var DMembed = new discord.MessageEmbed()
            .setTitle("Utrecht")
            .setColor("#0099ff")
            .setDescription(`${bericht}`);
            
            var Succes = new discord.MessageEmbed()
            .setTitle("Succes melding")
            .setColor("#0099ff")
            .setDescription("Bericht succesvol gestuurd! ✅");

            message.reply(Succes)
    return persoon.send(DMembed);
}

module.exports.help = {
    name: "dm",
    description: "DM iemand met een bepaald bericht via de bot.",
    category: "Fun"
}