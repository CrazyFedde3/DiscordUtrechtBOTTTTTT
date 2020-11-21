const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
    console.log(`${message.author.username} heeft ${prefix}overnemen gebruikt!`);
    console.log("----------------");

    // u!mededeling titel | bericht | kleur | kanaal

    var ledepermembedfoutEmbed = new discord.MessageEmbed()
    .setTitle("Foutmelding")
    .setColor("#0099ff")
    .setDescription("Jij hebt geen permissies. ❌");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(ledepermembedfoutEmbed);

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
    var reason = args.slice(2).join(" ");

    var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik:")
            .setColor("#0099ff")
            .setDescription(`Deel je overname als volgt: \n ${prefix}overnemen (huidige host(tagg)) ${seperator} (reden)`);

        return message.reply(embed)

    }

    if (args[1] == null) {

        var embed = new discord.MessageEmbed()
        .setTitle("Gebruik:")
        .setColor("#0099ff")
        .setDescription(`Laat weten dat je een training overneemt als volgt: \n ${prefix}overnemen (huidige host) ${seperator} (reden)`);

        return message.reply(embed)

    }

    var argsList = args.join(" ").split(seperator);

    var options = {
        nietOvergenomenHost: argsList[0],
        reden: argsList[1] || "Geen reden opgegeven."
    }

    var mededelingEmbed = new discord.MessageEmbed()
        .setTitle(`Training overname`)
        .setColor("#0099ff")
        .setThumbnail("https://bit.ly/2xn6LXy")
        .setDescription(`De training van ${kickUser} is overgenomen door ${message.author}. \n Reden: ${reason}`)
        .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
        .setTimestamp();

        var kanaal = message.member.guild.channels.cache.find(channels => channels.name === "📕𝚃𝚛𝚊𝚒𝚗𝚒𝚗𝚐𝚎𝚗");
        if(!kanaal) message.reply(` het kanaal met de naam ${kanaal} bestaat niet. ❌`);

        kanaal.send(mededelingEmbed);
}

module.exports.help = {
    name: "overnemen",
    description: "Neem een training over.",
    category: "Trainingen"
}