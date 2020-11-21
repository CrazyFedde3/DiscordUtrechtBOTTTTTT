const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
    console.log(`${message.author.username} heeft ${prefix}report gebruikt!`);
    console.log("----------------");

    // u!mededeling titel | bericht | kleur | kanaal

   var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Maak een report als volgt: \n ${prefix}report (gebruikersnaam van die persoon) ${seperator} (waarom)`);

        return message.reply(embed)

    }

    if (args[1] == null) {

        var embed = new discord.MessageEmbed()
        .setTitle("Gebruik:")
        .setColor("#0099ff")
        .setDescription(`Maak een report als volgt: \n ${prefix}report (gebruikersnaam van die persoon) ${seperator} (waarom)`);

        return message.reply(embed)

    }

    var argsList = args.join(" ").split(seperator);

    var options = {
        gebruiker: argsList[0],
        waarom: argsList[1] || "Geen reden opgegeven."
    }

    var reportEmbedmetgnenreden = new discord.MessageEmbed()
        .setTitle(`Report`)
        .setColor("#0099ff")
        .setThumbnail("https://bit.ly/2xn6LXy")
        .setDescription(`Report door: ${message.author} \n\n Reported: ${options.gebruiker} \n\n Waarom: ${options.waarom}`)
        .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
        .setTimestamp();

        var kanaal = message.member.guild.channels.cache.find(channels => channels.name === "reports");
        if(!kanaal) message.reply(` het kanaal met de naam ${kanaal} bestaat niet. ❌`);

        kanaal.send(reportEmbedmetgnenreden);

        var reportEmbed = new discord.MessageEmbed()
            .setTitle("Succes melding")
            .setColor("#0099ff")
            .setDescription("Report succesvol ingestuurd! ✅");

        return message.channel.send(reportEmbed);

        
}

module.exports.help = {
    name: "report",
    description: "Report een gebruiker.",
    category: "Moderatie"
}