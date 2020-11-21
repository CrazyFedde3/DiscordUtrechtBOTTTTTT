const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
    console.log(`${message.author.username} heeft ${prefix}training gebruikt!`);
    console.log("----------------");

    // u!mededeling titel | bericht | kleur | kanaal

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(" jij hebt geen permissies om dit uit te voeren! ❌");

    var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Maak een training aan door gebruik te maken van: \n ${prefix}training Co-Host ${seperator} Eenheid ${seperator} Type-Training ${seperator} Tijd ${seperator} Opmerking(en)`);

        return message.reply(embed)

    }

    if (args[1] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Maak een training aan door gebruik te maken van: \n ${prefix}training Co-Host ${seperator} Eenheid ${seperator} Type-Training ${seperator} Tijd ${seperator} Opmerking(en)`);

        return message.reply(embed)

    }

    if (args[2] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Maak een training aan door gebruik te maken van: \n ${prefix}training Co-Host ${seperator} Eenheid ${seperator} Type-Training ${seperator} Tijd ${seperator} Opmerking(en)`);

        return message.reply(embed)

    }

    if (args[3] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Maak een training aan door gebruik te maken van: \n ${prefix}training Co-Host ${seperator} Eenheid ${seperator} Type-Training ${seperator} Tijd ${seperator} Opmerking(en)`);

        return message.reply(embed)

    }

    if (args[4] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Maak een training aan door gebruik te maken van: \n ${prefix}training Co-Host ${seperator} Eenheid ${seperator} Type-Training ${seperator} Tijd ${seperator} Opmerking(en)`);

        return message.reply(embed)

    }

    var argsList = args.join(" ").split(seperator);

    var options = {
        CoHost: argsList[0],
        team: argsList[1],
        type: argsList[2] || "Standaard",
        tijd: argsList[3],
        extra: argsList[4] || "Niet van toepassing",

    }

    var trainingEmbed = new discord.MessageEmbed()
        .setTitle(`Training`)
        .setColor(options.kleur)
        .setThumbnail("https://bit.ly/2xn6LXy")
        .setDescription(`**Host:** ${message.author} \n **Co-Host:** ${options.CoHost} \n\n **Eenheid:** ${options.team} \n **Type:** ${options.type} \n\n **Tijd:** ${options.tijd} \n\n **Opmerking(en):** ${options.extra}`)
        .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
        .setTimestamp();

        var kanaal = message.member.guild.channels.cache.find(channels => channels.name === "𝐓𝐫𝐚𝐢𝐧𝐢𝐧𝐠𝐞𝐧");
    if (!kanaal) return;

    kanaal.send(trainingEmbed);
}

module.exports.help = {
    name: "training",
    description: "Maak een training aan.",
    category: "Trainingen"
}