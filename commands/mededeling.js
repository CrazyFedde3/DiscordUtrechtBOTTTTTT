const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
    console.log(`${message.author.username} heeft ${prefix}mededeling gebruikt!`);
    console.log("----------------");

    // u!mededeling titel | bericht | kleur | kanaal

    var ledepermembedfoutEmbed = new discord.MessageEmbed()
    .setTitle("Foutmelding")
    .setColor("#0099ff")
    .setDescription("Jij hebt geen permissies. ❌");

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(ledepermembedfoutEmbed);

    var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Maak een mededeling door gebruik te maken van: \n ${prefix}mededeling Titel ${seperator} Bericht ${seperator} Kleur(in hex waarde) ${seperator} Kanaal`);

        return message.reply(embed)

    }

    if (args[1] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Maak een mededeling door gebruik te maken van: \n ${prefix}mededeling Titel ${seperator} Bericht ${seperator} Kleur(in hex waarde) ${seperator} Kanaal`);

        return message.reply(embed)

    }

    if (args[2] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Maak een mededeling door gebruik te maken van: \n ${prefix}mededeling Titel ${seperator} Bericht ${seperator} Kleur(in hex waarde) ${seperator} Kanaal`);

        return message.reply(embed)

    }

    var argsList = args.join(" ").split(seperator);

    if (argsList[2] == undefined) argsList[2] = "#0099ff";
    if (argsList[3] == undefined) argsList[2] = "aankondigingen";

    var options = {
        titel: argsList[0],
        bericht: argsList[1] || "Geen bericht opgegeven.",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()
    }

    var mededelingEmbed = new discord.MessageEmbed()
        .setTitle(`Mededeling`)
        .setColor(options.kleur)
        .setThumbnail("https://bit.ly/2xn6LXy")
        .setDescription(`**Mededeling door:** \n ${message.author} \n\n **${options.titel}** \n\n Bericht: \n ${options.bericht}`)
        .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
        .setTimestamp();

        var kanaal = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
        if(!kanaal) message.reply(` het kanaal met de naam ${options.kanaal} bestaat niet. ❌`);

        kanaal.send(`${message.guild.roles.cache.get(`662651704122015754`)}`)
        kanaal.send(mededelingEmbed);
}

module.exports.help = {
    name: "mededeling",
    description: "Maak een mededeling.",
    category: "Moderatie"
}