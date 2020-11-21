const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    var botEmbed = new discord.MessageEmbed()
            .setTitle("Server Informatie")
            .setDescription("Hier zie je alle informatie van deze server.")
            .setColor("#0099ff")
            .addFields(
                { name: "Server naam:", value: message.guild.name },
                { name: "Server aangemaakt op:", value: message.guild.createdAt },
                { name: "Je bent gejoind op:", value: message.member.joinedAt },
                { name: "Aantal leden: ", value: message.guild.memberCount }
            )
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();

            console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}serverinfo gebruikt!`);
            console.log("----------------");

        return message.channel.send(botEmbed);
}

module.exports.help = {
    name: "serverinfo",
    description: "Krijg de server informatie.",
    category: "Informatie"
}