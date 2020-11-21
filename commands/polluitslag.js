const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}leden gebruikt!`);
            console.log("----------------");


            var ledepermembedfoutEmbed = new discord.MessageEmbed()
    .setTitle("Foutmelding")
    .setColor("#0099ff")
    .setDescription("Jij hebt geen permissies. ❌");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(ledepermembedfoutEmbed);


            var argsList = args.join(" ");




    var ledenEmbed = new discord.MessageEmbed()
    .setTitle("Poll uitslag")
    .setColor("#0099ff")
    .setDescription(`${argsList}`);

    var kanaal = message.member.guild.channels.cache.find(channels => channels.name === "aankondigingen");
        if(!kanaal) message.reply(` het kanaal met de naam ${kanaal} bestaat niet. ❌`);

        kanaal.send(`${message.guild.roles.cache.get(`710234883586523169`)}`);
        kanaal.send(ledenEmbed)
}

module.exports.help = {
    name: "polluitslag",
    description: "Deel de poll uitslag.",
    category: "Fun"
}