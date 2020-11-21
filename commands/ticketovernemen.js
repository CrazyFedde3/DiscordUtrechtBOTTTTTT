const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}tovernemen gebruikt!`);
            console.log("----------------");



            const categoryID = "663847265231831040";


            var permMissingEmbed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("jij hebt hier geen permissions voor! ❌");

            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(permMissingEmbed);

            if(message.channel.parentID == categoryID){
                var embedCreateTicket = new discord.MessageEmbed()
            .setTitle("Ticket Overname")
            .setColor("#0099ff")
            .setDescription(`Ticket: ${message.channel}. \n Overgenomen door: ${message.author} \n\n\n Als stafflid de ticket overnemen? Vraag ${message.author} of het mag en gebruik vervolgens ${prefix}t-overnemen`)
            .setThumbnail("https://bit.ly/2xn6LXy")
                .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
                .setTimestamp();

                message.channel.send(embedCreateTicket);
            }else {
                var verkeerdeChannelEmbed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("Dit is geen ticket. ❌");
                message.reply(verkeerdeChannelEmbed);
            }
}

module.exports.help = {
    name: "t-overnemen",
    description: "Neem een ticket over.",
    category: "Tickets"
}