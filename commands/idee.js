const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
    console.log(`${message.author.username} heeft ${prefix}idee gebruikt!`);
    console.log("----------------");

    // u!mededeling titel | bericht | kleur | kanaal

     var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Maak een idee als volgt: \n ${prefix}idee (idee) ${seperator} (waarom)`);

        return message.reply(embed)

    }

    if (args[1] == null) {

        var embed = new discord.MessageEmbed()
        .setTitle("Gebruik:")
        .setColor("#0099ff")
        .setDescription(`Maak een idee als volgt: \n ${prefix}idee (idee) ${seperator} (waarom)`);

        return message.reply(embed)

    }

    var argsList = args.join(" ").split(seperator);

    var options = {
        idee: argsList[0],
        waarom: argsList[1] || "Geen reden opgegeven."
    }

    var mededelingEmbed = new discord.MessageEmbed()
        .setTitle(`Idee`)
        .setColor("#0099ff")
        .setThumbnail("https://bit.ly/2xn6LXy")
        .setDescription(`Idee door: ${message.author} \n\n Idee: ${options.idee} \n\n Waarom: ${options.waarom}`)
        .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
        .setTimestamp();

        var kanaal = message.member.guild.channels.cache.find(channels => channels.name === "💡𝙸𝚍𝚎𝚎ë𝚗");
        if(!kanaal) message.reply(` het kanaal met de naam ${kanaal} bestaat niet. ❌`);

        kanaal.send(mededelingEmbed).then(embedMessage => {
            embedMessage.react('✅');
            embedMessage.react('❌');
        });

        var ideesendembed = new discord.MessageEmbed()
            .setTitle("Succes melding")
            .setColor("#0099ff")
            .setDescription("Idee succesvol ingestuurd! ✅");

        return message.channel.send(ideesendembed);

        
}

module.exports.help = {
    name: "idee",
    description: "Verzin een idee.",
    category: "Informatie"
}