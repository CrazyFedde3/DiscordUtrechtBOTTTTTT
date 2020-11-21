const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}hallo gebruikt!`);
            console.log("----------------");

            var halloembed = new discord.MessageEmbed()
            .setTitle("Hallo!")
            .setColor("#0099ff")
            .setDescription(`Hallo, ${message.author}! Ik ben de Utrecht Discord Bot! ✅`);

    return message.channel.send(halloembed);
}

module.exports.help = {
    name: "hallo",
    description: "Stuurt een hallo bericht terug.",
    category: "Fun"
}