const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(" jij hebt geen permissies om dit uit te voeren! ❌");

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Laat weten dat je je training aflast op deze manier: \n ${prefix}aflassen (reden)`);

        return message.reply(embed)

    }
    var reden = args.join(" ");
    var aflasEmbed = new discord.MessageEmbed()
    .setTitle("Training afgelast!")
    .setColor("#0099ff")
    .setDescription(`De training van ${message.author} is afgelast! \n\n Reden: ${reden}`);

    var kanaal = message.member.guild.channels.cache.find(channels => channels.name === "𝐓𝐫𝐚𝐢𝐧𝐢𝐧𝐠𝐞𝐧");
    kanaal.send(aflasEmbed);
}

module.exports.help = {
    name: "aflassen",
    description: "Meld dat je een training aflast.",
    category: "Trainingen"
}