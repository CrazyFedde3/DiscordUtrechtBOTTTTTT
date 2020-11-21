const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const botConfig = require("../botconfig.json");
const prefix = botConfig.prefix

module.exports.run = async (client, message, args) => {
    console.log("----------------");
    console.log(`${message.author.username} heeft ${prefix}warn gebruikt!`);
    console.log("----------------");


    // !warn spelerNaam reden

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

    var geenredenopgegevenembed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("geen reden opgegeven. ❌");

    if (!args[1]) return message.reply(geenredenopgegevenembed);

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var warnReason = args.slice(1).join(" ");

    var gebruikernietgevindenmeldingEmbed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("gebruiker niet gevonden. ❌");

    if (!warnUser) return message.reply(gebruikernietgevindenmeldingEmbed);

    var dezedommesukkelwilteenstafflidmutenmaardatkanniet = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("dit is een stafflid, die kun je niet warnen! ❌");

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply(dezedommesukkelwilteenstafflidmutenmaardatkanniet);


    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.MessageEmbed()
        .setColor("#0099ff")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setThumbnail("https://bit.ly/2xn6LXy")
        .addFields(
            { name: "Warned user:", value: `${warnUser} (${warnUser.id})` },
            { name: "Warned door:", value: message.author },
            { name: "Reden:", value: warnReason },
            { name: "Aantal huidige warns:", value: warns[warnUser.id].warns}
        );

        var channel = message.member.guild.channels.cache.get(`662979707096006676`);
        if(!channel) return;

        channel.send(warnEmbed);
            warnUser.send(warnEmbed);

            var warnSuccesEmbed = new discord.MessageEmbed()
            .setTitle("Succes melding")
            .setColor("#0099ff")
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setDescription(`${warnUser} is succesvol gewarned!`);

        message.channel.send(warnSuccesEmbed);

        if(warns[warnUser.id].warns == 2) {

            message.channel.send(`${warnUser}`);

            var w2Embed = new discord.MessageEmbed()
            .setColor("#0099ff")
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp()
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setDescription(`PAS OP ${warnUser}!`)
            .addFields(
            { name: "Bericht: ", value: "Je hebt nog maar 1 warn nodig voor een kick!" },
            { name: "Aantal huidige warns:", value: warns[warnUser.id].warns},
            {name: "Laatste persoon die gewarnd heeft:", value: message.author},
            {name: "Laatste warn reden:", value: warnReason}
        );


        var channel = message.member.guild.channels.cache.get(`662979707096006676`);
        if(!channel) return;

        channel.send(w2Embed);
        warnUser.send(w2Embed);
        message.channel.send(w2Embed);

        }else if(warns[warnUser.id].warns == 3) {

            message.channel.send(`${warnUser}`);

            var w3KickEmbed = new discord.MessageEmbed()
            .setColor("#0099ff")
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp()
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setDescription(`KICK`)
            .addFields(
                { name: "Bericht: ", value: `${warnUser} is gekickt!` },
                { name: "Reden: ", value: `${warnUser} heeft 3 warns bereikt!` },
            { name: "Aantal huidige warns:", value: warns[warnUser.id].warns},
            {name: "Laatste persoon die gewarnd heeft:", value: message.author},
            {name: "Laatste warn reden:", value: warnReason}
        );

        var kickkanaal = message.member.guild.channels.cache.get(`662979707096006676`);
        if(!kickkanaal) return;

        kickkanaal.send(w3KickEmbed);

        message.channel.send(w3KickEmbed);
        warnUser.send(w3KickEmbed);
        warnUser.kick(warnReason);

        }else if(warns[warnUser.id].warns == 4) {

            message.channel.send(`${warnUser}`);

            var w4Embed = new discord.MessageEmbed()
            .setColor("#0099ff")
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp()
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setDescription(`PAS OP ${warnUser}!`)
            .addFields(
            { name: "Bericht: ", value: "Je hebt nog maar 1 warn nodig voor een ban!" },
            { name: "Aantal huidige warns:", value: warns[warnUser.id].warns},
            {name: "Laatste persoon die gewarnd heeft:", value: message.author},
            {name: "Laatste warn reden:", value: warnReason}
        );

        message.channel.send(w4Embed);

        var channel = message.member.guild.channels.cache.get(`662979707096006676`);
        if(!channel) return;
        warnUser.send(w4Embed);
        channel.send(w4Embed);

        }else if(warns[warnUser.id].warns == 5) {

            message.channel.send(`${warnUser}`);

            var w5Embed = new discord.MessageEmbed()
            .setColor("#0099ff")
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp()
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setDescription(`BAN`)
            .addFields(
                { name: "Bericht: ", value: `${warnUser} is verbannen!` },
                { name: "Reden: ", value: `${warnUser} heeft 5 warns bereikt!` },
            { name: "Aantal huidige warns:", value: warns[warnUser.id].warns},
            {name: "Laatste persoon die gewarnd heeft:", value: message.author},
            {name: "Laatste warn reden:", value: warnReason}
        );

        var bankanaal = message.member.guild.channels.cache.get(`662979707096006676`);
        if(!bankanaal) return;

        bankanaal.send(w5Embed);

        message.channel.send(w5Embed);
        warnUser.send(w5Embed);
        warnUser.ban(warnReason);

        }
}

module.exports.help = {
    name: "warn",
    description: "Waarschuw iemand op de server.",
    category: "Moderatie"
}
