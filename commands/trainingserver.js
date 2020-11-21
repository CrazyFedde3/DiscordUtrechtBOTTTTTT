const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(" jij hebt geen permissies om dit uit te voeren! ❌");

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Deel welke server je gebruikt voor de training op deze manier: \n ${prefix}trainingserver (informatie)`);

        return message.reply(embed)

    }

    var server = args.join(" ");
    var kanaal = message.member.guild.channels.cache.find(channels => channels.name === "𝐓𝐫𝐚𝐢𝐧𝐢𝐧𝐠𝐞𝐧");

    var trainingservertjevandegame = new discord.MessageEmbed()
    .setTitle("Training server")
    .setColor("#0099ff")
    .setThumbnail("https://bit.ly/2xn6LXy")
    .setDescription(`De training van ${message.author} wordt gegeven in de volgende server: \n ${server}`);

    kanaal.send(trainingservertjevandegame);
}

module.exports.help = {
    name: "trainingserver",
    description: "Deel wat de trainingsserver is.",
    category: "Trainingen"
}