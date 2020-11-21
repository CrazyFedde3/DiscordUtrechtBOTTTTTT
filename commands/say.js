const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}say gebruikt!`);
            console.log("----------------");
if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("jij kunt dit niet doen!")
            var bericht = args.join(" ")

            message.channel.send(`${bericht}`)
            .then(msg => {
                message.delete({timeout: 1})
            })
}

module.exports.help = {
    name: "say",
    description: "Stuurt het bericht wat jij zegt.",
    category: "Informatie"
}