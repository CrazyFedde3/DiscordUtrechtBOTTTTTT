const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
    console.log(`${message.author.username} heeft ${prefix}bug gebruikt!`);
    console.log("----------------");

    // u!mededeling titel | bericht | kleur | kanaal

     var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Meld een bug als volgt: \n ${prefix}bug (bug) ${seperator} (uitgebreide informatie)`);

        return message.reply(embed)

    }

    if (args[1] == null) {

        var embed = new discord.MessageEmbed()
        .setTitle("Gebruik:")
        .setColor("#0099ff")
        .setDescription(`Meld een bug als volgt: \n ${prefix}bug (bug) ${seperator} (uitgebreide informatie)`);

        return message.reply(embed)

    }

    var argsList = args.join(" ").split(seperator);

    var options = {
        bug: argsList[0],
        info: argsList[1] || "Geen informatie opgegeven."
    }

    var mededelingEmbed = new discord.MessageEmbed()
        .setTitle(`Bug`)
        .setColor("#0099ff")
        .setThumbnail("https://bit.ly/2xn6LXy")
        .setDescription(`Bug gevonden door: ${message.author} \n\n Bug: ${options.bug} \n\n Uitgebreide informatie: ${options.info}`)
        .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
        .setTimestamp();

        var kanaal = message.guild.channels.cache.get(`714395013727125554`);
       
    var kanaalerrorembed = new discord.MessageEmbed()
    .setTitle("Foutmelding")
    .setColor("#0099ff")
    .setDescription(`het kanaal met de naam ${kanaal} bestaat niet. ❌`);
        if(!kanaal) message.reply(kanaalerrorembed);

        kanaal.send(mededelingEmbed)

        var bugsuccesembed = new discord.MessageEmbed()
    .setTitle("Succes melding")
    .setColor("#0099ff")
    .setDescription(`Bug succesvol ingestuurd! ✅`);

        return message.channel.send(bugsuccesembed);

        
}

module.exports.help = {
    name: "bug",
    description: "Meld dat er een bug is.",
    category: "Informatie"
}