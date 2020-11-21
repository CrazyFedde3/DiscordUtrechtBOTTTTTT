const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}leden gebruikt!`);
            console.log("----------------");
    var ledenEmbed = new discord.MessageEmbed()
    .setTitle("Aantal leden")
    .setColor("#0099ff")
    .setDescription(`Hallo ${message.author}, we zijn momenteel met ${message.guild.memberCount} spelers in Utrecht.`);

    return message.channel.send(ledenEmbed);
}

module.exports.help = {
    name: "leden",
    description: "Kijk hoeveel leden in de server zitten.",
    category: "Informatie"
}