const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}prefix gebruikt!`);
            console.log("----------------");

            var prefixEmbed = new discord.MessageEmbed()
    .setTitle("Prefix")
    .setColor("#0099ff")
    .setDescription(`De prefix is ingesteld op: ${prefix}`);

    return message.channel.send(prefixEmbed);
}

module.exports.help = {
    name: "prefix",
    description: "Kijk wat de prefix is.",
    category: "Informatie"
}