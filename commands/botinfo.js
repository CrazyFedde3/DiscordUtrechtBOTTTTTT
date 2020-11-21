const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    var botEmbed = new discord.MessageEmbed()
            .setTitle("Server Informatie")
            .setDescription("Hier zie je alle informatie van deze server.")
            .setColor("#0099ff")
            .addFields(
                { name: "Bot naam:", value: client.user.username },
                { name: "Bot aangemaakt op:", value: client.user.createdAt },
                { name: "Prefix: ", value: `**${prefix}**` }
            )
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();

            console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}botinfo gebruikt!`);
            console.log("----------------");

        return message.channel.send(botEmbed);
}

module.exports.help = {
    name: "botinfo",
    description: "Verkrijg de bot's informatie.",
    category: "Informatie"
}