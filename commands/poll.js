const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
    console.log(`${message.author.username} heeft ${prefix}poll gebruikt!`);
    console.log("----------------");

    // u!mededeling titel | bericht | kleur | kanaal

    var ledepermembedfoutEmbed = new discord.MessageEmbed()
    .setTitle("Foutmelding")
    .setColor("#0099ff")
    .setDescription("Jij hebt geen permissies. ❌");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(ledepermembedfoutEmbed);

     var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Maak een poll als volgt: \n ${prefix}poll (keuze 1) ${seperator} (keuze 2)`);

        return message.reply(embed)

    }

    if (args[1] == null) {

        var embed = new discord.MessageEmbed()
        .setTitle("Gebruik:")
        .setColor("#0099ff")
        .setDescription(`Maak een poll als volgt: \n ${prefix}poll (keuze 1) ${seperator} (keuze 2)`);

        return message.reply(embed)

    }

    var argsList = args.join(" ").split(seperator);

    var options = {
        keuzeone: argsList[0],
        keuzetwo: argsList[1]
    }

    var mededelingEmbed = new discord.MessageEmbed()
        .setTitle(`Poll`)
        .setColor("#0099ff")
        .setThumbnail("https://bit.ly/2xn6LXy")
        .setDescription(`Poll van ${message.author}: \n\n:one:: ${options.keuzeone} \n :two::${options.keuzetwo}`)
        .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
        .setTimestamp();

        var kanaal = message.member.guild.channels.cache.find(channels => channels.name === "aankondigingen");
        if(!kanaal) message.reply(` het kanaal met de naam ${kanaal} bestaat niet. ❌`);

        kanaal.send(`${message.guild.roles.cache.get(`710234883586523169`)}`);

        kanaal.send(mededelingEmbed).then(embedMessage => {
            embedMessage.react('1️⃣');
            embedMessage.react('2️⃣');
        });

        var ideesendembed = new discord.MessageEmbed()
            .setTitle("Succes melding")
            .setColor("#0099ff")
            .setDescription("Poll succesvol ingestuurd! ✅");

        return message.channel.send(ideesendembed);

        
}

module.exports.help = {
    name: "poll",
    description: "Maak een poll aan.",
    category: "Fun"
}