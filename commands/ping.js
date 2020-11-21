const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}ping gebruikt!`);
            console.log("----------------");

            var pingembed = new discord.MessageEmbed()
            .setTitle("Pong!")
            .setColor("#0099ff")
            .setDescription(`${client.ws.ping}ms`);

    return message.channel.send(pingembed);
}

module.exports.help = {
    name: "ping",
    description: "Bekijk de latency.",
    category: "Informatie"
}