const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}test gebruikt!`);
            console.log("----------------");

            var testEmbed = new discord.MessageEmbed()
            .setTitle("**Utrecht Test**")
            .setColor("#0099ff")
            .setDescription("De bot is online! Alles werkt!")
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();

    return message.channel.send(testEmbed);

}

module.exports.help = {
    name: "test",
    description: "Test of de bot nog online is.",
    category: "Informatie"
}