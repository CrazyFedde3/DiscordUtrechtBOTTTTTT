const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}clear gebruikt!`);
            console.log("----------------");
    
            var clearpermerrorembed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("Jij kunt dit niet doen! ❌");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(clearpermerrorembed);

    var aantalerrorembed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("Geef een aantal op! ❌");
    if(!args[0]) return message.reply(aantalerrorembed);
    if(Number.isInteger(parseInt(args[0]))) {
        var amount = parseInt(args[0]) + 1;
        message.channel.bulkDelete(amount).then(()=> {
            if(args[0] <= 0){

                var clearerror0 = new discord.MessageEmbed()
                .setTitle("Foutmelding")
                .setColor("#0099ff")
                .setDescription("ik kan geen 0 berichten verwijderen! ❌");

                message.reply(clearerror0).then(msg => msg.delete({timeout: 4000}));
            } else if (args[0] == 1) {
                var clearsucces1 = new discord.MessageEmbed()
                .setTitle("Succes melding")
                .setColor("#0099ff")
                .setDescription("ik heb 1 bericht verwijderd. ✅");

                message.reply(clearsucces1).then(msg => msg.delete({timeout: 4000}));
                } else {
                    var clearsuccesargs = new discord.MessageEmbed()
                .setTitle("Succes melding")
                .setColor("#0099ff")
                .setDescription(`ik heb ${args[0]} berichten verwijderd. ✅`);
                    message.reply(clearsuccesargs).then(msg => msg.delete({timeout: 4000}));
                }
            
        })
    }else {

        var aantalerrorembed2 = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("Geef een aantal op! ❌");
        return message.reply(aantalerrorembed2)
    }

}

module.exports.help = {
    name: "clear",
    description: "Verwijder een bepaald aantal berichten.",
    category: "Moderatie"
}