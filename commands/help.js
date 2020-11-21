const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}help gebruikt!`);
            console.log("----------------");

            var algmeenText = `**__Algemene Commands__** \n **${prefix}verify** - Verify je met je roblox account. \n **${prefix}help** - Stuurt dit bericht \n **${prefix}prefix** - Kijk wat de prefix is. \n **${prefix}hallo** - Geeft een hallo bericht terug. \n **${prefix}test** - Test of de bot nog werkt. \n **${prefix}leden** - Kijk hoeveel leden in de server zitten. \n **${prefix}idee** - Laat een idee voor de game achter. \n **${prefix}bug** - Meld dat er een bug is. \n **${prefix}review** - Maak een review. \n **${prefix}meme** - Krijg een meme. \n **${prefix}cat** - Krijg een poesje. \n **${prefix}dog** - Krijg een hond.`;
            var informatieText = `**__Informatie Commands__** \n **${prefix}serverinfo** - Geeft de informatie van de server in een berichtje. \n **${prefix}botinfo** - Geeft de informatie van de bot in een berichtje. \n **${prefix}whois** - Laat de info van een gebruiker zien. \n **${prefix}jongste** - Kijk wie de jongste van de server is. \n **${prefix}oudste** - Kijk wie de oudste van de server is. \n **${prefix}ping** - Bekijk de vertraging. \n **${prefix}report** - Rapporteer een gebruiker. \n **${prefix}sps** - Speel steen, papier, schaar. \n **${prefix}dm** - DM iemand met een bericht van de bot. \n\n **__Ticket Commands__** \n **${prefix}new / ${prefix}ticket** - Maak een ticket aan.`;

            var staffText = `**__Moderatie Commands__** \n **${prefix}kick** - Zet iemand uit de server. \n **${prefix}ban** - Verban iemand uit de server. \n **${prefix}warn** - Waarschuw een speler. \n **${prefix}clear** - Verwijderd een bepaald aantal berichten. \n **${prefix}mute** - Mute iemand voor een bepaalde tijd.\n **${prefix}say** - Laat de bot jouw bericht zeggen! \n\n **__Training Commands__** \n **${prefix}training** - Maak een training aan \n **${prefix}trainingserver** - In welke server je moet zitten voor een training. \n **${prefix}overnemen** - Training overnemen van iemand met toestemming. \n **${prefix}aflassen** - Las de training af. \n\n **__Overige Commands__** \n **${prefix}mededeling** - Maak een mededeling \n **${prefix}poll** - Maak een poll. \n **${prefix}polluitslag** - Deel wat de uitslag van een poll is. \n **${prefix}giveaway** - Maak een giveaway. \n\n **__Ticket Commands__** \n **${prefix}claim** - Claim een ticket. \n **${prefix}t-overnemen** - Neem een ticket over. \n **${prefix}close / ${prefix}sluit** - Sluit een ticket.`

        var algemeenEmbed = new discord.MessageEmbed()
            .setTitle("**Utrecht Roleplay Help Menu**")
            .setDescription("Hier zie je alle algemene commands van deze server.")
            .setColor("#0099ff")
           .addField("**__Speler Commands__**", algmeenText)
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();

            var infoEmbed = new discord.MessageEmbed()
            .setTitle("**Utrecht Roleplay Help Menu**")
            .setDescription("Hier zie je alle Ticket commands van deze server.")
            .setColor("#0099ff")
           .addField("**__Speler Commands__**", informatieText)
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();






            var helpStaffEmbed = new discord.MessageEmbed()
            .setTitle("**Utrecht Roleplay Staff Help Menu**")
            .setDescription("Hier zie je alle staff commands van deze server.")
         .setColor("#0099ff")
           .addField("**__Staff Commands__**", staffText)
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();


            message.author.send(algemeenEmbed);
            message.author.send(infoEmbed);


            if (message.member.hasPermission("MANAGE_MESSAGES")){
                message.author.send(helpStaffEmbed);
            };

            var helpembedsuccesdmsend = new discord.MessageEmbed()
            .setTitle("Succes melding")
            .setColor("#0099ff")
            .setDescription("📬 De commands staan in je privé berichten! 📬");

        message.reply(helpembedsuccesdmsend);
}

module.exports.help = {
    name: "help",
    description: "Stuurt dit bericht.",
    category: "Informatie"
}
