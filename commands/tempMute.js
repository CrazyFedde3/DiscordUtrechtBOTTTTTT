const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const ms = require("ms");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}mute gebruikt!`);
            console.log("----------------");
    
            var permErrorVoorGebruik = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("jij hebt hier geen permissions voor! ❌");

            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(permErrorVoorGebruik);

            var botPermErrorEmbed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("de bot heeft geen permissions. ❌");

            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply(botPermErrorEmbed);

            var gebruikernietgevondenmeldingEmbed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("gebruiker niet opgegeven. ❌");
        
            if (!args[0]) return message.reply(gebruikernietgevondenmeldingEmbed);
        
            var muteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

            var gebruikernietgevindenmeldingEmbed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("gebruiker niet gevonden. ❌");
        
            if (!muteUser) return message.reply(gebruikernietgevindenmeldingEmbed);
        
            var dezedommesukkelwilteenstafflidmutenmaardatkanniet = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("dit is een stafflid, die kun je niet muten! ❌");

            if (muteUser.hasPermission("MANAGE_MESSAGES")) return message.reply(dezedommesukkelwilteenstafflidmutenmaardatkanniet);

            var muteRole = message.guild.roles.cache.get('665951034103037972');
            if (!muteRole) return message.channel.send("GEEN MUTE ROLE GEVONDEN! ❌"); 

            var muteTime = args[1];

            var geenlengteopgegevenerrorEmbedjeenikmoetnuplassenjoe = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("Er is geen lengte(tijd) voor de mute opgegeven! ❌");

            if(!muteTime) return message.channel.send(geenlengteopgegevenerrorEmbedjeenikmoetnuplassenjoe);

            await(muteUser.roles.add(muteRole.id));

            var persoonisgemutevooreenbepaaldetijd = new discord.MessageEmbed()
            .setTitle("Mute")
            .setColor("#0099ff")
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setDescription(`${muteUser} is muted voor ${muteTime} door ${message.author}. ✅`);

            var logkanaal = message.member.guild.channels.cache.find(channels => channels.name === "logs");
            logkanaal.send(persoonisgemutevooreenbepaaldetijd);
            message.channel.send(persoonisgemutevooreenbepaaldetijd);

            setTimeout(() => {

                var persoonisungemutevooreenbepaaldetijd = new discord.MessageEmbed()
            .setTitle("Unmute")
            .setColor("#0099ff")
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setDescription(`${muteUser} is unmuted na ${muteTime}. \n Muter: ${message.author} ✅`);

            var logkanaal = message.member.guild.channels.cache.find(channels => channels.name === "logs");

                muteUser.roles.remove(muteRole.id);
                message.channel.send(persoonisungemutevooreenbepaaldetijd);
                logkanaal.send(persoonisungemutevooreenbepaaldetijd)

            }, ms(muteTime))

}

module.exports.help = {
    name: "mute",
    description: "Mute iemand voor een bepaalde tijd.",
    category: "Moderatie"
}