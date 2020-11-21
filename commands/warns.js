const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}warns gebruikt!`);
            console.log("----------------");

            var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

            var gebruikernietgevindenmeldingEmbed = new discord.MessageEmbed()
                    .setTitle("Foutmelding")
                    .setColor("#0099ff")
                    .setDescription("gebruiker niet gevonden. ❌");
        
            if (!warnUser) return message.reply(gebruikernietgevindenmeldingEmbed);
            if(!warns[warnUser.id]) warns[warnUser.id] = {

                warns: 0
            }


           if (warns[warnUser.id].warns == 1){
               var aantalwarns = new discord.MessageEmbed()
               .setTitle("Aantal warns:")
               .setColor("#0099ff")
               .setDescription(`${warnUser}'s warnings: 1`);
               message.reply(aantalwarns);
           }else if (warns[warnUser.id].warns == 2){
            var aantalwarns = new discord.MessageEmbed()
            .setTitle("Aantal warns:")
            .setColor("#0099ff")
            .setDescription(`${warnUser}'s warnings: 2`);
            message.reply(aantalwarns);
        }else if (warns[warnUser.id].warns == 3){
            var aantalwarns = new discord.MessageEmbed()
            .setTitle("Aantal warns:")
            .setColor("#0099ff")
            .setDescription(`${warnUser}'s warnings: 3`);
            message.reply(aantalwarns);
        } else if (warns[warnUser.id].warns == 4){
            var aantalwarns = new discord.MessageEmbed()
            .setTitle("Aantal warns:")
            .setColor("#0099ff")
            .setDescription(`${warnUser}'s warnings: 4`);
            message.reply(aantalwarns);
        } else if (warns[warnUser.id].warns == 5){
            var aantalwarns = new discord.MessageEmbed()
            .setTitle("Aantal warns:")
            .setColor("#0099ff")
            .setDescription(`${warnUser}'s warnings: 5`);
            message.reply(aantalwarns);
        } else {
            var aantalwarns = new discord.MessageEmbed()
            .setTitle("Aantal warns:")
            .setColor("#0099ff")
            .setDescription(`${warnUser}'s warnings: 0`);
            message.reply(aantalwarns);
        }

           
}

module.exports.help = {
    name: "warns",
    description: "Stuurt een hallo bericht terug.",
    category: "Fun"
}