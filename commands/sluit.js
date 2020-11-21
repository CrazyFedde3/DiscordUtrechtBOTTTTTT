const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}close gebruikt!`);
            console.log("----------------");

            var reden = args.join(" ");
            if(!reden) return message.reply("Geef ook een reden mee om de ticket te sluiten!");


            const categoryID = "663847265231831040";


            var permMissingEmbed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("jij hebt hier geen permissions voor! ❌");

            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(permMissingEmbed);

            if(message.channel.parentID == categoryID){
                var embedCreateTicket = new discord.MessageEmbed()
            .setTitle("Ticket close")
            .setColor("#0099ff")
            .setDescription(`Ticket: ${message.channel.name}. \n Closed door: ${message.author} \n Reden: ${reden}`)
            .setThumbnail("https://bit.ly/2xn6LXy")
                .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
                .setTimestamp();

                var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "logs");
                if(!ticketChannel) return message.reply("log kanaal bestaat niet");

                ticketChannel.send(embedCreateTicket);
                message.channel.delete();
            }else {
                var verkeerdeChannelEmbed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("Dit is geen ticket. ❌");
                message.reply(verkeerdeChannelEmbed);
            }
}

module.exports.help = {
    name: "sluit",
    description: "Sluit een ticket.",
    category: "Tickets"
}